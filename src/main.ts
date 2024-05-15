import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css';

import App from './App.vue'
import router from './router'
import VeeValidatePlugin from "./includes/validation";


const pinia = createPinia()

let app;

if (!app) {
    app = createApp(App)

    app.use(pinia);
    app.use(VeeValidatePlugin)
    app.use(router);

    app.mount('#app')
}