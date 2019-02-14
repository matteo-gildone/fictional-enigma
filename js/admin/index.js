import { viewAdmin } from "./views/viewAdmin.js";

const render = container => store => {
  if (container) {
    container.appendChild(viewAdmin(store));
  }
};

render(document.getElementById("admin"))({});
