import { LitElement, html, css } from 'lit-element';
import './home.mjs'
import './top-ten-medical-issues.mjs'
import './top-ten-food-issues.mjs'
import './details.mjs'
import './about.mjs'

const mainDiv = document.getElementById("main");
const tabs = ["home", "top-ten-medical-issues", "top-ten-food-issues", "details", "about"];

class Header extends LitElement {
    static get styles() {
        return [css`
           
        .title{ 
            font-size: 1.5rem;
            margin: 0;
            padding-top: 1rem;          
            text-align: center;  
       } 

       .title span{
            color: var(--primary-color);
       } 

       .subtitle{ 
            font-size: 2rem;
            margin: 0;
            padding-bottom: 0.1rem;          
            text-align: center;  
        }

        .planning{
            display: flex;
            justify-content: center;
            color: red;
            padding: 0px;     
        }
     
      

        .planning>div>ol>li {
            text-align: left; 
            list-style-position: inside;     
        }

        .warning{
            color: red;
        }
             
       .menu-item{            
            color: #ffffff;
            font-size: 1.5rem;
            font-weight: bold;
            background-color: #282A35;
            text-transform: uppercase;
            font-family: var(--font-family);
            white-space: nowrap; 
            cursor:pointer;     
        }

        .menu-item:hover {
            background-color: var(--primary-color);
       }

        .menu-item.active {
            background-color: var(--primary-color);
        }    
        
        .nav{
            background-color:black;
        }

        .navbar{
            display: flex;
            justify-content : space-between;
            align-items : center;
            background-color:black;
        }

        .navbar-links ul {
            margin : 0;
            padding: 0;
            display: flex;
            flex-wrap: nowrap;
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
             
        #login, #group-chat  {
            pointer-events: none;
            cursor: default;
            color: grey;
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

        @media (max-width: 1000px){
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
        this.toggleButton = null;
        this.menuObjects = new Map();
    }

    render() {
      //  const url="https://herbrandhofker.github.io/metabolism.academy/groupchat";
       // const url="https://meet.metabolism.academy/groupchat"
        const url="https://herbrandhofker.github.io/jitsi/"       
        return html`
            <h1 class="title">Metabolism<span>Academy</span></h1>
            <h3 class="subtitle">Nutrition advice based on science</h3>
            <h3 class="subtitle">As presented by Dr Paul Mason and others</h3>
            <h3 class="subtitle warning">Under construction</h3>
            <div class="planning">
            <div><table><tr><th  align=left>How it is made (also presented in courses)</th></tr>
            <tr><td>Using the most advanced software standards anno 2021</td</tr>
            <tr><td>Scalable horizontal and vertical : practically unlimited</td</tr>
            <tr><td>Structure can be re-used for any business branch</td</tr>
            <tr><td>Minimum lines of code, maximum maintainability</td</tr>
            </table></div>
            <div><table><tr><th align=left colspan=2>Planning</th></tr><tr><td>November 2021</td><td>Consultancy possibility</td></tr><tr><td>December 2021</td><td>Payed consultancy</td></tr></table></div>
            </div>
            <nav class="navbar">
                <a href="#" id="toggleButton" class="toggle-button">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
               </a>
                <div id="navbarLinks" class="navbar-links">
                    <ul>
                        ${tabs.map(lbl => html`<li><a href="#" id=${lbl} class="menu-item" @click=${e => this.activate(lbl)}>${lbl.replaceAll("-", " ")}</a></li>`)}        
                     <li><a href=${url} class="menu-item">groupchat</a></li>
                        </ul>

                </div>
            </nav>
        `;
    }

    firstUpdated() {
        this.navbarLinks = this.shadowRoot.getElementById("navbarLinks");
        this.toggleButton = this.shadowRoot.getElementById("toggleButton");
        this.toggleButton.addEventListener("click", () => {
            this.navbarLinks.classList.toggle('active');
        })

        this.activate("home")
    }

    activate(id) {
        const clickedMenuItem = this.shadowRoot.getElementById(id);
        const menuItems = this.shadowRoot.querySelectorAll(".menu-item");

        for (var i = 0; i < menuItems.length; i++) {
            menuItems[i].classList.remove('active');
        }
        clickedMenuItem.classList.add('active');

        for (let tab of tabs) {
            const el = this.menuObjects.get(tab);
            if (el) el.style.display = "none";
        }
        for (let tab of tabs) {
            let el = this.menuObjects.get(tab);
            if (el == null && tab == id) {
                el = mainDiv.appendChild(document.createElement("my-" + tab));
                this.menuObjects.set(tab, el);
            } else
                if (tab == id) {
                    el.style.display = "block";
                }
        }
    }
}

customElements.define("my-header", Header);
