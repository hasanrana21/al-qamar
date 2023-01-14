import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import VueHtmlToPaper from "vue-html-to-paper";

require("@mdi/font/css/materialdesignicons.css");

const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
};

const app = createApp(App);
// app.use(VueHtmlToPaper);
app.mount("#app");
