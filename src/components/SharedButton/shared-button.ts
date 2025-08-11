import { defineCustomElement } from 'vue'
import SharedButton from './SharedButton.ce.vue'

import '../../assets/main.css'

const SharedButtonElement = defineCustomElement(SharedButton, {
  shadowRoot: true,
})

if (!customElements.get('shared-button')) {
  customElements.define('shared-button', SharedButtonElement)
}

export default SharedButtonElement
