import { LitElement, html, css, svg } from 'lit-element';

import { getWebSocket } from "./socket.mjs"
import { getTheOthers } from "./the-others.mjs";
import { screenShare, screenUnshare, muteIcon, unMuteIcon, getIconCss, getButtonCss } from './utilCss.mjs'
import { } from './group-chat.mjs';
import { _mainGrid } from './main-grid.mjs'

const videoContainers = []

export class VideoContainer extends LitElement {

    static get styles() {
        return [getIconCss(), getButtonCss(), css`

        .container{
            display: flex;     
            flex-direction: column;
            justify-content : center;
            background-color : var(--tertiar-color); 
            color: black;
            padding: 1rem;
      
         }
        
        .my-video-container video {
            max-width: 200px; 
            max-height: 150px;
        }

        .video-shared-screen-box{
            border: 1px solid #999;
            max-height: 150px; 
            max-width: 100%;
            background-color : var(--primary-color); 
        }

       .no-show{
            display: none;   
        }

        .show{
            display: flex; 
            flex-direction: column;
            max-width: 100%;  
        }
        .item{
            padding: 0.5rem;
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

        .user-name {
            font-size: 1.4rem; 
            background-color: var(--primary-color); 
            color: black; 
        }
        

`]
    }

    /*
    
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
    
    
    
    
    .chat-box {
        padding: var(--padding-small);
    }
    
    
      `]
        }
    
        */

    constructor() {
        super()
        videoContainers.push(this)
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
        //   this.chatContainer = document.createElement("chat-container");
        this.videoShareScreen = document.createElement("video");
        this.videoShareScreen.classList.add("video");
        this.videoShareScreen.muted = true;
        this.videoShareScreen.autoplay = true;
        this.videoShareScreen.width = 300;
        this.videoShareScreen.height = 300;
        this.chatContainer = document.createElement("chat-container");
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
        return getTheOthers().me.profile.name;
    }

    getRoom() {
        return "public";
        // return getTheOthers().me.room;
    }


    render() {
      
        this.video.classList.add(this.setVideoClass())//TODO set somewhere else

        const result = html`      
        <div class="container ${(this.itIsMe) ? 'my-video-container' : 'the-other-video-container'}">
            ${(this.itIsMe) ? html`
            <div class="item">
                <div>You are in room: ${this.getRoom()}</div>
                <div>You are registered as: ${this.getName()}</div>
                <div>Invite participants with url: <br>${window.location.href}</div>
            </div>
                 
            <div class="item video-shared-screen-box ${this.setShareScreenClass(this.shareScreen)}"> 
                ${this.videoShareScreen}
                <div class="icon-box">
                <button id="start" @click=${() => this.startCaptureEH()}>Start Capture</button>
                <button id="stop"  @click=${() => this.stopCaptureEH()}>Stop Capture</button>
                </div>
            </div>
            `: null}
          
            <div class="item video-box ${this.setShareScreenClass(!this.shareScreen)}"> 
                ${this.video}
                ${this.itIsMe ? null : html`                
                    <div class="user-name">${this.theOther.profile.name}</div>
               `}               
            </div>
            <div class="item icon-box">
                ${(this.itIsMe) ? this.shareButton() :  this.setPrivateChats()}
               <button id="muteBtn" class="icon" data-tooltip="Mute" @click=${() => this.changeMute()}>
                    ${unMuteIcon()}
                </button>            
                <button id="unMuteBtn" class="icon" data-tooltip="Unmute" @click=${() => this.changeMute()}>
                    ${muteIcon()} 
                </button>
             </div>
             <div id="chatPopup" style="display:none">${this.chatContainer}</div>
        </div>
   
        `;
        return result;
    }

    firstUpdated() {
        this.setMute();

    }

