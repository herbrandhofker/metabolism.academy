
import { LitElement, html, css } from 'lit-element';



class Footer extends LitElement {
    static get styles() {
        return [ css`   
        section{
            background-color: black;
            margin : 0px;
        }
           
    `];
    }

    constructor() {
        super();
    }

    static get properties() {
        return {
            };
    }

    render() {
        return html`
            <section>
              Footer
            </section>
        `;
    }    
}

customElements.define("my-footer", Footer);
