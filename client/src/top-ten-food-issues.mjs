import { LitElement, html, css } from 'lit-element';
import './youtube-button.mjs';
import { content } from './chapter.mjs';
import { getButtonCss, getSectionCss } from './utilCss.mjs';

const FOODS = [
    { name: "Carbohydrates", description: "Carbs: sugar, fructose, bread, pasta's, even apples, oranges..., Science: They can cause Insuline Resistance" },
    { name: "Fat", description: "Eating fat causes obesitas? Science : NO, the reaction of your body on what you eat is important, see video's" },
    { name: "Fat Unsaturated", description: "like seed oils, etc. Are they healthy> Science: NO, seed oils are harmfull!!. see video's " },
    { name: "Fat Saturated", description: "Is saturated fat harmfull? Science : NO, see video's" },
    { name: "Omega 3/Omega 6", description: "See video's." },
    { name: "Proteins", description: "See video's" },
    { name: "Salt", description: "Is too much harmfull? Science: NO, your insulin resistance causes high bloodpressure" }
];

class TopTenFoodIssues extends LitElement {

    static get styles() {
        return [getSectionCss(), getButtonCss(), css` 
        table {
            border-collapse: collapse;
        }

        table, th, td {
            border: 1px solid black;
            text-align: left;
         }

        th, td {
            padding: 10px;
        } 
        
        .header{
            background-color: var(--primary-color);
            color: var(--secundary);
        }  
       
   `]
    }

    render() {
        return html` 
        <section>
            <h1>Common health issues and what science tells us today</h1>
            <div class="content" >     
            
                 <table class="summary">
                    <caption class="header"><h2>Top 10 generic food discussions</h2></caption>
                    <thead>
                        <tr><th>Food</th><th>What science tells us today</th></tr>
                    </thead>
                    <tbody>               
                        ${FOODS.map(food => html`<tr @mouseenter=${e => this.insertFood(e, food.name)}><td>${food.name}</td><td>${food.description}</tr>`)}
                    </tbody>
                </table> 
            </div>         
           </section>
    `;
    }

    insertFood(event, food) {
        let detailRow = this.shadowRoot.getElementById("detailFoodRow");
        if (detailRow) {
            detailRow.remove()
        }
        let tr = event.target;
        const tbody = tr.parentElement;
        detailRow = tbody.insertRow(tr.rowIndex);
        detailRow.id = "detailFoodRow";
        detailRow.classList.add("temporary")
        const cell = detailRow.insertCell();
        cell.setAttribute("colspan", "2");

        cell.innerText = food;
        let ch = null;
        content.map(chapter => { if (chapter.food == food) ch = chapter; })
        if (ch) {
            const chapterEl = cell.appendChild(document.createElement("my-chapter"));
            chapterEl.chapter = ch;
            chapterEl.chapterNr = 1;
        }
    }
}
customElements.define("my-top-ten-food-issues", TopTenFoodIssues);
