import { LitElement, html, css } from 'lit-element';
import getContent from './content.mjs'
import  './video.mjs';

const content = getContent();

const stylesCss=css`
.container {
    display: flex; 
    flex-direction: column;
    align-items: center;
}  

.video-container {
    display: flex;
    flex-direction: column;
    background-color:  lightgrey;
    width: 100%;
}

.video-bottom-section {
    display: flex;
    flex-direction: column;
    margin: 1rem;
}

.video-bottom-section>.button-box {
    display: flex;
    width: 100%;
}

.video-bottom-section>.button-box>.item {
    margin-left: 1.2rem;
    font-size: 1.2rem;
}

.volume-span {
    display: flex;
    background-color:  grey;
    white-space: pre;
    align-items: center;
}

.opaque-button {
    border: none;
    background-color: transparent;
    outline: none;
}

.video-container>.video-bottom-section>.button-box>.close-button {
    margin-left: auto;
    font-size: 2rem;
}

.video-container>.video-bottom-section>.video-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-left: 1.2rem;
    margin-top: .5rem;
    text-decoration: none;
    color: black;
}

.video-container>video {
    width: 100%;
}

.video-container>video::-webkit-media-controls {
    display: none;
}
`;

class Details extends LitElement {

    static get styles() {
        return  stylesCss;
   
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

export default stylesCss;
