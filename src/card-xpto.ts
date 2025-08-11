import { defineCustomElement } from 'vue'
import CardXPTO from './components/CardXPTO.ce.vue'

import './assets/main.css'

const CardXPTElement = defineCustomElement(CardXPTO, {
  shadowRoot: false,
})

if (!customElements.get('card-xpto')) {
  customElements.define('card-xpto', CardXPTElement)
}

export default CardXPTElement
