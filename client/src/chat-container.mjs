import { LitElement, html, css, svg } from 'lit-element';
import { getWebSocket } from "./socket.mjs"

import {  getTheOthers } from "./the-others.mjs"
import { _interactiveGroupChat } from './group-chat.mjs';
import { _mainGrid } from './main-grid.mjs'

export class ChatContainer extends LitElement {

    static get styles() {
        return css`  
    .messages {
        overflow: scroll;
        margin-bottom: var(--padding-mid);
        background: #f3f3f3;
        flex-grow: 1; 
        min-height: 20rem;
        overflow-x: hidden;
    }

    .public-chat-box {
        display: flex; 
        flex-direction: column; 
    }

    .public-chat-message-box .chat-messages {
        flex: 4 1 auto; 
    }

    .public-chat-box .input-chat-message {
        flex: 1 1 auto; 
    }

    .private-chat-box {
    display: flex; 
    flex-direction: column; 
    padding: 1rem; 
    background-color: purple;
    }

    .private-chat-box .messages {
    min-height: 10rem;     
    }

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
  `;
    }

    constructor() {
        super()
        this.peer = null
        this.message = ""
    }

    static get properties() {
        return {
            peer: { type: Object },
            message: { type: String }
        };
    }

    render() {
        return html`
           <div class='${(this.peer == null) ? "public-chat-box" : "private-chat-box"}'>
                <div id='messages' class='messages'></div>
                    <div class="send-message-wrapper">
                        <input type='text' 
                                id='chatInput' 
                                class='input'
                                placeholder = "Type your message here"
                                value="">
                        </input>
                        <button id='send' class='send-button' @click="${this.send}">Send message</button>
                    </div>   
                </div>         
           </div>     
        `;
    }

    send(e) {
        alert(888)
        const inputEl = this.shadowRoot.getElementById("chatInput");
        const value = inputEl.value;
        inputEl.value = "";
        let msg = (this.peer) ?
            { "type": "chatMessage", "payload": { "sender": theOthers.me.profile.name, "senderId": theOthers.me.userId, "receiverId": this.peer.userId, "message": value } }
            : { "type": "chatMessage", "payload": { "sender": theOthers.me.profile.name, "senderId": theOthers.me.userId, "message": value } };

        getWebSocket().send(JSON.stringify(msg));
    }

    firstUpdated(){
        const inputEl = this.shadowRoot.getElementById("chatInput");
        inputEl.onkeypress=(e)=>{
            if(e.keyCode==13){
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

    static processChatOutput(senderId, sender, receiverId, message) {
        if (receiverId == null) {
            if (_interactiveGroupChat.publicChatbox)
                _interactiveGroupChat.publicChatbox.message = sender + ": " + message;
        }
        _mainGrid.getVideoContainers().forEach(videoContainer => {
            const _chatboxContainer = videoContainer.chatbox;
            if (videoContainer.id == receiverId) {
                _chatboxContainer.message = "me : " + message;
                _chatboxContainer.videoContainer.openChatDialog();
            }
            else if (videoContainer.id == senderId) {
                _chatboxContainer.message = sender + ": " + message;
                _chatboxContainer.videoContainer.openChatDialog();
            }
        });
    }
}

customElements.define("chat-container", ChatContainer);
