import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from "axios"
import { url } from './global'

axios.defaults.baseURL = url
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
