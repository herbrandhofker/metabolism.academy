import { LitElement, html, css } from 'lit-element';
import  {content} from './chapter.mjs';
import {getButtonCss,getSectionCss} from './utilCss.mjs';


class Details extends LitElement {

    static get styles() {
        return  [getSectionCss(),getButtonCss(),css` 
        .chapter{
            margin: 0px;
            padding: 0px;
        }
        `];   
    }

    render() {
        let chapterNr = 0;
        return html`
        <section>     
            <h1>Nutrition: the underestimated driving force for health</h1>
            <div class="content" >${content.map(chapter => html`<my-chapter class="chapter" .chapter=${chapter} chapterNr=${chapterNr++}></my-chapter>`)}</div>
        </section>
         `;
    }
 }

customElements.define("my-details", Details);

