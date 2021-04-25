import { LitElement, html, css } from 'lit-element';
import bloodPressure from './images/blood-pressure.jpg';

import topten from './data/topten.json';


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
       
        thead th:nth-child(1) {
            width: 8%;
        }
          
        thead th:nth-child(2) {
            width: 23%;
        }
          
        thead th:nth-child(3) {
            width: 23%;
        }
          
        thead th:nth-child(4) {
            width: 23%;
        }
        
        thead th:nth-child(5) {
            width: 23%;
        }

        .even{
            background-color: grey;
        }
        .uneven{
            background-color: lightgrey;
            color: black;
        }

        .header{
            background-color: white;
            color: black;
        }   

             
         
   `}
    render() {
        let teller=0;
        return html`
        <div class="container">
            <h1>Top Ten Medical Problems related to Nutrition</h1>
            <h3>
                One might reasonably assume that modern medicine practice would be soundly based on years of accumulated
                evidence. Unfortunately, this is not always the case. In many cases, medical practices do not reflect, and
                sometimes directly contrast with what is shown by hard science. This is particulary so in metabolic
                medicine,
                spinal pain and nutrition for athletic performance. The end result is that patients often do not recieve the
                best quality care. I always strive to ensure that my practice is solidly evidence based, especially where it
                diverges from current practices
            </h2>
       
            <table>
                <caption class="header"><h2>A summary of medical problems related to nutrition<br>the current usual advice<br>and the advice according to science</h2></caption>
                <thead class="header">
                    <tr><th>Medical\nproblem</th><th>Current advice</th><th>Current given reason</th><th>Advice based on science</th><th>Logic</th></tr>
                </thead>
                <tbody>            
                    ${topten.map(item => html`${this.showProblem(item,teller++)}`)}
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
        const cls=(rowNum%2) ?"even": "uneven";
        
        return html`<tr  class=${cls}><td rowspan=${problem.advices.length}>${problem.problem}</td>${this.showAdvice(problem.advices[0])}</tr>${this.more(problem.advices,cls)}`;
    }

    more(advices,cls) {
        let res = html``;
        for (let i = 1; i < advices.length; i++)
            res = html`${res}<tr class=${cls}>${this.showAdvice(advices[i])}</tr>`;
        return res;
    }

    showAdvice(advice) {
        return html`<td>${advice.advice0}</td><td>${advice.reason0}</td><td>${advice.advice}</td><td>${advice.reason}</td>`;
    }


}
customElements.define("my-topten", TopTen);
