import { LitElement, html, css } from 'lit-element';
import doVideoButton from './video.mjs';

import stylesCss from './details.mjs'
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
    "Carbs",
    "Fat",
    "Fat Saturated",
    "Omega 3/Omega 6",
    "Proteins",
    "Salt"
];



class TopTen extends LitElement {

    static get styles() {
        return [stylesCss, css` 
        .container {
            display: flex; 
            flex-direction: column;
            align-items: center;
        }  

        h3{
            width: 90%;
        } 

        table {
            width: 90%;         
            border-collapse: collapse;
        }

        table, th, td {
            border: 1px solid black;
            text-align: left;
         }

        th, td {
            padding: 10px;
        }
       
        .detailtable thead th:nth-child(1) {
            width: 8%;
        }
          
        .detailtable thead th:nth-child(2) {
            width: 23%;
        }
          
        .detailtable thead th:nth-child(3) {
            width: 23%;
        }
          
        .detailtable thead th:nth-child(4) {
            width: 23%;
        }
        
        .detailtable thead th:nth-child(5) {
            width: 23%;
        }

        .detailtable .even{
            background-color: grey;
        }
       .datailtable .uneven{
            background-color: lightgrey;
            color: black;
        }

        .header{
            background-color: white;
            color: black;
        }  
  
        .summary{
            width: 60%;
            background-color: red;           
        }

        .summary thead th:nth-child(1) {
            width: 20%;
        }

        .summary thead th:nth-child(2) {
            width: 40%;
        }
        .summary th {background: var(--primary);}
       .summary  tr:nth-child(even) {background: #CCC}
        .summary tr:nth-child(odd) {background: #FFF}
         
   `]
    }


    render() {
        let teller = 0;
        return html`
        <div class="container">
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
                    ${ILLNESSES.map(illness => html`<tr><td>${illness}</td><td><button>Show more</button></td></tr>`)}
                </tbody>
            </table>
            <table class="summary">
                <caption class="header"><h2>Nutrition to be discussed</h2></caption>
                <thead class="header">
                    <tr><th>Food</th><th>What science tells us today</th></tr>
                </thead>
                <tbody>               
                    ${FOODS.map(food => html`<tr><td>${food}</td><td><button>Show More</button></tr>`)}
                </tbody>
            </table>
            
            <table class="detailtable">
                <caption class="header"><h2>A summary of medical problems related to nutrition<br>the current usual advice<br>and the advice according to science</h2></caption>
                <thead class="header">
                    <tr><th>Medical\nproblem</th><th>Current advice</th><th>Current given reason</th><th>Advice based on science</th><th>Logic</th><th>Video</th></tr>
                </thead>
                <tbody>            
                    ${topten.map(item => html`${this.showProblem(item, teller++)}`)}
                </tbody>
            </table>        
        </div>
    `;
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

    showProblem(problem, rowNum) {
        const cls = (rowNum % 2) ? "even" : "uneven";
        const parentId = "tr_" + rowNum;
        return html`<tr id="${parentId}" class=${cls}><td rowspan=${problem.advices.length}>${problem.problem}</td>${this.showAdvice(parentId, problem.advices[0])}</tr>${this.more("tr_" + rowNum, problem.advices, cls)}`;
    }

    more(parentId, advices, cls) {
        let res = html``;
        for (let i = 1; i < advices.length; i++)
            res = html`${res}<tr class=${cls}>${this.showAdvice(parentId, advices[i])}</tr>`;
        return res;
    }

    //${chapter.video ? doVideoButton(teller + "_", chapter.video, chapter.h1) : null}         

    showAdvice(parentId, advice) {
        return html`<td>${advice.advice0}</td><td>${advice.reason0}</td><td>${advice.advice}</td><td>${advice.reason}</td><td>${doVideoButton(this.shadowRoot, parentId, advice.video, "my title")}</td>`;
    }

}
customElements.define("my-topten", TopTen);
