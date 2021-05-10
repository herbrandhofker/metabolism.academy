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

