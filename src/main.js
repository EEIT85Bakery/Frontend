import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'


import axios from 'axios';
import VueAxios from 'vue-axios';

import router from './router'


axios.defaults.baseURL = 'http://localhost:8080/bonnySugar';

const app = createApp(App)

app.use(VueAxios, axios)
app.use(router)

app.mount('#app')



