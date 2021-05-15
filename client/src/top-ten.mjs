import { LitElement, html, css } from 'lit-element';
import './youtube-button.mjs';

import { content } from './chapter.mjs';
import topten from './data/topten.json';

const illnesses = ["Obesitas", "Diabetes 2",
    "Cancer (various forms)", "Thyroid Disorders", "Dementia", "Arthritis", "Heart and blood vessel disorders"];

const ILLNESSES = [
    "Obesitas",
    "Diabetes 2",
    "Cancer",
    "Thyroid disorders",
    "Dementia",
    "Arthritis",
    "Heart and blood vessel disorders"
];

const FOODS = [
    { name: "Carbohydrates", description: "Carbs: sugar, fructose, bread, pasta's, even apples, oranges..., Science: They can cause Insuline Resistance" },
    { name: "Fat", description: "Eating fat causes obesitas? Science : NO, the reaction of your body on what you eat is important, see video's" },
    { name: "Fat Unsaturated", description: "like seed oils, etc. Are they healthy> Science: NO, seed oils are harmfull!!. see video's " },
    { name: "Fat Saturated", description: "Is saturated fat harmfull? Science : NO, see video's" },
    { name: "Omega 3/Omega 6", description: "See video's." },
    { name: "Proteins", description: "See video's" },
    { name: "Salt", description: "Is too much harmfull? Science: NO, your insulin resistance causes high bloodpressure" }
];


import { getButtonCss, getSectionCss } from './utilCss.mjs';
class TopTen extends LitElement {

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
            <h1>Common health issues, nutrition and what science tells us today</h1>
            <div class="content" >     
                <table class="summary">
                <caption class="header"><h2>Top 10 Health Issues and nutrition</h2></caption>
                    <thead>
                        <tr>
                            <th>Mediacal issue and what science tells us today</th><th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${ILLNESSES.map(illness => html`<tr @mouseenter=${e => this.insertIllness(e, illness)} ><td>${illness}</td><td>${this.getIllnessDescription(illness)}</td></tr>`)}
                    </tbody>
                </table>
                <br/><br/>
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

    getIllnessDescription(illness) {
        let result = "Not yet implemented, comes later."
        topten.map(rec => {
            if (rec.problem == illness) {
                result = rec.description;
            }
        });
        return result;
    }

    insertIllness(event, item) {
        let detailRow = this.shadowRoot.getElementById("detailIllnessRow");
        if (detailRow) {
            detailRow.remove()
        }
        let tr = event.target;
        const tbody = tr.parentElement;
        detailRow = tbody.insertRow(tr.rowIndex);
        detailRow.id = "detailIllnessRow";
        detailRow.classList.add("temporary")
        topten.map(rec => {
            if (rec.problem == item) {
                let cell = detailRow.insertCell(0);
                cell.setAttribute("colspan", "2");
                const div = cell.appendChild(document.createElement("div"));

                const table = div.appendChild(document.createElement("table"));
                table.classList.add("inner-table")
                const thead = table.appendChild(document.createElement("thead"));
                let row = thead.insertRow(0);

                cell = row.appendChild(document.createElement("th"));
                cell.innerText = "today's advice"
                cell = row.appendChild(document.createElement("th"));
                cell.innerText = "today's reason"
                cell = row.appendChild(document.createElement("th"));
                cell.innerText = "advice based on science"
                cell = row.appendChild(document.createElement("th"));
                cell.innerText = "reason based on science";
                if (rec.advices[0].video) {
                    cell = row.appendChild(document.createElement("th"));
                    cell.innerText = "See Video"
                }
                const tbody = table.appendChild(document.createElement("tbody"));
                row = tbody.insertRow(0);
                cell = row.insertCell(0);
                cell.innerText = rec.advices[0].advice0;
                cell = row.insertCell(1);
                cell.innerText = rec.advices[0].reason0;
                cell = row.insertCell(2);
                cell.innerText = rec.advices[0].advice;
                cell = row.insertCell(3);
                cell.innerText = rec.advices[0].reason;
                if (rec.advices[0].video) {
                    cell = row.insertCell(4);

                    cell.innerText = "See Video"
                    const myVideo = cell.appendChild(document.createElement("my-youtube-button"));
                    myVideo.id = "myVideo";
                    myVideo.videoData = rec.advices[0].video;
                    myVideo.title = rec.problem;
                }             
            }
        })
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
customElements.define("my-top-ten", TopTen);
