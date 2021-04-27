import { LitElement, html, css } from 'lit-element';
import getContent from './content.mjs'
import  './video.mjs';

const content = getContent();

class Details extends LitElement {

    static get styles() {
        return  css`
       
        section {
            display: flex;
            flex-direction: column; 
            background-color: var(--tertiar); 
            margin: auto;
            width: 50%;
            border: 3px solid green;
            padding: 10px;
            --font-size-video-button: 1rem;
        }
        `;   
    }

    render() {
        let teller = 0;
        return html`
        <section class="container">     
            <h1>Nutricion: the underestimated driving force for health</h1>
            <div>${content.map(chapter => this.doChapter(chapter, teller++))}</div>
        </section>
         `;
    }

    doChapter(chapter, teller) {
        return html`
        <div id=${teller + "_"}>
            <h1>${teller + ". " + chapter.h1}</h1>
            ${chapter.video ? html`<my-video .videoData=${chapter.video} title="${chapter.h1}"></my-video>` : null}         
            ${this.doOl(chapter.ol, teller)}
        </div>`;
    }

    doOl(ol, teller) {
        if (ol)
            return html`
            <ol>
                ${ol.map((item, index) => (item.video) ? html`<li id = ${teller + "_" + index} >${item.li} <my-video .videoData=${item.video} title=${item.li}></my-video></li>` : null)}
            </ol>`;
        return null;
    }  
}

customElements.define("my-details", Details);

