import {defineCustomElement} from 'vue'
import TheHeader from './TheHeader.ce.vue'
import tailwindStyles from '../../assets/main.css?inline'
import antiReboot from '../../assets/anti-bootstrap-reboot.css?inline'
import meIconStyles from '@mercadoeletronico/me-icon/dist/css/me-icon.min.css?inline'

const TheHeaderElement = defineCustomElement(TheHeader, {
  shadowRoot: true,
  styles: [antiReboot, meIconStyles, tailwindStyles]
})

if (!customElements.get('the-header')) {
  customElements.define('the-header', TheHeaderElement)
}

export default TheHeaderElement
