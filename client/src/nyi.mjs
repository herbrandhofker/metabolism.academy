import { LitElement, html, css } from 'lit-element';

class Nyi extends LitElement {

    constructor() {
        super();
        this.text = "hallo"
    }
    static get properties() {
        return {
            text: { type: String }
        };
    }

    render() {
        return html`
        <h1 id="nyi">${this.text} not yet implemented</h1>`;
    }
}

customElements.define("my-nyi", Nyi);
