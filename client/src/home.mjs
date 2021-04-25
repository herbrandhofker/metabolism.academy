import { LitElement, html, css } from 'lit-element';
import bloodPressure from './images/blood-pressure.jpg';

import topten from './data/topten.json';


class Home extends LitElement {

    static get styles() {
        return css`

        :root {
            --blue: #1e90ff;
            --white: #ffffff;
            --grey: lightgrey;
            --default-margin: 30px;
            --menutext-size: 0.8em;
        }
        
        h1 {
            text-align: center;
        }
        
        p {
            margin: var(--default-margin);
        }
        
        button {
            margin: var(--default-margin);
        }
        
        .dropbtn {
            color: black;
            margin: var(--default-margin);
        }
        
        .navbar {
            display: flex;
            flex-direction: row;
            justify-content: center;
            background-color: var(--white);
        }
        
        .navbar .menu-item {
            float: left;
            color: black;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            font-size: var(--menutext-size);
        }
        
        .dropdown {
            float: left;
            overflow: hidden;
        }
        
        .dropdown .dropbtn {
            border: none;
            outline: none;
            font-size: var(--menutext-size);
            padding: 14px 16px;
            margin: 0;
        }
        
        .navbar .menu-item:hover, .dropdown:hover .dropbtn {
            background-color: var(--grey);
        }
        
        .dropdown-content {
            opacity: 0;
            transform-origin: top center;
            position: absolute;
            background-color: var(--white);
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        }
        
        .dropdown-content .menu-item {
            float: none;
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            text-align: left;
        }
        
        .dropdown:hover .dropdown-content {
            animation: animate 450ms ease-in-out forwards;
            animation-delay: 200ms;
        }
        
        @keyframes animate {
            0% {
                opacity: 0;
                transform: rotateX(-90deg)
            }
            50% {
                opacity: 0.5;
                transform: rotateX(20deg)
            }
            100% {
                opacity: 1;
                transform: rotateX(0deg)
            }
        }
        
        .buttonbox {
            display: flex;
            justify-content: center;
        }
        
        .buttonbox button {
            padding: 10px;
            color: var(--white);
            background-color: var(--blue);
            border-color: var(--white);
            font-size: 1.2em;
        }
        
        .buttonbox button:hover {
            background-color: var(--white);
            color: black;
            border-width: 0px;
        }
        
        .specialisations{
            background-color: var(--white);
        }
        
        .specialisations-title{
            color: purple;
        }
        
        
        .images {
            display: flex;
             justify-content: space-around;
        }
        
        .img-container {
            display: flex;
            flex-direction: column; 
            max-width: 100%;
            margin: 10px;
        }
        
        .img-title {
            align-self: center;
            margin: 10px;
            color: orange;
        }
        
        .img-item {
            max-width: 100%;
            flex-grow: 1;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        table, th, td {
            border: 1px solid black;
             text-align: left;
         }

        th, td {
            text-align: left;
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
        <section>
        <h1>WHERE SCIENCE MEETS MEDICINE</h1>
        <p>Paul Mason: One might reasonably assume that modern medicine practice would be soundly based on years of accumulated
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
