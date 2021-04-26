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
                    ${ILLNESSES.map(illness => html`<tr @mouseenter=${e => this.insert(e,illness)} @mouseleave=${e => this.delete(e)}><td>${illness}</td><td><button>Show Video</button></td></tr>`)}
                </tbody>
            </table>
            <table class="summary">
                <caption class="header"><h2>Nutrition to be discussed</h2></caption>
                <thead class="header">
                    <tr><th>Food</th><th>What science tells us today</th></tr>
                </thead>
                <tbody>               
                    ${FOODS.map(food => html`<tr><td>${food}</td><td><button>Show Video</button></tr>`)}
                </tbody>
            </table>
            
                   
        </div>
    `;
    }

    delete(event){
        let cell=event.target;
       const tr= cell.parentElement;
       const tbody= tr.parentElement;
        const xx= this.shadowRoot.getElementById("xxxx");

        xx.remove()
     }
    insert(event, item){
       let tr=event.target;
      const tbody= tr.parentElement;
       const row= tbody.insertRow(tr.rowIndex);
       row.id="xxxx";
       row.classList.add("temporary")
        topten.map(rec => {
            if(rec.problem==item) {
                let cell0=row.insertCell(0);                
                cell0.setAttribute("colspan", "2");
                const table=cell0.appendChild(document.createElement("table"));
                table.classList.add("inner-table")
                const thead=table.appendChild(document.createElement("thead"));
                let row2=thead.insertRow(0);
                
                let cell=row2.appendChild(document.createElement("th"));
                cell.innerText="today's advice"
                cell=row2.appendChild(document.createElement("th"));
                cell.innerText="today's reason"
                cell=row2.appendChild(document.createElement("th"));
                cell.innerText="advice based on science"
                cell=row2.appendChild(document.createElement("th"));
                cell.innerText="reason based on science"
               // const button=cell.appendChild(document.createElement("button"));
              //  button.innerText="show video"
                const tbody=table.appendChild(document.createElement("tbody"));
                row2=tbody.insertRow(0);
                cell= row2.insertCell(0);
                cell.innerText=rec.advices[0].advice0;
                cell= row2.insertCell(1);
                cell.innerText=rec.advices[0].reason0;
                cell= row2.insertCell(2);
                cell.innerText=rec.advices[0].advice;
                cell= row2.insertCell(3);
                cell.innerText=rec.advices[0].reason;
               //rec.advices[0].advice0;  
             //  alert(row)
              }})
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
