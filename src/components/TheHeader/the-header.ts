import {defineCustomElement} from 'vue'
import TheHeader from './TheHeader.ce.vue'
import resetStyles from '../../assets/webcomponent-reset.css?inline'
import tailwindStyles from '../../assets/main.css?inline'
import meIconStyles from '@mercadoeletronico/me-icon/dist/css/me-icon.min.css?inline'

const TheHeaderElement = defineCustomElement(TheHeader, {
  shadowRoot: true,
  styles: [resetStyles, meIconStyles, tailwindStyles]
})

if (!customElements.get('the-header')) {
  customElements.define('the-header', TheHeaderElement)
}

export default TheHeaderElement
