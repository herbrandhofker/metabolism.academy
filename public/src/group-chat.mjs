import { LitElement, html, css } from 'lit-element';
import { getTheOthers } from "./the-others.mjs"
import { procesCommunication, getWebSocket } from "./socket.mjs"
import { } from './video-container.mjs';

import { getButtonCss } from './utilCss.mjs';

export let _mainGrid = null;

export class GroupChat extends LitElement {

    static get styles() {
        return [getButtonCss(),css` 
        video-container {
            display: flex;
            flex-direction: column;
            max-height: 75vh; 
        }
      
        .my-video-container-div {
            background-color : var(--tertiair-color); 
            position: fixed;
            z-index: 1;
            top: 10rem;
            right: 0;
            transition: 0.5s;
            padding-top: 3rem;
        }
        
        .open-button{
            position: absolute;
            top: 10rem;
            right: 0rem;
            min-height: 8rem;
            padding: 1rem;
            font-size: 1.5rem;
            border-radius : var(--button-border-radius) 0 0  var(--button-border-radius);
        }  

        .close-button{
            position: absolute;
            top: 0px;
            padding :0;
            margin :0;
            right: 0px;
            width: 50%;
            border-radius : var(--button-border-radius) 0 0  var(--button-border-radius);
        }  
`]}


    constructor() {
        super()
        this.showPublicChatbox = true;
        const theOthers = getTheOthers();

        getWebSocket().send(JSON.stringify({ type: "registrations" }));


        this.myVideoContainer = createVideoContainer(theOthers.me);
        this.myVideoContainer.itIsMe = true;
        this.myVideoContainer.id = theOthers.me.profile.email;

        this.mainGrid = document.createElement("main-grid");
        this.mainGrid.classList.add("main-grid");
        _mainGrid = this.mainGrid;
      
        theOthers.updateMe({ "video": this.myVideoContainer.getVideo() });
        theOthers.addSetListener(GroupChat.addTheOtherCallback);
        theOthers.addDeleteListener(GroupChat.removeTheOtherCallback);
        theOthers.addOneOnOneListener(GroupChat.onOneOnOneCallback);
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            theOthers.me.video.srcObject = stream;
            procesCommunication(stream);
        }).catch(err => console.error("camera not found on this hardware"));

    }

    static get properties() {
        return {
            showPublicChatbox: { type: Boolean }
        };
    }

    render() {
        return html`          
            ${this.mainGrid}     
            <div id="myVideoContanerDiv" class="my-video-container-div">
                <button  class="button close-button"  @click="${()=>this.closeNav()}">close &times;</button>
                <div>
                    ${this.myVideoContainer}
                </div>
            </div>

            <span id="openButton" class="button open-button" style=""  @click="${()=>this.openNav()}">o<br>p<br>e<br>n</span>

         `;
    }

    openNav() {
        this.shadowRoot.getElementById("myVideoContanerDiv").style.width = "20rem";
        this.shadowRoot.getElementById("openButton").style.display = "none";
    }
      
      closeNav() {
        this.shadowRoot.getElementById("myVideoContanerDiv").style.width = "0";
        this.shadowRoot.getElementById("openButton").style.display = "block";
      }


    static removeTheOtherCallback(userId) {
        _mainGrid.removeTheOther(userId);
    }

    static addTheOtherCallback(_theOther) {
        _mainGrid.addTheOther(createVideoContainer(_theOther));

    }

    static onOneOnOneCallback(payload) {
        _mainGrid.onOneOnOneCallback(payload)
    }
}


function createVideoContainer(theOther) {
     const videoContainer = document.createElement("video-container")

    theOther.video = videoContainer.getVideo();
    videoContainer.theOther = theOther;

    if (theOther != getTheOthers().me) {
        videoContainer.id = theOther.userId;
        const chatContainer = videoContainer.getChatContainer();

        chatContainer.peer = theOther
        chatContainer.me = getTheOthers().me
        chatContainer.addEventListener('chatMessage', (event) => {
            const ws = getWebSocket();
            if (!ws) {
                console.error("No WebSocket connection :(");
                return;
            }
            ws.send(JSON.stringify(event.detail));
        });

        theOther.chatboxContainer = chatContainer;
    }

    return videoContainer;
}

customElements.define("my-group-chat", GroupChat);
