import './index.css'

import './the-others.mjs';
import './login.mjs'
//import './menu.mjs'
//import './group-chat.mjs'

const createChat=function () {
  const item = root.appendChild(document.createElement("group-chat"))
  item.id = "Chat";
  item.classList.add("menuItem");
  item.style.display = "none"
  return item;
}
