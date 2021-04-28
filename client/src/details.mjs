import { LitElement, html, css } from 'lit-element';
import  {content} from './chapter.mjs';


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
        let chapterNr = 0;
        return html`
        <section class="container">     
            <h1>Nutricion: the underestimated driving force for health</h1>
            <div>${content.map(chapter => html`<my-chapter .chapter=${chapter} chapterNr=${chapterNr++}></my-chapter>`)}</div>
        </section>
         `;
    }
 }

customElements.define("my-details", Details);

