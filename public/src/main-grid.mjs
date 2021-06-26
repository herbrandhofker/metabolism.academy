import { LitElement, html, css, svg } from 'lit-element';

import {  getTheOthers } from "./the-others.mjs"
export let _mainGrid = undefined

export class MainGrid extends LitElement {

    constructor() {
        super()
        _mainGrid = this;
        this.mainGrid =document.createElement("div");
        this.mainGrid.classList.add("grid");
        this.size=this.mainGrid.children.length;
      }

      static get properties() {
        return {
            size: Number
        };
    }

    static get styles() {
        return css`
        .grid{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            grid-gap: 25px;  
            margin: 0 25px;
            flex: 1 0 auto;
        }
        .introduction{
             font-size: 2em;
             width: 60%;
             margin: 6em;
        }
        `;
    }

    render() {
         return html`
          ${this.mainGrid}      
          ${(this.size==0)?this.getIntro():null}
   
        `;
    }
   
    getIntro() {
       
        return html`
        <div class="introduction">  
            <h1>Here are displayed the chat connections that are online connected with you.(partly working now)</h1>
            <p>You can join chat rooms by adding these to your registration.<br>Chat rooms can be based on :
                <ul>
                <li>Language</li>
                <li>Country</li>
                <li>Medical interest</li>
                <li>Nutrition interests</li>
                <li>Or any combination</li>
                </ul>
            </p>
            <h1>And coming soon:</h1>
            <p>
                 <ul>
                <li>To have a "one to one" private chat with someone else. (completely secure and private)</li>
                <li>To request an online consult with an accredited medical specialist. (completely secure and private)</li>
                <li>If you are a medical specialist, you can request to become an accredited member of the consultant group.</li>
                </ul>
            </p>
        </div>`;
    }


    removeTheOther(userId) {
        for (let i = 0; i < this.mainGrid.children.length; i++) {
            if (userId == this.mainGrid.children[i].id) {
                const el = this.mainGrid.children[i];
                this.mainGrid.removeChild(el);
            }
        }
        this.size=this.mainGrid.children.length;
    
    }

    onOneOnOneCallback(payload) {
        var children = Array.from(this.mainGrid.children);
        const mode = payload.mode;
        const receiverId = payload.receiverId;
        const senderId = payload.senderId;
        let result = undefined;
        if (senderId === theOthers.me.userId) {
            result = receiverId;
        }
        else
            if (receiverId === theOthers.me.userId) {
                result = senderId;
                children.forEach(el => {
                    if (el.id == result) el.isOneOnOne = (mode == "start")
                });
            }
        if (result) {
            const disp = (mode == "start") ? "none" : "flex";
            children.forEach(el => {
                if (el.id != result) el.style.display = disp
            });
        }
        else {
            //I am NOT part of one to one
            children.forEach(el => {
                if (el.id == senderId || el.id == receiverId) el.inAnotherOneOnOne = (mode == "start")
            });
        }
    }

    addTheOther(cnt) {
        console.log("1 "+this.mainGrid.children.length)
        this.mainGrid.appendChild(cnt);
        console.log("2 "+this.mainGrid.children.length)
        this.size=this.mainGrid.children.length;
    
       
    }

    getVideoContainers() {
        return Array.from(this.mainGrid.children);
    }
}

customElements.define("main-grid", MainGrid);
