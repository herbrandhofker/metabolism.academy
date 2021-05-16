import './index.css'

import './the-others.mjs';
import './login.mjs'


const dialogCloseBtn =document.getElementById("dialogCloseBtn");
const dialogDiv =document.getElementById("dialogDiv");

dialogCloseBtn.addEventListener("click",()=>dialogDiv.style.display="none")


const dialogHeader =document.getElementById("dialogHeader");
dialogHeader.innerText="abc";
const dialogContent =document.getElementById("dialogContent");
dialogContent.innerText="Lorem"
const dialogFooter =document.getElementById("dialogFooter");
dialogFooter.innerHTML="<h3>xyz</h3>";