
import { LitElement, html, css } from 'lit-element';
import {  linkedInIcon, facebookIcon, twitterIcon } from './utilCss.mjs'



class Footer extends LitElement {
    static get styles() {
        return [ css`  
    * {
        --font-size-very-big: 30px;
        --font-size-big: 24px;
        --font-size-default: 1.2rem;
        --font-size-small: 12px;        
        font-family: var(--font-family);    
        font-weight: bold;
        font-size: var(--font-size-default) ;
        color: white;     
    } 

    section{
        background-color: black;
        width: 100%;
        padding: 20px;       
    }      
    
    .footer-left,.footer-center,.footer-right{
        display: inline-block;
        vertical-align: top;
    }
    
    .footer-left{
        width: 30%;
    }

    .footer-center{
        width: 30%;
    }

    .footer-right{
        width: 30%;
   } 
    
    h3{
        font-size: var(--font-size-big);
        margin-top: 0rem;
        margin-bottom: 1rem;
    }
    
    h3 span{
        font-size: var(--font-size-big);
        color : var(--primary-color)
    }    
    
    .copy-right{
        color: var(--primary-color);
        font-size: var(--font-size-default);
    }         
 
   .email{
        color: var(--primary-color);
        text-decoration: none;
   } 
    
   .footer-icons{
        margin-top: 1.2rem;
   }
    
  .footer-icons a{
        display: inline-block;
        width: 35px;
        height: 35px;
        cursor: pointer;
        background-color:  #33383b;
        border-radius: 2px;  
        text-align: center;
        line-height: 35px;    
        margin-right: 3px;
        margin-bottom: 5px;
   }    
    
   @media (max-width: 880px) {    
    *{
        font-size: var(--font-size-small);
    }    
    .footer-left,
    .footer-center,
    .footer-right{
        width: 80%;
        text-align: center;
    }         
   }
        
   svg {
        max-width: 1.6rem;
        max-height: 1.6rem    
    }
    path {
        fill: var(--primary-color);
    }

    path:hover {
        fill: var(--secundairy-color);
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
            <div class="footer-left">
                <h3>Metabolism<span>Academy</span></h3>  
                <p class="copy-right">kafka.academy b.v. &copy; 2021</p>
                <p>Author : Herbrand Hofker</p>
                <p><a class="email" href="herbrand.hofker@gmail.com">herbrand.hofker@gmail.com</a>
                </p>
            </div>
        
            <div class="footer-center">  
                <h3>Contact</h3>      
                 <p>Oudaen 26 Lelystad, Netherlands</p>              
                <p>+31 641850977</p>              
                 <p><a class="email" href="mailto:info@mitochondria.academy">info@mitochondria.academy</a></p>
            </div>
        
            <div class="footer-right"> 
                <h3>The projects</h3>                  
                <p>
                     Metabolism.academy and mitochondria.academy are projects meant for all people who want to become healthier &amp; help other to become healthier.
                </p>
        
                <div class="footer-icons">
                    <a href="#">${facebookIcon()}</a>
                    <a href="#">${twitterIcon()}</a>
                    <a href="#">${linkedInIcon()}</a>
                </div> 
            </div>
        </section>
        `;
    }    
}

customElements.define("my-footer", Footer);
