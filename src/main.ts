import { createApp } from "vue";
import App from "./App.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { VueSlidePlugin } from "./lib/vue-slider";
import { router } from "./router";
import "./style.css";

library.add(Icons.faPen, Icons.faTrash, Icons.faPlay);
createApp(App)
  .component("Icon", FontAwesomeIcon)
  .use(VueSlidePlugin)
  .use(router)
  .mount("#app");
