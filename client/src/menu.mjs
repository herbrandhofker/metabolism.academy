import './home.mjs'
import './index.css'
import './topten.mjs'
import './details.mjs'
import './about.mjs'
import './nyi.mjs'
import { LitElement, html, css } from 'lit-element';
import dialogPolyfill from 'dialog-polyfill';
import { getTheOthers } from './the-others.mjs';
import { getButtonCss } from './utilCss.mjs';

const menuDiv = document.getElementById("menuDiv");
const contentDiv = document.getElementById("content");

const menuItems = ["home", "topten", "details", "about", "group-chat"];
const menuObjects = new Map();

let menu = null;
export function createMenuWithLogoutButton(loginButton) {
    if (menu == null) {
        menu = menuDiv.appendChild(document.createElement("my-menu"));
        menu.loginButton = loginButton;
    }
    return menu;
}

class Menu extends LitElement {
    static get styles() {
        return [getButtonCss(), css`  
        dialog{
            background-color: var(--tertiar-background-color);
            color: black; 
            border-width : 10px;
            border-color: var(--primary-color);
            display: flex;
        }
        table {          
            width: 100%;
            border-collapse: collapse;
          }
        table, th, td {
            border: 1px grey;
        }

        td {
            text-align: left;
        }
        
        tr:nth-child(odd) {
            background-color:       var(--primary-color);
        }
    `];
    }

    constructor() {
        super();
        this.loginButton = null;
    }

    static get properties() {
        return {
            loginButton: { type: Object }
        };
    }

    render() {
        return html`
        <section style="display:flex" >            
            <div  id="buttonBox"  class="button-box">
                ${menuItems.map(lbl => html`<button class="button" @click=${e => this.activate(lbl)}>${lbl.toUpperCase()}</button>`)}        
                ${this.createShowProfileButton()}
            </div>
        </section>
        `;
    }

  
    updated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            if (propName = "loginButton")
                this.shadowRoot.getElementById("buttonBox").appendChild(this.loginButton);

        });
    }

    activate(id) {
        for (let tab of menuItems) {
            const el = (menuObjects.get(tab));
            if (el) el.style.display = "none";
        }
        for (let tab of menuItems) {
            let el = (menuObjects.get(tab));
            if (el == null && tab == id) {
                console.log("creation of "+"my-"+tab)
                el = contentDiv.appendChild(document.createElement("my-" + tab));
              
                menuObjects.set(tab, el);
            } else
                if (tab == id) {
                    el.style.display = "block";
                }
        }
    }

    createShowProfileButton() {
        const button = document.createElement("button");
        button.classList.add("button")
        button.innerText = "MY REGISTRATION";
        button.addEventListener("click", e => {
            const dialog = button.appendChild(document.createElement("dialog"));
            const form = dialog.appendChild(showYourProfile());
            const menu = form.appendChild(document.createElement("menu"));
            const btn = menu.appendChild(document.createElement("button"));
            btn.classList.add("button")

            btn.innerText = "OK";
            btn.value = "cancel";
            dialogPolyfill.registerDialog(dialog);

            dialog.showModal();

        });
        return button;

        function showYourProfile() {
            const profile = getTheOthers().me.profile;
            if (profile == null)
                return;
            const form = document.createElement("form");
            const title = form.appendChild(document.createElement("h1"));
            title.innerText = "Registered as:";

            const divtbl = form.appendChild(document.createElement("table"));
            Object.keys(profile).forEach(function (key) {
                const row = divtbl.insertRow();
                let cell = row.insertCell();
                cell.innerText = key;
                cell = row.insertCell();
                if (key == 'picture') {
                    const img = cell.appendChild(document.createElement("img"));
                    img.src = profile[key]
                } else
                    cell.innerText = profile[key]
            });
            return form;
        }
    }
}

customElements.define("my-menu", Menu);
