import {defineCustomElement} from 'vue'
import TheHeader from './TheHeader.ce.vue'
import tailwindStyles from '../../assets/main.css?inline'
import meIconStyles from '@mercadoeletronico/me-icon/dist/css/me-icon.min.css?inline'

const isProduction = process.env.NODE_ENV === 'production'
const isExternalUsage = typeof window !== 'undefined' && window.location.hostname !== 'localhost'

let styles = [tailwindStyles, meIconStyles]

if (isProduction || isExternalUsage) {
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
