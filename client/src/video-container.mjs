import { LitElement, html, css, svg } from 'lit-element';
import { } from './chat-container.mjs';

import { getWebSocket } from "./socket.mjs"
import { getTheOthers } from "./the-others.mjs";
import { screenShare, screenUnshare, muteIcon, unMuteIcon, getIconCss } from './utilCss.mjs'

export class VideoContainer extends LitElement {

    static get styles() {
        return [getIconCss(), css`
.the-other-video-container {
    position: relative; 
}

.the-other-video-container video{
        max-height: 75vh; 
}

.the-other-video-container .button-box {
    position: absolute; 
    bottom: 0;
    right: 0; 
}

.video-shared-screen-box{
    border: 1px solid #999;
    max-height: 150px; 
    max-width: 100%;
    background-color : green; 
}

.video-box{
    border: 1px solid #999;
    width: 100%;
}

.no-show{
    display: none;   
 }

.show{
    display: flex; 
    flex-direction: column;
    max-width: 100%;
    
 }

 .container{
    display: flex;     
    flex-direction: column;
 }

.button-box {
    margin: 5px;
    display: flex;
    flex-direction: row;
}

.user-name {
    font-size: 1.4rem; 
    background: var(--color-three); 
    color: white; 
}

[data-tooltip]:before {
    content: attr(data-tooltip);
    position: absolute;
    opacity: 0;
    transition: all 0.25s ease;
    padding: var(---small);
    color: #777;
    border-radius: 10px;
    box-shadow: 2px 2px 1px silver;    
}

[data-tooltip]:hover:before {
    opacity: 1;
    background: black;
    margin-top: -30px;
}

[data-tooltip]:not([data-tooltip-persistent]):before {
    pointer-events: none;
}

.chat-box {
    padding: var(--padding-small);
}

.my-video-container video {
    max-width: 200px; 
    max-height: 150px;
}
  `]
    }

    constructor() {
        super()
        console.log("videoContainer constructor")
        this.theOther = {}
        this.itIsMe = false;
        this.shareScreen = false;
        this.captured = false;
        this.isOneOnOne = false;
        this.isChatOpen = false;
        this.inAnotherOneOnOne = false;
        this.video = document.createElement("video");
        this.video.muted = true;
        this.video.autoplay = true;
        //best solution  is autoplay=true (chrome), changing to explictit video.play() does not solve the error
        //Note : srcObject=... gives the error, not the .play()
        //Uncaught (in promise) DOMException: The play() request was interrupted by a new load request
        this.chatbox = document.createElement("chat-container");
        this.chatbox.videoContainer = this;
        this.videoShareScreen = document.createElement("video");
        this.videoShareScreen.classList.add("video");
        this.videoShareScreen.muted = true;
        this.videoShareScreen.autoplay = true;
        this.videoShareScreen.width = 300;
        this.videoShareScreen.height = 300;
        console.log("videoContainer constructor einde")

    }

    static get properties() {
        return {
            theOther: { type: Object },
            itIsMe: { type: Boolean },
            isOneOnOne: { type: Boolean },
            isChatOpen: { type: Boolean },
            shareScreen: { type: Boolean },
            captured: { type: Boolean },
            inAnotherOneOnOne: { type: Boolean }
        };
    }

    getName() {
        console.log(JSON.stringify(getTheOthers().me))
        return getTheOthers().me.profile.name;
    }

    getRoom() {
        return 1234;
        // return getTheOthers().me.room;
    }


