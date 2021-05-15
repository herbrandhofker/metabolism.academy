import { svg, css, html } from 'lit-element';

export function getButtonCss() {
    return css`       
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
            background-color: var(--tertiar-color);       
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

export function getIconCss() {
    return css`
    svg{
        height: 25px; 
        width: 20px; 
        padding: var(--padding-small); 
    } 
    
    .icon-box {
        padding: 1rem;
        display: flex;
    }   
` ;
}

export function screenShare() {
    return html`<svg viewBox="0 0 47.68 42.21"><defs><style>.cls-1,.cls-3{fill:none;stroke-miterlimit:10;}.cls-1{stroke:#1d1d1b;stroke-width:4px;}.cls-2{fill:#010101;}.cls-3{stroke:#e62d28;stroke-width:7px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline class="cls-1" points="24.7 6.03 45.48 6.03 45.48 32.46 3.91 32.46 3.91 6.03 24.7 6.03"/><line class="cls-1" x1="15.18" y1="40.21" x2="33.06" y2="40.21"/><line class="cls-1" x1="24.7" y1="33.85" x2="24.7" y2="38.54"/><polygon class="cls-2" points="18.78 11.71 18.78 11.71 18.78 29.21 36.28 20.46 18.78 11.71"/><line class="cls-3" x1="2.11" y1="35.7" x2="45.57" y2="2.79"/></g></g></svg>`;
}
export function screenUnshare() {
    return html`<svg viewBox="0 0 45.57 38.18" class="btn-share-screen"><defs><style>.cls-1{fill:none;stroke:#1d1d1b;stroke-miterlimit:10;stroke-width:4px;}.cls-2{fill:#010101;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline class="cls-1" points="22.78 2 43.57 2 43.57 28.43 2 28.43 2 2 22.78 2"/><line class="cls-1" x1="13.27" y1="36.18" x2="31.15" y2="36.18"/><line class="cls-1" x1="22.78" y1="29.82" x2="22.78" y2="34.51"/><polygon class="cls-2" points="15.65 6.47 15.65 6.47 15.65 23.97 33.15 15.22 15.65 6.47"/></g></g></svg>`;
}

export function muteIcon(){
    return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.39 46.5"><defs><style>.cls-1,.cls-2,.cls-3{fill:none;stroke-miterlimit:10;}.cls-1,.cls-2{stroke:#010101;}.cls-1{stroke-width:3.73px;}.cls-2{stroke-width:2.8px;}.cls-3{stroke:#e62d28;stroke-width:8px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M7.61,31.32a16.36,16.36,0,0,0,12.59,6.3,16.36,16.36,0,0,0,12.58-6.3"/><rect class="cls-1" x="10.75" y="1.86" width="18.88" height="28.32" rx="9.23"/><line class="cls-1" x1="13.2" y1="44.64" x2="27.19" y2="44.64"/><line class="cls-2" x1="20.2" y1="36.04" x2="20.2" y2="45.86"/><line class="cls-3" x1="2.2" y1="27.84" x2="38.2" y2="4.21"/></g></g></svg>` ;
}

export function unMuteIcon(){
    return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.16 46.5"><defs><style>.cls-1,.cls-2{fill:none;stroke:#010101;stroke-miterlimit:10;}.cls-1{stroke-width:3.73px;}.cls-2{stroke-width:2.8px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M1.49,31.32a16.36,16.36,0,0,0,12.59,6.3,16.39,16.39,0,0,0,12.59-6.3"/><rect class="cls-1" x="4.64" y="1.86" width="18.88" height="28.32" rx="9.23"/><line class="cls-1" x1="7.09" y1="44.64" x2="21.07" y2="44.64"/><line class="cls-2" x1="14.08" y1="36.04" x2="14.08" y2="45.86"/></g></g></svg>`;  
}
