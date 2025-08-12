import {defineCustomElement} from 'vue'
import SharedButton from './SharedButton.ce.vue'
import tailwindStyles from '../../assets/main.css?inline'
import meIconStyles from '@mercadoeletronico/me-icon/dist/css/me-icon.min.css?inline'

const SharedButtonElement = defineCustomElement(SharedButton, {
  shadowRoot: true,
  styles: [tailwindStyles, meIconStyles]
})

if (!customElements.get('shared-button')) {
  customElements.define('shared-button', SharedButtonElement)
}

export default SharedButtonElement
