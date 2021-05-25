import { LitElement, html, css, svg } from 'lit-element';

export let youtubeDialog = null;

class YoutubeDialog extends LitElement {

    static get styles() {
        return css`
        
    .dialog {        
        background-color: var(--primary-color);
        margin : 20% auto;
        padding : 20px;
        width : 90%;
    }

    .header {
        margin-botton: 10px;
        color: white;
        text-align: center;
     }

    svg {
        max-width: 1.6rem;
        max-height: 1.6rem    
    }

    path {
        fill: var(--secundairy-color);
    }

    path:hover {
        fill: var(--primary-color);
    }

    .opaque-button {
    border: none;
    background-color: transparent;
    outline: none;
    }

    .close-button {
    margin-left: auto;
    font-size: 2rem;
    }

    .button-box{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: var(--button-box-height);  
    width: 100%;              
    }


    .button {
    white-space: nowrap; 
    padding: var(--button-padding);
    margin: var(--button-margin);
    background-color: var(--button-background-color);
    border-color: var(--button-border-color);
    color: var(--button-color);
    border-width: var(--button-border-width);
    font-family: var(--button-font-family);
    font-size: var(--button-font-size);
    font-weight: var(--button-font-weight);
    height: var(--button-height);

    border-radius : var(--button-border-radius);

    cursor:pointer
    }

    /**youtube section */

    .youtube-video-container {
    display: flex;
    flex-direction: column;
    background-color:  lightgrey;
    width: 100%;
    }

    .button-box{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: var(--button-box-height);  
    width: 100%;  
    padding-bottom : 1em;   
    }


    .btnbox-item {
    margin-left: 1.2em;
    margin-top : 1em;
    font-size: 1.6rem;        
    }

    .length{
    white-space: nowrap; 
    color: black;
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

    .close-button {
    font-size: 2em;
    margin-top: 0.5em;
    }

    video {
    width: 100%;
    pointer-events: none;
    }

    video::-webkit-media-controls {
    display: none;
    } 
`;
    }


    constructor() {
        super();
        console.log("yt-dialog()")
        youtubeDialog = this;
        this.title = null;
        this.content = null;
        this.footer = null;
    }


    static get properties() {
        return {
            title: {type: String}
        };
    }

    render() {
        return html`
         <div class="dialog">
            <div><h2 class="header">${this.title}</h2></div>
            <div id="content">content</div>
            <div class="footer"></div>
        </div>  
        `;
    }

    firstUpdated() {
        this.content = this.shadowRoot.getElementById("content");
        this.footer = this.shadowRoot.getElementById("footer");
        console.log("yt-firstupdate")
    }
}

customElements.define("my-youtube-dialog", YoutubeDialog);
