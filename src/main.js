import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap';
import './assets/main.css'

import axios from 'axios';
import VueAxios from 'vue-axios';

import router from './router'

import { createPinia } from 'pinia';


axios.defaults.baseURL = 'http://localhost:8080';

const app = createApp(App)

const pinia = createPinia();

app.use(VueAxios, axios)
app.use(router)

app.use(pinia);

app.mount('#app')



