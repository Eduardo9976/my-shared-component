import {defineCustomElement} from 'vue'
import TheHeader from './TheHeader.ce.vue'
import tailwindStyles from '../../assets/main.css?inline'
import meIconStyles from '@mercadoeletronico/me-icon/dist/css/me-icon.min.css?inline'

// Importar o reset CSS apenas quando necessário
// Para desenvolvimento local, não importar o reset
// Para produção ou uso externo, importar o reset
const isDevelopment = process.env.NODE_ENV === 'development'
const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || 
   window.location.hostname === '127.0.0.1' ||
   window.location.hostname.includes('localhost'))

let styles = [tailwindStyles, meIconStyles]

// Aplicar reset CSS apenas quando não estiver em desenvolvimento local
if (!isDevelopment || !isLocalhost) {
  try {
    const resetStyles = require('../../assets/web-component-reset.css?inline')
    styles.unshift(resetStyles)
  } catch (error) {
    console.warn('Reset CSS não encontrado, usando estilos padrão')
  }
}

const TheHeaderElement = defineCustomElement(TheHeader, {
  shadowRoot: true,
  styles: styles
})

if (!customElements.get('the-header')) {
  customElements.define('the-header', TheHeaderElement)
}

export default TheHeaderElement
