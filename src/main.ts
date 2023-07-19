import { createSSRApp } from "vue";
import uviewPlus from "uview-plus";
import App from "./App.vue";
// import { createPinia } from 'pinia';
import store from "./store";
export function createApp() {
  const app = createSSRApp(App);
  app.use(store);
  app.use(uviewPlus);
  return {
    app,
  };
}
