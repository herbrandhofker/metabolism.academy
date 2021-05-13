import { LitElement, html, css } from 'lit-element';
import { getTheOthers } from "./the-others.mjs"
import { procesCommunication, getWebSocket } from "./socket.mjs"
import { } from './video-container.mjs';


export let _interactiveGroupChat = null;

export class GroupChat extends LitElement {

    static get styles() {
        return css` 
        video-container {
            background-color: rgb(100, 136, 212);
            display: flex;
            flex-direction: column;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            max-height: 75vh; 
        }
        .my-video-container {
            position: absolute;
            bottom: 1rem;
            right: 25px;
            display: flex;
            flex-direction: row-reverse;
            align-items: flex-end;
        }

     
      `}


    static get stylesabc() {
        return css` 
          
            .main-container {
            display: flex;
            justify-content: space-between;
            margin: 0 25px;
            background-color: var(--color-one);
         }
        
        .public-chat-container { 
            height: fit-content; 
            background: var(--color-two);
            padding: var(--padding-small); 
        }
        
        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--color-whiteish);
            font-size: 1.2rem; 
        }
        
        .logo-container {
            width: 75px;
            padding: var(--padding-small);
        }
        
        .main-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            grid-gap: 25px;  
            margin: 0 25px;
            flex-grow: 1;
        }
     
        
        video {
            max-width: 100%;
            max-height: 75vh;
        }
    
        `;
    }

    constructor() {
        super()
        this.showPublicChatbox = true;
        const theOthers = getTheOthers();

        console.log("group chat constructor")
        getWebSocket().send(JSON.stringify({ type: "registrations" }));


        this.myVideoContainer = createVideoContainer(theOthers.me);
        this.myVideoContainer.classList.add("my-video-container");
        this.myVideoContainer.itIsMe = true;
        this.myVideoContainer.id = theOthers.me.profile.email;


        //   _interactiveGroupChat = this.myVideoContainer.chatContainer;
        _interactiveGroupChat = this;
        this.mainGrid = document.createElement("main-grid");
        this.mainGrid.classList.add("main-grid");

        theOthers.updateMe({ "video": this.myVideoContainer.getVideo() });
        theOthers.addSetListener(GroupChat.addTheOtherCallback);
        theOthers.addDeleteListener(GroupChat.removeTheOtherCallback);
        theOthers.addOneOnOneListener(GroupChat.onOneOnOneCallback);
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            theOthers.me.video.srcObject = stream;
            procesCommunication(stream);
            console.log("camera found")
        }).catch(err => console.error("camera not found on this hardware"));

    }




    static get properties() {
        return {
            showPublicChatbox: { type: Boolean }
        };
    }

    render() {
        return html`
            ${this.myVideoContainer}
           <chat-container class="public-chat-container" style="display:${(this.showPublicChatbox) ? 'flex' : 'none'}" ></chat-container>
         `;
    }

    render2() {
        return html`
            ${this.myVideoContainer}
            ${this.mainGrid}
            aaa
            <chat-container class="public-chat-container" style="display:${(this.showPublicChatbox) ? 'flex' : 'none'}" ></chat-container>
            bbb
        `;
    }

    firstUpdated() {
        this.publicChatbox = this.shadowRoot.querySelector('chat-container');
    }

    static removeTheOtherCallback(userId) {
        _interactiveGroupChat.mainGrid.removeTheOther(userId);
        _interactiveGroupChat.showPublicChatbox = (getTheOthers().size > 1);
    }

    static addTheOtherCallback(_theOther) {
        _interactiveGroupChat.mainGrid.addTheOther(createVideoContainer(_theOther));
        _interactiveGroupChat.showPublicChatbox = (getTheOthers().size > 1)


    }

    static onOneOnOneCallback(payload) {
        _interactiveGroupChat.mainGrid.onOneOnOneCallback(payload)
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
