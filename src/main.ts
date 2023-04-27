import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createVfm } from "vue-final-modal";
import "vue-final-modal/style.css";
import VueFeather from "vue-feather";

const vfm = createVfm();

const app = createApp(App);
app.use(store);
app.use(router);
app.use(vfm);
app.component(VueFeather.name, VueFeather);
app.mount("#app");
