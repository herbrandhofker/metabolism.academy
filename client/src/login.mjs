import { LitElement, html, css } from 'lit-element';
import { getTheOthers } from './the-others.mjs';
import { createMenuWithLogoutButton } from './menu.mjs'
import { } from './auth0-spa-login.mjs';
import {createSocket} from './socket.mjs'

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-R99KBJJW6X');
//for metabolism
//const URL = "wss://ws.metabolism.academy";
//const DOMAIN=  "dev-7yubhb2t.eu.auth0.com";
//const CLIENT_ID= "4hLCadSsHhoaBSbaFjBp1cWx0W6zoIIj";
// for mitochondria
const DOMAIN = "dev-7yubhb2t.eu.auth0.com" //search_engine:'v3'
const CLIENT_ID = "4hLCadSsHhoaBSbaFjBp1cWx0W6zoIIj"

import { getButtonCss } from './utilCss.mjs';

const contentDiv = document.getElementById("content");
const login = contentDiv.appendChild(document.createElement("my-login"))


class Login extends LitElement {


    static get styles() {
        return [
            getButtonCss(),
            css`
        *{
            font-size: var(--font-size);
            font-family: var(--font-family)   
        }
        section{
            display: flex;
            flex-direction: column; 
            background-color: var(--tertiair);                    
            color:  var(--quartair)        
        }

        .warning{
            color: red;
            text-align: center; 
            font-size: 4rem;
    
        }
        .heading {
            display: flex;
            flex-direction: column;
            text-align: center; 
        }
        .summary{
            margin: auto;
            width: 50%;
            border: 3px solid green;
            padding: var(--padding)
        }        
   `]
    }
    render() {
        return html`
        <section>
            <div class="warning">
                <h1 class="warning" >Site is under construction, and will be offline often. facts presented has to be checked, and redesign has to be done</h1>
            </div>
           <div class="heading">
                <h1>Metabolism in the light of science</h1>
                <h2>As taught by Dr Paul Mason</h2>
                <h3>Presented by Drs. Herbrand Hofker</h3>
            </div>
            <div class="summary">
                <h2>This site will offer:</h2>
                <div>
                    <ul>
                        <li>General information on the latest science on nutrition and health.</li>
                        <li>Specific information on certain health problems and the latest science results.</li>
                        <li>The possibility to consult an accredited medical health professional.</li>
                        <li>To join a group in a video chat, with chatboxes per medical problem and/or by country/language</li>
                        <li>Registering your progress, with comparison with statistical information with others or with scientific results.</li>
                    </ul>
                </div>
            </div>
            <div class='button-box'>${this.createLoginButton()}
            </div>
        </section>`;
    }

    createLoginButton() {
    //    const loginButton = document.createElement("auth0-anchor");
        const loginButton = document.createElement("a");
        loginButton.innerText="To the Menu";
        loginButton.classList.add("button");
        loginButton.domain = DOMAIN;

        loginButton.client_id = CLIENT_ID;
        loginButton.textLogin = "LOGIN AS VISITOR";
        loginButton.textLogout = "LOGOUT";

      //  loginButton.addEventListener("user-logged-in", (e) => {
            loginButton.addEventListener("click", (e) => {
                afterAuth0Login(e.detail, "visitor", loginButton);
        });

        return loginButton;

        function afterAuth0Login(detail, role, loginButon) {
            const menu = createMenuWithLogoutButton(loginButon);
            login.style.display = "none"
            menu.style.display = "block"
            loginButton.innerText="Login (NYI)";
            loginButton.disabled=true;
         //   createSocket(detail,role);        
            
        }
    }
}

customElements.define("my-login", Login);


/*
export function createShowRegisteredusersButton(parent) {

    const button = parent.appendChild(document.createElement("button"));
    button.innerText = "show all registrations";
    button.addEventListener("click", e => {

        const dialog = button.appendChild(document.createElement("dialog"));
        const form = dialog.appendChild(document.createElement("form"));
        const tbl = form.appendChild(document.createElement("table"));
        const caption = tbl.appendChild(document.createElement("caption"));
        caption.innerHTML = "<h2>Registered Users</h2>";
        const tblHead = tbl.appendChild(document.createElement("thead"));
        const row = tblHead.insertRow();
        let th = row.appendChild(document.createElement("th"));
        th.innerText = "Name";
        th = row.appendChild(document.createElement("th"));
        th.innerText = "Email";

        const tblBody = tbl.appendChild(document.createElement("tbody"));
        tblBody.id = "registrationsTable";
        for (let reg of registrations.values()) {
            const row = tblBody.insertRow();
            let cell = row.insertCell();
            cell.innerText = reg.name;
            cell = row.insertCell();
            cell.innerText = reg.email;
            if (reg.picture) {
                cell = row.insertCell();
                const img = cell.appendChild(document.createElement("img"));
                img.src = reg.picture;
            }
        };

        const menu = form.appendChild(document.createElement("menu"));
        const cancelBtn = menu.appendChild(document.createElement("button"));
        cancelBtn.innerText = "OK";
        cancelBtn.value = "cancel";
        dialogPolyfill.registerDialog(dialog);

        dialog.showModal();
    });
}*/