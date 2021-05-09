import './home.mjs'
import './styles.css'
import './topten.mjs'
import './details.mjs'
import './about.mjs'
import './nyi.mjs'
import { LitElement, html, css } from 'lit-element';
import dialogPolyfill from 'dialog-polyfill'
import { createShowRegisteredusersButton } from './login.mjs'

const body = document.getElementsByTagName("body")[0];
const menuDiv = body.appendChild(document.createElement("div"))

//const buttonBox = body.appendChild(document.createElement("div"))
//createShowRegisteredusersButton(buttonBox);


const tabs = [];

const objects = ["home", "topten", "details", "about"];
objects.forEach(name => {
    const el = body.appendChild(document.createElement("my-" + name))
    el.id = name;
    el.classList.add("tab-content");
    tabs.push(el);
})

export let loginButtonPlaceHolder = null;


class Menu extends LitElement {
    static get styles() {
        return css`
           
        .button-box,.profile-box{
            display: flex;
            flex-direction: row;
            justify-content: center;
            background-color: var(--tertiar);  
            height: var(--button-box-height);                
        }

        .button {
            padding: var(--button-padding);
            margin: var(--button-margin);
            background-color: var(--button-background-color);
            border-color: var(--button-border-color);
            color: var(--button-color);
            border-width: var(--button-border-width);
            font-family: var(--button-font-family);
            font-size: var(--button-font-size);
            font-weight: var(--button-font-weight);
        }  

        .button:hover {
            border-width: var(--button-border-width-hover);
        }  
        
        table {
            width: 100%;
            border-collapse: collapse;
          }
        table, th, td {
            border: 1px solid black;
          }

          td {
            text-align: left;
          }
    `;
    }

    constructor() {
        super();
        this.profileBox = null;
        this.profile = null;
    }

    render() {
        return html`
        <section style="display: flex" >            
            <div  id="buttonBox"  class="button-box">
                ${tabs.map(lbl => html`<button class="button" @click=${e => this.activate(lbl.id)}>${lbl.id.toUpperCase()}</button>`)}
             
                </div>
             <div id="profileBox" class="profile-box">
             ${this.createShowProfileButton()}
              </div>
        </section>
        `;
    }

    firstUpdated() {
        this.profileBox = this.shadowRoot.getElementById("profileBox");

        loginButtonPlaceHolder = this.shadowRoot.getElementById("buttonBox");
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

    setProfile(profile) {
        this.profile = profile;
    }

    createShowProfileButton() {
        const button = document.createElement("button");
        button.classList.add("button")
        button.innerText = "MY PROFILE";
        button.addEventListener("click", e => {
            if (this.profile) {
                const dialog = button.appendChild(document.createElement("dialog"));
                const form = dialog.appendChild(showYourProfile(this.profile));
                const menu = form.appendChild(document.createElement("menu"));
                const cancelBtn = menu.appendChild(document.createElement("button"));
                cancelBtn.classList.add("button")

                cancelBtn.innerText = "OK";
                cancelBtn.value = "cancel";
                dialogPolyfill.registerDialog(dialog);
    
                dialog.showModal();
            }
        });
        return button;

        function showYourProfile(profile) {
            if (profile == null)
                return;
            const form = document.createElement("form");
            const title = form.appendChild(document.createElement("h1"));
            title.innerText = "Profile:";

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

export const menu = menuDiv.appendChild(document.createElement("my-menu"));
menu.style.display = "none";





