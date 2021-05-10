import { LitElement, html, css, svg } from 'lit-element';

import {  getTheOthers } from "./the-others.mjs"
export let _mainGrid = undefined

export class MainGrid extends LitElement {

    constructor() {
        super()
        _mainGrid = this;
        this.mainGrid = document.createElement("div");
        this.mainGrid.classList.add("grid");
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
        `;
    }

    render() {
        return html`${this.mainGrid}`;
    }

    removeTheOther(userId) {
        for (let i = 0; i < this.mainGrid.children.length; i++) {
            if (userId == this.mainGrid.children[i].id) {
                const el = this.mainGrid.children[i];
                this.mainGrid.removeChild(el);
            }
        }
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
        this.mainGrid.appendChild(cnt);
    }

    getVideoContainers() {
        return Array.from(this.mainGrid.children);
    }
}

customElements.define("main-grid", MainGrid);
