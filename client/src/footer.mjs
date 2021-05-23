
import { LitElement, html, css } from 'lit-element';



class Footer extends LitElement {
    static get styles() {
        return [ css`   
  

           
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
            <div>
              Footer
            </div>
        `;
    }    
}

customElements.define("my-footer", Footer);
