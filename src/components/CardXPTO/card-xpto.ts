import { defineCustomElement } from 'vue'
import CardXPTO from './CardXPTO.ce.vue'
import tailwindStyles from '../../assets/main.css?inline'

const CardXPTElement = defineCustomElement(CardXPTO, {
  shadowRoot: true,
  styles: [tailwindStyles]
})

if (!customElements.get('card-xpto')) {
  customElements.define('card-xpto', CardXPTElement)
}

export default CardXPTElement
