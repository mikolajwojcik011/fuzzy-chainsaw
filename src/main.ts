import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css';

import App from './App.vue'
import router from './router'


const pinia = createPinia()

let app;

if (!app) {
    app = createApp(App)

    app.use(pinia)
    app.use(router);

    app.mount('#app')
}