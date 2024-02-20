import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vue-final-modal/style.css'
import { createVfm } from 'vue-final-modal'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App)
const vfm = createVfm()
app.use(createVfm())
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.mount('#app')
