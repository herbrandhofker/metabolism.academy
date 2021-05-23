
import { LitElement, html, css } from 'lit-element';
import './index.css'
import './home.mjs'
import './top-ten-medical-issues.mjs'
import './top-ten-food-issues.mjs'
import './details.mjs'
import './about.mjs'
import { getTheOthers } from './the-others.mjs';
import { getButtonCss } from './utilCss.mjs';
import dialogPolyfill from 'dialog-polyfill';

const menuDiv = document.getElementById("menuDiv");
const contentDiv = document.getElementById("content");

const menuItems = ["home", "top-ten-medical-issues", "top-ten-food-issues", "details", "group-chat", "about",];
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
        return [ css`   
              
        .menu-item{            
            color: #ffffff;
            font-size: 1.5rem;
            font-weight: bold;
            background-color: #282A35;
            text-transform: uppercase;
            font-family: 'Source Sans Pro', sans-serif;
            white-space: nowrap; 
            cursor:pointer;     
        }

        .menu-item:hover {
            background-color: #000;
        }

        .menu-item.active {
            background-color: var(--primary-color);
        }                

        .navbar{
            display: flex;
            justify-content : space-between;
            align-items : center;
            background-color: var(--secundary-color); 
        }

        .brand-title{
            font-size: 1.5rem;
            margin: .5rem;
            color : var(--tertiair-color)        
        }

        .navbar-links ul {
            margin : 0;
            padding: 0;
            display: flex;
            background-color: var(--secundair-color)  ;
        }
       
        .navbar-links li {
           list-style: none;
        }

        .navbar-links li a {
            text-decoration : none;
            padding: 1rem;
            display: block;
         }

         .toggle-button{
             position : absolute;
             top: 0.75rem;
             right: 1rem;
             display: none;
             background-color: black;
             flex-direction: column;
             justify-content :space-between;
             width : 30px;
             height: 21px;
         }

         .toggle-button .bar{
            width : 100%;
            height: 3px;
            background-color: white;
            border-radius: 10px;   
         }
               

         @media (max-width: 1400px){           
             #login{
                display: none;
            }                     
        }

        @media (max-width: 1250px){           
            #about{
               display: none;
           }       
       }

        @media (max-width: 1200px){
            .menu-item{          
                font-size: 0.8rem!important;         
            } 
            #group-chat{
                display: none;
            }                         
        }

         @media (max-width: 700px){
            #about, #group-chat, #login{
                display: block;
            }  
   
            .toggle-button{
                display: flex;
            } 

            .navbar-links{
               display: none;
                width : 100%;
            }

            .navbar{
                flex-direction : column;
                align-items: flex-start;
            }

            .navbar-links ul{
                width : 100%;
                flex-direction : column;
            }          

            .navbar-links li{
                text-align : center;
            }

            .navbar-links li a{
                padding : .5rem 1rem;                
            }

            .navbar-links.active{
                display: flex;
            }         
         }         
    `];
    }

    constructor() {
        super();
        this.navbarItems = null;
        this.loginButton = null;
        this.toggleButton = null;
        this.loggedIn = false;
    }

    static get properties() {
        return {
            loginButton: { type: Object },
            loggedIn: { type: Boolean }
        };
    }

    render() {
        return html`
            <nav  class="navbar">
                <div class="brand-title">The Mitochondrai Academy</div>
                <a href="#" id="toggleButton" class="toggle-button">
                  <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
               </a>
                <div id="navbarLinks" class="navbar-links">
                    <ul id="navbarItems">
                        ${menuItems.map(lbl => html`<li><a href="#" id=${lbl} class="menu-item" @click=${e => this.activate(lbl)}>${lbl.replaceAll("-", " ")}</a></li>`)}        
                        ${(this.loggedIn) ? this.createShowProfileLi() : null}
                        <li>${this.createLoginAnchor()}</li>
                    </ul>
                </div>
            </nav>
        `;
    }

    firstUpdated() {
        this.navbarItems = this.shadowRoot.getElementById("navbarItems");       
        this.navbarLinks = this.shadowRoot.getElementById("navbarLinks");       
        this.toggleButton = this.shadowRoot.getElementById("toggleButton");
        this.toggleButton.addEventListener("click", () => {
            this.navbarLinks.classList.toggle('active');
        })

        this.activate("home")
    }

    createLoginAnchor() {
        const loginButton = document.createElement("a");
        loginButton.id="login";
        //  const loginButton = document.createElement("auth0-anchor");
        //  loginButton.domain = DOMAIN;    
        //  loginButton.client_id = CLIENT_ID;
        // loginButton.textLogin = "LOGIN AS VISITOR";
        // loginButton.textLogout = "LOGOUT";

        loginButton.innerText = "Login";
        loginButton.classList.add("menu-item");

        //  loginButton.addEventListener("user-logged-in", (e) => {
        //       loginButton.addEventListener("click", (e) => {
        //           afterAuth0Login(e.detail, "visitor", loginButton);
        //  });

        return loginButton;

        function afterAuth0Login(detail, role, loginButon) {
            const menu = createMenuWithLogoutButton(loginButon);
            login.style.display = "none"
            menu.style.display = "block"
            menu.activate("home");
            console.log("hier")
            loginButton.innerText = "Login (NYI)";
            loginButton.disabled = true;
            //   createSocket(detail,role);        

        }
    }


    activate(id) {
        const clickeButton= this.shadowRoot.getElementById(id); 
        console.log(clickeButton.id)       
        for (var i = 0; i < this.navbarItems.children.length; i++) {
            this.navbarItems.children[i].children[0].classList.remove('active');     
        }
        clickeButton.classList.add('active');     

        for (let tab of menuItems) {
            const el = (menuObjects.get(tab));
            if (el) el.style.display = "none";
        }
        for (let tab of menuItems) {
            let el = (menuObjects.get(tab));
            if (el == null && tab == id) {
                el = contentDiv.appendChild(document.createElement("my-" + tab));

                menuObjects.set(tab, el);
            } else
                if (tab == id) {
                    el.style.display = "block";
                }
        }
    }

    createShowProfileLi() {
        const li = document.createElement("li");
        const menuItem = li.appendChild(document.createElement("a"));
        menuItem.classList.add("button")
        menuItem.innerText = "MY REGISTRATION (NYI)";
        /*
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

        });*/
        return menuItem;

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
