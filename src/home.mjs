import { LitElement, html, css } from 'lit-element';

import {getSectionCss} from './utilCss.mjs';

class Home2 extends LitElement {

    static get styles() {
        return [getSectionCss(),css`          
        
   `]};


    render() {
         return html`
        <section>
        <h1>WHERE SCIENCE MEETS MEDICINE</h1>
        <div>
        <p>Dr Paul Mason:<br><br>One might reasonably assume that modern medicine practice would be soundly based on years of accumulated
            evidence. Unfortunately, this is not always the case. In many cases, medical practices do not reflect, and
            sometimes directly contrast with what is shown by hard science. This is particulary so in metabolic
            medicine,
            spinal pain and nutrition for athletic performance. The end result is that patients often do not recieve the
            best quality care. I always strive to ensure that my practice is solidly evidence based, especially where it
            diverges from current practices
        </p>   
        </div>           
    </section>`;
    }
}
customElements.define("my-home", Home2);
