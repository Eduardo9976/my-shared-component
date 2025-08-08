import { defineCustomElement } from 'vue'
import CardXPTO from './components/CardXPTO.ce.vue'

// Importar os estilos CSS do Nuxt UI e Tailwind
import './assets/main.css'

// Converte o componente Vue em um Custom Element
const CardXPTElement = defineCustomElement(CardXPTO, {
  shadowRoot: false, // Desabilita shadow DOM para facilitar uso
});

// Registra o Custom Element no navegador
if (!customElements.get('card-xpto')) {
  customElements.define('card-xpto', CardXPTElement)
}

export default CardXPTElement
