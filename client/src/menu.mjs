import './home.mjs'
import './styles.css'
import './topten.mjs'
import './details.mjs'
import './about.mjs'
import './nyi.mjs'
import { LitElement, html, css } from 'lit-element';

const body = document.getElementsByTagName("body")[0];
const menuDiv = body.appendChild(document.createElement("div"))
  
const tabs = [];

const objects = ["home", "topten", "details", "about"];
objects.forEach(name => {
    const el = body.appendChild(document.createElement("my-" + name))
    el.id = name;
    el.classList.add("tab-content");
    tabs.push(el);
})



class Menu extends LitElement {
    static get styles() {
        return css`
           
        .button-box{
            display: flex;
            flex-direction: row;
            justify-content: center;
            background-color: var(--tertiar);                  
        }
     
        .button-box button {
            padding: var(--padding);
            margin: var(--margin-big);
            background-color: var(--primary);
            border-color: var(--secundary);
            color: var(--secundary);
            border-width: 3px;
         }  

        .button-box button:hover {
            border-width: 0px;
        }        
    `;
    }

    render() {
        return html`
        <section>
            
            <div class="button-box">
                ${tabs.map(lbl => html`<button @click=${e => this.activate(lbl.id)}>${lbl.id.toUpperCase()}</button>`)}
            </div>
        </section>
        `;
    }

    firstUpdated() {
        for (let tab of tabs)
            tab.style.display = "none";
    }

    activate(id) {
        for (let tab of tabs) {
            tab.style.display = "none";
        }
        for (let tab of tabs) {
            if (tab.id == id) { tab.style.display = "block"; return; }
        }
        for (let tab of tabs) {
            if (tab.id == "nyi") { tab.style.display = "block"; tab.text = id; return; }
        }
    }
}

customElements.define("my-menu", Menu);

export const menu=menuDiv.appendChild(document.createElement("my-menu"));
menu.style.display="none";





