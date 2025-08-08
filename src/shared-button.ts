import { defineCustomElement } from 'vue'
import SharedButton from './components/SharedButton.ce.vue'

// Importar os estilos CSS do Nuxt UI e Tailwind
import './assets/main.css'

// Funções do Nuxt UI para gerar variáveis CSS
import colors from 'tailwindcss/colors'

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

function getColor(color: string, shade: number): string {
  if (color in colors && typeof colors[color as keyof typeof colors] === "object" && shade in (colors[color as keyof typeof colors] as any)) {
    return (colors[color as keyof typeof colors] as any)[shade]
  }
  return ""
}

function generateShades(key: string, value: string): string {
  return `${shades.map((shade) => `--ui-color-${key}-${shade}: var(--color-${value === "neutral" ? "old-neutral" : value}-${shade}, ${getColor(value, shade)});`).join("\n  ")}`
}

function generateColor(key: string, shade: number): string {
  return `--ui-${key}: var(--ui-color-${key}-${shade});`
}

// Configuração padrão do Nuxt UI
const defaultColors = {
  primary: 'blue',
  success: 'green',
  warning: 'yellow',
  danger: 'red',
  gray: 'gray'
}

function generateNuxtUICSSVariables(): string {
  let css = ':root {\n'
  
  // Gerar variáveis para cada cor usando as funções oficiais
  Object.entries(defaultColors).forEach(([key, value]) => {
    css += `  ${generateShades(key, value)}\n`
  })
  
  // Adicionar variáveis específicas do Nuxt UI
  css += `  /* Variáveis específicas do Nuxt UI */\n`
  Object.keys(defaultColors).forEach(name => {
    css += `  ${generateColor(name, 500)}\n`
  })
  
  css += '}\n'
  
  return css
}

// Converte o componente Vue em um Custom Element
const SharedButtonElement = defineCustomElement(SharedButton, {
  shadowRoot: false, // Desabilita shadow DOM para facilitar uso
  styles: [
    // Apenas as variáveis CSS do Nuxt UI - Tailwind já está importado
    generateNuxtUICSSVariables()
  ],
});

// Registra o Custom Element no navegador
if (!customElements.get('shared-button')) {
  customElements.define('shared-button', SharedButtonElement)
}

export default SharedButtonElement
