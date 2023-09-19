// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap';

window.bootstrap = bootstrap;

import axios from 'axios';
import VueAxios from 'vue-axios';

import './assets/all.scss';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios) // 套件

app.component('VueLoading', Loading) //全域元件
app.mount('#app')