    render() {
        const oneOnOneMode = (this.isOneOnOne) ? "Stop" : "Start";
        const chatMode = (this.isChatOpen) ? "Close" : "Open";
        this.video.classList.add(this.setVideoClass())//TODO set somewhere else
        console.log("videoContainer render isitme? " + this.itIsMe)

        const result = html`      
        <div class=${this.getClassName()}>
            ${(this.itIsMe) ? html`
            <div class="registration-box">
                <div class="chatroom-name">You are in room: ${this.getRoom()}</div>
                <div class="registered-with-name">You are registered as: ${this.getName()}</div>
                <div class="chat-room-link">nvite participants with url: ${window.location.href}</div>
            </div>
                 
            <div class="video-shared-screen-box ${this.setShareScreenClass(this.shareScreen)}"> 
                ${this.videoShareScreen}
                <div class="button-box">
                <button id="start" class="button button-start" @click="${this.startCaptureEH}">Start Capture</button>
                <button id="stop"  class="button button-stop"  @click="${this.stopCaptureEH}">Stop Capture</button>
                </div>
            </div>
            `: null}
          
            <div class="video-box ${this.setShareScreenClass(!this.shareScreen)}"> 
                ${this.video}
                ${this.itIsMe ? null : html`                
                    <div class="user-name">${this.theOther.userName}</div>
               `}               
            </div>
            <div class="button-box">
zzz
             ${(this.itIsMe) ?
                this.shareButton() :
                html`
                <button class="button one-on-one-button"  @click="${this.oneOnOne}">${oneOnOneMode} One to One</button>
               <button class="button chat-button" data-tooltip="Open/close Private Chat" @click="${this.openOrCloseChat}">${chatMode} Chat<svg viewBox="0 0 49.07 42.95"><defs><style>.cls-1,.cls-2{fill:none;stroke:#010101;stroke-miterlimit:10;}.cls-1{stroke-width:4.07px;}.cls-2{stroke-width:3px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="2.03 2.03 47.03 2.03 47.03 29.03 20.03 29.03 11.03 38.03 11.03 29.03 2.03 29.03 2.03 2.03"/><line class="cls-2" x1="8.68" y1="9.98" x2="40.39" y2="9.98"/><line class="cls-2" x1="8.68" y1="15.41" x2="40.39" y2="15.41"/><line class="cls-2" x1="8.68" y1="20.83" x2="40.39" y2="20.83"/></g></g></svg>
                </button>`}

               ${this.createMuteButton()}
               ${this.createChatButton()}
             </div>
        ${this.createChatPopup()}  
        `;
        console.log("na render")
        return result;
    }

    firstUpdated(changedProperties) {
        this.setMute();
    }

    updated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            if (propName == "inAnotherOneOnOne") { this.changePause(this.inAnotherOneOnOne) }

        });
    }

    createChatPopup()  {
        return html`<div id="chatPopup" style="display: none" class="chat-box">
    ${this.chatbox}
</div>`}


    createChatButton() {
        const chatMode = (this.isChatOpen) ? "Close" : "Open";
       
        return html`<button class="button chat-button" data-tooltip="Open/close Private Chat" @click="${this.openOrCloseChat}">${chatMode} Chat<svg viewBox="0 0 49.07 42.95"><defs><style>.cls-1,.cls-2{fill:none;stroke:#010101;stroke-miterlimit:10;}.cls-1{stroke-width:4.07px;}.cls-2{stroke-width:3px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="2.03 2.03 47.03 2.03 47.03 29.03 20.03 29.03 11.03 38.03 11.03 29.03 2.03 29.03 2.03 2.03"/><line class="cls-2" x1="8.68" y1="9.98" x2="40.39" y2="9.98"/><line class="cls-2" x1="8.68" y1="15.41" x2="40.39" y2="15.41"/><line class="cls-2" x1="8.68" y1="20.83" x2="40.39" y2="20.83"/></g></g></svg>
    </button>`;
    }


    createMuteButton() {
        return html` <button id="muteBtn" class="icon" data-tooltip="Mute" @click="${this.changeMute}">
        ${unMuteIcon()}
    </button>             
    <button id="unMuteBtn" class="icon" data-tooltip="Unmute" @click="${this.changeMute}">
         ${muteIcon()} 
    </button>`;
    }

    getClassName() {
        if (this.itIsMe)
            return "my-video-container"
        return "the-other-video-container"
    }

    getChatBox() { return this.chatbox; }

    getVideo() { return this.video; }

    shareButton() {
        if (this.shareScreen)
            return html`<button class="button share-button" data-tooltip="Close share screen"  @click="${this.setShareScreen}">${screenShare()}</button>`;
        else return html`<button class="button share-button" data-tooltip="Open screen share menu" @click="${this.setShareScreen}">${screenUnshare()}</button>`;
    }

    setShareScreenClass(show) {
        return (show) ? "show" : "no-show";
    }

    setVideoClass() {
        return (this.itIsMe) ? "my-camera" : "the-other-camera";
    }

    setShareScreen() {
        if (this.shareScreen) {
            this.stopCaptureEH();
            this.shareScreen = false;
        }
        else this.shareScreen = true;
    }

    openOrCloseChat(event) {
        const div = this.shadowRoot.getElementById("chatPopup");
        div.style.display = "none";
        if (this.isChatOpen)
            div.style.display = "none"
        else
            div.style.display = "block"
        this.isChatOpen = !this.isChatOpen;
    }

    openChatDialog() {
        if (!this.isChatOpen)
            this.openOrCloseChat(null)
    }

    oneOnOneButton() {
        const mode = (this.isOneOnOne) ? "stop" : "start";
        return html`<button class="button" data-tooltip="Start One to One" @click="${this.oneOnOne}">${mode} One to One</button>`;
    }

    oneOnOne(event) {
        const mode = (this.isOneOnOne) ? "stop" : "start";
        const rec = { "type": "requestOneOnOne", "payload": { "mode": mode, "senderId": theOthers.me.userId, "sender": theOthers.me.userName, "receiverId": this.theOther.userId } }
        getWebSocket().send(JSON.stringify(rec));
        this.isOneOnOne = !this.isOneOnOne;
    }

    changeMute(event) {
        this.video.muted = !this.video.muted;
        this.setMute()
    }

    changePause(mode) {
        (mode) ? this.video.pause() : this.video.play();
    }

    setMute() {
        const muteBtn = this.shadowRoot.getElementById("muteBtn");
        const unMuteBtn = this.shadowRoot.getElementById("unMuteBtn");
        if (this.video.muted) { muteBtn.style.display = "block"; unMuteBtn.style.display = "none" }
        else { muteBtn.style.display = "none"; unMuteBtn.style.display = "block" }
    }

    startCaptureEH() {
        this.captured = true;
        VideoContainer.startCapture(this.videoShareScreen, getTheOthers().me.video);
    }

    stopCaptureEH() {
        if (this.captured) {
            this.captured = false;
            VideoContainer.stopCapture(this.videoShareScreen);
        }
        this.shareScreen = false;
    }

    static startCapture(videoShareScreen) {
        const displayMediaOptions = {
            video: {
                cursor: "always"
            },
            audio: false
        };
        try {
            navigator.mediaDevices.getDisplayMedia(displayMediaOptions).then(stream => {
                videoShareScreen.srcObject = stream;
                const screenTrack = stream.getTracks()[0];
                getTheOthers().getSenders().forEach(rtpSender => { rtpSender.replaceTrack(screenTrack) });
                screenTrack.onended = () => {
                    theOthers.getSenders().forEach(rtpSender => { rtpSender.replaceTrack(theOthers.me.video.srcObject.getTracks()[1]) })
                }

            });
        } catch (err) {
            console.error("Error: " + err);
        }
    }

    static stopCapture(videoShareScreen) {
        let tracks = videoShareScreen.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoShareScreen.srcObject = null;
        getTheOthers().getSenders().forEach(rtpSender => rtpSender.replaceTrack(getTheOthers().me.video.srcObject.getTracks()[1]))
    }

}

customElements.define("video-container", VideoContainer);
