import { LitElement, html, css } from 'lit-element';
import { getTheOthers } from "./the-others.mjs"
import { procesCommunication, getWebSocket } from "./socket.mjs"
import { } from './video-container.mjs';


export let _mainGrid = null;

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

        
.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
  }
  
  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }
  
  .sidenav a:hover {
    color: #f1f1f1;
  }
  
  .sidenav .closebtn {

    background-color: var(--primary-color);
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }

#openButton{
    background-color: var(--primary-color);
    position: absolute;
    top: 10rem;
    right: 1rem;
    font-size: 3rem;
    min-height: 10rem;
    padding: 2rem;
}  `}

/*
          
        .my-video-container {
            position: absolute;
            bottom: 1rem;
            right: 25px;
            display: flex;
            flex-direction: row-reverse;
            align-items: flex-end;
        }     
            .main-container {
            display: flex;
            justify-content: space-between;
            margin: 0 25px;
            background-color: var(--color-one);
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
    
*/

    constructor() {
        super()
        this.showPublicChatbox = true;
        const theOthers = getTheOthers();

        getWebSocket().send(JSON.stringify({ type: "registrations" }));


        this.myVideoContainer = createVideoContainer(theOthers.me);
 //       this.myVideoContainer.classList.add("my-video-container");
        this.myVideoContainer.itIsMe = true;
        this.myVideoContainer.id = theOthers.me.profile.email;


        //   _interactiveGroupChat = this.myVideoContainer.chatContainer;
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
            <div id="mySidenav" class="sidenav">
                <a href="javascript:void(0)" class="closebtn"  @click="${()=>this.closeNav()}">close &times;</a>
                <div style="color:yellow">
                    ${this.myVideoContainer}
                </div>
            </div>

            <span id="openButton" style="font-size:30px;cursor:pointer"  @click="${()=>this.openNav()}">o<br>p<br>e<br>n</span>

         `;
    }

    openNav() {
        this.shadowRoot.getElementById("mySidenav").style.width = "250px";
        this.shadowRoot.getElementById("openDiv").style.display = "none";
    }
      
      closeNav() {
        this.shadowRoot.getElementById("mySidenav").style.width = "0";
        this.shadowRoot.getElementById("openDiv").style.display = "block";
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
