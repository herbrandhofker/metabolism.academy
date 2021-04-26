import { LitElement, html, css } from 'lit-element';


import topten from './data/topten.json';


class Home extends LitElement {

    static get styles() {
        return css`
        
        section {
            margin: auto;
            width: 50%;
            border: 3px solid green;
            padding: 10px;
        }

        h1{
            text-align: center;
        }
        
        p{
            font-size: 1.5rem;
        }
         
   `}
    render() {
        let teller=0;
        return html`
        <section>
        <h1>WHERE SCIENCE MEETS MEDICINE</h1>
        <p>Dr Paul Mason:<br><br>One might reasonably assume that modern medicine practice would be soundly based on years of accumulated
            evidence. Unfortunately, this is not always the case. In many cases, medical practices do not reflect, and
            sometimes directly contrast with what is shown by hard science. This is particulary so in metabolic
            medicine,
            spinal pain and nutrition for athletic performance. The end result is that patients often do not recieve the
            best quality care. I always strive to ensure that my practice is solidly evidence based, especially where it
            diverges from current practices
        </p>              
    </section>`;
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
customElements.define("my-home", Home);
