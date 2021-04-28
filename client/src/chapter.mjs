import { LitElement, html, css } from 'lit-element';
import getContent from './content.mjs'
import  './video.mjs';

const content = getContent();

class Chapter extends LitElement {

    static get styles() {
        return  css`
      
        `;   
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
        <h1>${this.chapterNr + ". " + this.chapter.h1}</h1>
        ${this.chapter.video ? html`<my-video .videoData=${this.chapter.video} title="${this.chapter.h1}"></my-video>` : null}         
        ${ (this.chapter.ol)?
            html`
           <ol>
               ${this.chapter.ol.map((item, index) => (item.video) ? html`<li id = ${this.chapterNr + "_" + index} >${item.li} <my-video .videoData=${item.video} title=${item.li}></my-video></li>` : null)}
           </ol>`
       : null}
    </div>`;
         
    }

    
}

customElements.define("my-chapter", Chapter);

