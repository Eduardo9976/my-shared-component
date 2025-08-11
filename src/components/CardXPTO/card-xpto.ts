import { defineCustomElement } from 'vue'
import CardXPTO from './CardXPTO.ce.vue'

import '../../assets/main.css'

const CardXPTElement = defineCustomElement(CardXPTO, {
  shadowRoot: true,
})

if (!customElements.get('card-xpto')) {
  customElements.define('card-xpto', CardXPTElement)
}

export default CardXPTElement
