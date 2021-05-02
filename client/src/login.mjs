import { LitElement, html, css } from 'lit-element';
import {menu} from './menu.mjs'

/*
const socket = new WebSocket("wss://localhost:3000");

socket.onopen = () => {
    console.log("connection")
};

socket.onmessage = (event) => {
    console.log('Message from server ', event.data);
    const rec = JSON.parse(event.data);
    console.log('Message type from server ', rec.type);
};*/

class Login extends LitElement {

    static get styles() {
        return css`
        *{
            font-size: var(--font-size);
            font-family: var(--font-family)   
        }
        section{
            display: flex;
            flex-direction: column; 
            background-color: var(--tertiar);                    
            color:  var(--quartair)        
        }

        .warning{
            color: var(--color-warning);
            text-align: center; 
    
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
        .button-box {
            display: flex;
            justify-content: center;
        }        
        .button-box button {
            padding: 50px;
            margin: var(--margin-big);
            background-color: var(--primary);
            border-color: var(--secundary);
            color: var(--secundary);
            border-width: 3px;
         }        
        .button-box button:hover {
            border-width: 0px;
        }

      
   `}
    render() {
        return html`
        <section>
            <div class="warning">
                <h1>Site is under construction, facts presented has to be checked, and redesign has to be done</h1>
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
            <div class='button-box'>
                <button @click=${e => this.login()}>Login as health professional</button>
                <button @click=${e => this.login()}>Login as visitor</button>
            </div>
        </section>`;
    }

    login() {
     //   const rec = { "type": "login", "payload": { "email": "pietje.puk@gmail.com" } }
      //  socket.send(JSON.stringify(rec));
        menu.style.display="block";
        login.style.display="none";
        menu.activate('topten')
    }
}

customElements.define("my-login", Login);

const body = document.getElementsByTagName("body")[0];
const login=body.appendChild(document.createElement("my-login"))