import { defineCustomElement } from 'vue'
import SharedButton from './components/SharedButton.ce.vue'

// Importar os estilos CSS do Nuxt UI e Tailwind
import './assets/main.css'

// Converte o componente Vue em um Custom Element
const SharedButtonElement = defineCustomElement(SharedButton, {
  shadowRoot: false, // Desabilita shadow DOM para facilitar uso
  styles: [`/* inlined css */`],
});

// Registra o Custom Element no navegador
if (!customElements.get('shared-button')) {
  customElements.define('shared-button', SharedButtonElement)
}

export default SharedButtonElement
