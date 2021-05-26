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
    section{
        padding :30px;
        font-family: var(--font-family);
        background-color:  #D9EEE1!important;
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

export function homeIcon(){
    return html`
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg>`;
}

export function linkedInIcon(){
    return html`
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" /></svg>`;
}


export function facebookIcon(){
    return html`
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" /></svg>`;
}

export function twitterIcon(){
    return html`
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" /></svg>`;
}