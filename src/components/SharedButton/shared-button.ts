import { defineCustomElement } from 'vue'
import SharedButton from './SharedButton.ce.vue'
import tailwindStyles from '../../assets/main.css?inline'

const SharedButtonElement = defineCustomElement(SharedButton, {
  shadowRoot: true,
  styles: [tailwindStyles]
})

if (!customElements.get('shared-button')) {
  customElements.define('shared-button', SharedButtonElement)
}

export default SharedButtonElement
