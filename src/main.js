import { createApp } from 'vue'
import './style.css'
import App from './app.vue'
import i18n from "./i18n.js";
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';
import 'primeicons/primeicons.css';
import {Button, SelectButton} from "primevue";

createApp(App)
    .use(i18n)
    .use(PrimeVue, {
        ripple: true,
        theme: { preset: Material}
    })
    .component('pv-button', Button)
    .component('pv-select-button', SelectButton)
    .mount('#app')
