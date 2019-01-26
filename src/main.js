import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VTooltip from "v-tooltip";
import firebase from "firebase";
import store from "@/store/store";
import "@/assets/scss/main.scss";

firebase.initializeApp({
  apiKey: "AIzaSyAh9wPKAP5n6zIOX34ICB4eNO1vKh2SKNY",
  authDomain: "persisted-data-table.firebaseapp.com",
  databaseURL: "https://persisted-data-table.firebaseio.com",
  projectId: "persisted-data-table",
  storageBucket: "persisted-data-table.appspot.com",
  messagingSenderId: "334923486006"
});

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
library.add(faSpinner);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VTooltip);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
