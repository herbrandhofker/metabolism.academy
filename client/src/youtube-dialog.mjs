import { LitElement, html, css, svg } from 'lit-element';

class YoutubeDialog extends LitElement {

    static get styles() {
        return css`
        `;
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
            <div><h2 id="dialogHeader">header</h2></div>
            <div id="dialogContent">content</div>
            <div id="dialogFooter">footer</div>
        </div>  
        `;
    }
}

customElements.define("my-youtube-dialog", YoutubeDialog);
