import './css/normalize.css'
import './css/styles.css'
import './youtube-dialog.mjs'
import './header.mjs'
import './footer.mjs'

const header = document.getElementById("header");
header.appendChild(document.createElement("my-header"))
const footer = document.getElementById("footer");
footer.appendChild(document.createElement("my-footer"))