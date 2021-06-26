import { LitElement, html, css } from 'lit-element';
import  './youtube-button.mjs';
import getContent from './content.mjs'

import {getButtonCss} from './utilCss.mjs';

export const content = getContent();

class Chapter extends LitElement {

    static get styles() {
        return [getButtonCss(), css`
        my-youtube-button{ 
            position: relative;
            top: 0.5rem;
            margin-left: 0.5rem;
        }
         `];   
    }

    constructor() {
        super();
        this.chapter=null;
        this.chapterNr=0;
     }


    static get properties() {
        return {
            chapter: Object,
            chapterNr: Number
        };
    }

    render() {
        return html`
        <div>
        <h2>${this.chapterNr + ". " + this.chapter.h1}</h2>
        ${this.chapter.video ? html`<my-youtube-button .videoData=${this.chapter.video} title="${this.chapter.h1}"></my-youtube-button>` : null}         
        ${ (this.chapter.ol)?
            html`
           <ol>     
               ${this.chapter.ol.map((item, index) => (item.video) ? html`<li id = ${this.chapterNr + "_" + index} >${item.li} <my-youtube-button .videoData=${item.video} title=${item.li}></my-youtube-button></li>` : null)}
           </ol>`
       : null}
    </div>`;
         
    }

    
}

customElements.define("my-chapter", Chapter);

