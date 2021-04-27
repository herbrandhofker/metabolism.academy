import { LitElement, html, css } from 'lit-element';
import './video.mjs';

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
    "Carbohydrates (carbs)",
    "Fat",
    "Fat Saturated",
    "Omega 3/Omega 6",
    "Proteins",
    "Salt"
];



class TopTen extends LitElement {

    static get styles() {
        return css` 
        .container {
            display: flex; 
            flex-direction: column;
            align-items: center;
        }  

        h3{
            width: 90%;
        } 

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
            background-color: white;
            color: black;
        }  
  
        .summary{
            width: 80%;
         }

        .summary thead th:nth-child(1) {
            width: 50%;
        }

        .summary thead th:nth-child(2) {
            width: 50%;
        }
        .summary th {background: var(--primary);}
        .summary  tr:nth-child(even) {background: #CCC}
        .summary tr:nth-child(odd) {background: #FFF}
        .temporary td {background: lightblue;}

        .inner-table {
            width: 100%;
        }
        .inner-table thead th:nth-child(1) {
            width: 25%;
        }
        .inner-table thead th:nth-child(2) {
            width: 25%;
        }
        .inner-table thead th:nth-child(3) {
            width: 25%;
        }
        .inner-table thead th:nth-child(4) {
            width: 25%;
        }
        .inner-table td{
            background: ligthgrey
        }
        .inner-table th{
            background: yellow
        }
   `
    }


    render() {
        let teller = 0;
        return html` 
        <section class="container">
            <h1>Common Health Issues, nutrition and what science tells us today</h1>
              
            <table class="summary">
            <caption class="header"><h2>Health Issues and it's relation to nutrition</h2></caption>
                <thead class="header">
                    <tr>
                        <th>Mediacal Issue</th>
                        <th>What science tells us today</th>
                    </tr>
                </thead>
                <tbody>
                    ${ILLNESSES.map(illness => html`<tr @mouseenter=${e => this.insert(e, illness)} ><td>${illness}</td><td>xxx</td></tr>`)}
                </tbody>
            </table>
            <br/><br/>
            <table class="summary">
                <caption class="header"><h2>Nutrition to be discussed</h2></caption>
                <thead class="header">
                    <tr><th>Food</th><th>What science tells us today</th></tr>
                </thead>
                <tbody>               
                    ${FOODS.map(food => html`<tr><td>${food}</td><td><a href="#${food}">Show Video${food}</a></tr>`)}
                </tbody>
            </table>          
           </section>
    `;
    }
    
    insert(event, item) {
        let detailRow = this.shadowRoot.getElementById("detailRow");
        if(detailRow){
            detailRow.remove()}
        let tr = event.target;
        const tbody = tr.parentElement;
        detailRow = tbody.insertRow(tr.rowIndex);
        detailRow.id = "detailRow";
        detailRow.classList.add("temporary")
        topten.map(rec => {
            if (rec.problem == item) {
                let cell = detailRow.insertCell(0);
                cell.setAttribute("colspan", "2");
                const div = cell.appendChild(document.createElement("div"));
                if (rec.advices[0].video) {
                    const span = div.appendChild(document.createElement("span"));
                    span.id = rec.problem;
                    const video = span.appendChild(document.createElement("my-video"));
                    video.id="video";
                    video.videoData = rec.advices[0].video;
                    video.title = rec.problem;                   
                }
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
                cell.innerText = "reason based on science"
                // const button=cell.appendChild(document.createElement("button"));
                //  button.innerText="show video"
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
                //rec.advices[0].advice0;  
                //  alert(row)
            }
        })
    }

    addImg() {
        const div = document.createElement("div");
        div.classList.add("img-container")
        const imgEl = new Image();
        imgEl.src = paulmason;
        imgEl.classList.add("img-item")
        div.appendChild(imgEl);
        return div;
    }

    addImg(img, title) {
        const div = document.createElement("div");
        div.classList.add("img-container")
        const titleEl = document.createElement("div");
        titleEl.classList.add("img-title")
        titleEl.innerText = title;
        const imgEl = new Image();
        imgEl.src = img;
        imgEl.classList.add("img-item")
        div.appendChild(imgEl);
        div.appendChild(titleEl);
        return div;
    }

}
customElements.define("my-topten", TopTen);
