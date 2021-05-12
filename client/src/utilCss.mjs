import { svg, css, html } from 'lit-element';

export function getButtonCss() {
    return css`
       
    .button-box{
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: var(--button-box-height);  
        width: 100%;              
    }

    .button {
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
    }  

    .button:hover {
        background-color: var(--button-background-color-hover);
    }  
    `;
}

export function getSectionCss() {
    return css`
        section {
            display: flex;
            flex-direction: column;     
            background-color: var(--tertiar-background-color);       
            color: black;
            border: 3px solid ;
            border-color: var(--primary-color);
            padding-left: 10rem;
        }
        h1 {
            font-size: 2.5rem;
        }
        .content{
            margin-left : 0px;
            margin-right : 4rem;
        }
` ;


}


export function screenShare() {
    return html`<svg viewBox="0 0 47.68 42.21"><defs><style>.cls-1,.cls-3{fill:none;stroke-miterlimit:10;}.cls-1{stroke:#1d1d1b;stroke-width:4px;}.cls-2{fill:#010101;}.cls-3{stroke:#e62d28;stroke-width:7px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline class="cls-1" points="24.7 6.03 45.48 6.03 45.48 32.46 3.91 32.46 3.91 6.03 24.7 6.03"/><line class="cls-1" x1="15.18" y1="40.21" x2="33.06" y2="40.21"/><line class="cls-1" x1="24.7" y1="33.85" x2="24.7" y2="38.54"/><polygon class="cls-2" points="18.78 11.71 18.78 11.71 18.78 29.21 36.28 20.46 18.78 11.71"/><line class="cls-3" x1="2.11" y1="35.7" x2="45.57" y2="2.79"/></g></g></svg>`;
}
export function screenUnshare() {
    return html`svg viewBox="0 0 45.57 38.18" class="btn-share-screen"><defs><style>.cls-1{fill:none;stroke:#1d1d1b;stroke-miterlimit:10;stroke-width:4px;}.cls-2{fill:#010101;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline class="cls-1" points="22.78 2 43.57 2 43.57 28.43 2 28.43 2 2 22.78 2"/><line class="cls-1" x1="13.27" y1="36.18" x2="31.15" y2="36.18"/><line class="cls-1" x1="22.78" y1="29.82" x2="22.78" y2="34.51"/><polygon class="cls-2" points="15.65 6.47 15.65 6.47 15.65 23.97 33.15 15.22 15.65 6.47"/></g></g></svg>`;
}
