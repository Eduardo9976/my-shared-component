import {defineCustomElement} from 'vue'
import TheHeader from './TheHeader.ce.vue'
import webcomponentStyles from '../../../dist/webcomponents-styles.css?inline'
import tailwindStyles from '../../assets/main.css?inline'
import meIconStyles from '@mercadoeletronico/me-icon/dist/css/me-icon.min.css?inline'

const fixedCSS = webcomponentStyles.replace(
  /^(\s*):root\s*\{(?![^}]*:host)/gm,
  '$1:root, :host {'
)

const TheHeaderElement = defineCustomElement(TheHeader, {
  shadowRoot: true,
  styles: [fixedCSS, meIconStyles, tailwindStyles]
})

if (!customElements.get('the-header')) {
  customElements.define('the-header', TheHeaderElement)
}

export default TheHeaderElement
