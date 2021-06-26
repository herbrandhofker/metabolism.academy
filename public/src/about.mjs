import { LitElement, html, css } from 'lit-element';

import {getButtonCss,getSectionCss} from './utilCss.mjs';
import hofker from './images/herbrand-hofker.png';

class About extends LitElement {

    static get styles() {
        return [getSectionCss(),css`
       
        
        .details{
            margin : 2rem 4rem 4rem 4rem;
        }   
      
        .picture{
            width: 20rem;
            margin : 6rem 4rem 4rem 4rem;
        }
     `]};

    render() {
        return html`
          <section>
            <div>
                ${this.addImg()}               
            </div>
            <div class="details">
                <h1>Drs. Herbrand Hofker</h1>
      
                <p>
                    In my study, mixed Theoretical/Experimental Physics, I learned to make theoretical models, and test them with experiments. 
                    As long as experiments produce facts viloating the model, you try to adapt the model. This is a continuous process till your model holds against all experimental facts.
                 </p>
                 <p>   In my study and career as IT engineer, you design the business process, implement the model and test it in practice. This
                    process is also an iteration of adapting the model till all practicalities for in the adapted model.
                    This is called agile programming.
                </p>
                <p>
                    When I was diagnosed Diabetes 2, what happened exactly at the moment when I wanted to reture from my business, I started to do
                    with medicin waht I did in IT and in Physics: Trying to find the model that fits my practical experience.
                    With the help of Google I discovered I can reverse my Diabbetes 2.
                    This is  not what my medical advisors told me.
                </p>
                <p>
                This inspired me to lay down the current model of Health, against the model of Health that should be feeded by new or discarded facts.
                </p>
                <h1>Qualifications</h1>
                <ul>
                    <li>Master degree Nuclear Phyics, theoretical and experimental, Mathematics, Chemistry at the university of Utrecht and Groningen</li>
                    <li>Extra degree in  Informatics at the University of Twente, Netherlands</li>           
                    <li>Was succesfull entrepeneur in IT, see his linkedin</li>                                                                          
                    <li>Was diagnosed with Diabetes 2, at the moment he wanted to retire from his business</li>
                </ul>
            </div>            
        </section>
       `;
    }

    addImg() {
        const imgEl = new Image();
        imgEl.src = hofker;
        imgEl.classList.add("picture")
        return imgEl;
    }
}
customElements.define("my-about", About);