    updated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            if (propName == "inAnotherOneOnOne") { this.changePause(this.inAnotherOneOnOne) }
        });
    }

    createMuteButton() {
        return html`
     <button id="muteBtn" class="icon" data-tooltip="Mute" @click=${() => this.changeMute()}>
        ${unMuteIcon()}
    </button>             
    <button id="unMuteBtn" class="icon" data-tooltip="Unmute" @click=${() => this.changeMute()}>
         ${muteIcon()} 
    </button>
    `;
    }

    getChatContainer() {
        return this.chatContainer;
    }

    getVideo() { return this.video; }

    shareButton() {
        const result= (this.shareScreen) ? html`
            <button  data-tooltip="Close share screen"  @click=${() => this.setShareScreen()}>${screenShare()}</button>`
            : html`<button data-tooltip="Open screen share menu" @click=${() => this.setShareScreen()}>${screenUnshare()}</button>`;
            return html`${result}${this.setChatButtons('')}`;
    }

    setShareScreenClass(show) {
        return (show) ? "show" : "no-show";
    }

    setPrivateChats() {
        return html`
            <button @click="${this.oneOnOne}">${(this.isOneOnOne) ? "Stop" : "Start"} One to One</button>
            ${this.setChatButtons('private')}`;
    }

    setChatButtons(mode){
        return html`
            <button data-tooltip="Open/close ${mode} Chat" @click=${() => this.openOrCloseChat()}>${(this.isChatOpen) ? "Close" : "Open"}<svg viewBox="0 0 49.07 42.95"><defs><style>.cls-1,.cls-2{fill:none;stroke:#010101;stroke-miterlimit:10;}.cls-1{stroke-width:4.07px;}.cls-2{stroke-width:3px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="2.03 2.03 47.03 2.03 47.03 29.03 20.03 29.03 11.03 38.03 11.03 29.03 2.03 29.03 2.03 2.03"/><line class="cls-2" x1="8.68" y1="9.98" x2="40.39" y2="9.98"/><line class="cls-2" x1="8.68" y1="15.41" x2="40.39" y2="15.41"/><line class="cls-2" x1="8.68" y1="20.83" x2="40.39" y2="20.83"/></g></g></svg></button>`;
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

    openOrCloseChat() {
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
            this.openOrCloseChat()
    }

    oneOnOneButton() {
        const mode = (this.isOneOnOne) ? "stop" : "start";
        return html`<button data-tooltip="Start One to One" @click="${this.oneOnOne}">${mode} One to One</button>`;
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


class ChatContainer extends LitElement {

    static get styles() {
        return [getButtonCss(), getIconCss(), css`  
        .messages {
            overflow: scroll;
            margin-bottom: var(--padding-mid);
            flex-grow: 1; 
            min-height: 10rem;
            overflow-x: hidden;
            background-color: var(--secundairy-color);
            color: white;
        }

        .chat-box {
            display: flex; 
            flex-direction: column; 
            padding: 1rem; 
        }
       
        .send {
    margin-left: 1rem;
        }
   ` ];
    }

    /*
     .send-button {
         height: auto;
         padding: var(--padding-small); 
     }
 
     .user-chat div {
         display: flex;
         flex-direction: column;
         padding: var(--padding-mid);
     }
 
     .chat-box {
         background: blue; 
     }   
     
     input {
     margin-bottom: var(--padding-mid);
     height: 2.5rem;
     padding: var(--padding-small);
     flex-grow: 3; 
     }
 
     .send-message-wrapper {
         display: flex; 
         align-items: center; 
     }
 
     */

    constructor() {
        super()
        this.peer = null
        this.message = "";
    }

    static get properties() {
        return {
            peer: { type: Object },
            message: { type: String }
        };
    }

    render() {
        return html`
           <div class="chat-box">           
                <div id='messages' class='messages'>Messages:</div>
                    <div class="send-message-wrapper icon-box" >
                        <input type='text' 
                                id='chatInput' 
                                class='input'
                                placeholder = "Type your message here"
                                value="">
                        </input>
                        <button  class="icon send"  @click=${() => this.send()}>Send</button>
                    </div>   
                </div>         
           </div>     
        `;
    }

    send(e) {
        const inputEl = this.shadowRoot.getElementById("chatInput");
        const value = inputEl.value;
        inputEl.value = "";
        let msg = (this.peer) ?
            { "type": "chatMessage", "payload": { "sender": getTheOthers().me.profile.name, "senderId": getTheOthers().me.userId, "receiverId": this.peer.userId, "message": value } }
            : { "type": "chatMessage", "payload": { "sender": getTheOthers().me.profile.name, "senderId": getTheOthers().me.userId, "message": value } };

        getWebSocket().send(JSON.stringify(msg));
    }

    firstUpdated() {
        const inputEl = this.shadowRoot.getElementById("chatInput");
        inputEl.onkeypress = (e) => {
            if (e.keyCode == 13) {
                this.send();
            }
        }
    }

    updated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            if (propName == "message") {
                const messagesEl = this.shadowRoot.getElementById("messages");

                messagesEl.innerHTML += this.message + "<br>"
            }
        });
    }
}

customElements.define("chat-container", ChatContainer);

export function processChatOutput(senderId, sender, receiverId, message) {
    if (receiverId == null) {
        videoContainers.forEach(vc => {
            if (vc.id == getTheOthers().me.profile.email)
                vc.getChatContainer().message = sender + ": " + message;
        })
    }
    _mainGrid.getVideoContainers().forEach(videoContainer => {
        const _chatboxContainer = videoContainer.getChatContainer();
        if (videoContainer.id == receiverId) {
            _chatboxContainer.message = "me : " + message;
            videoContainer.openChatDialog();
        }
        else if (videoContainer.id == senderId) {
            _chatboxContainer.message = sender + ": " + message;
            videoContainer.openChatDialog();
        }
    });
}


