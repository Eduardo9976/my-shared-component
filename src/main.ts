import {createApp} from 'vue'
import App from './App.vue'
import './assets/main.css'
import '@mercadoeletronico/me-icon/dist/css/me-icon.min.css'
import './components/SharedButton/shared-button.ts'
import './components/CardXPTO/card-xpto.ts'
import './components/TheHeader/the-header.ts'

const app = createApp(App)
app.mount('#app')
