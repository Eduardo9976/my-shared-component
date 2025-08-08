import { defineCustomElement } from 'vue'
import SharedButton from './components/SharedButton.vue'

// Importar os estilos CSS
import './assets/main.css'

// Converte o componente Vue em um Custom Element
const SharedButtonElement = defineCustomElement(SharedButton)

// Registra o Custom Element no navegador
if (!customElements.get('shared-button')) {
  customElements.define('shared-button', SharedButtonElement)
}

export default SharedButtonElement
