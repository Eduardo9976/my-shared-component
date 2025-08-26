import {defineCustomElement} from 'vue'
import TheHeader from './TheHeader.ce.vue'
import tailwindStyles from '../../assets/main.css?inline'

const TheHeaderElement = defineCustomElement(TheHeader, {
  shadowRoot: true,
  styles: [tailwindStyles]
})

if (!customElements.get('the-header')) {
  customElements.define('the-header', TheHeaderElement)
}

export default TheHeaderElement
