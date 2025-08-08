import { defineCustomElement } from 'vue'
import SharedButton from './components/SharedButton.ce.vue'

// Importar os estilos CSS do Nuxt UI e Tailwind
import './assets/main.css'

// Gerar as variáveis CSS do Nuxt UI dinamicamente
const nuxtUICSSVariables = `
:root {
  /* Variáveis de cores do Nuxt UI - Geradas dinamicamente */
  --ui-color-success-50: #f0fdf4;
  --ui-color-success-100: #dcfce7;
  --ui-color-success-200: #bbf7d0;
  --ui-color-success-300: #86efac;
  --ui-color-success-400: #4ade80;
  --ui-color-success-500: #22c55e;
  --ui-color-success-600: #16a34a;
  --ui-color-success-700: #15803d;
  --ui-color-success-800: #166534;
  --ui-color-success-900: #14532d;
  --ui-color-success-950: #052e16;
  
  --ui-color-primary-50: #eff6ff;
  --ui-color-primary-100: #dbeafe;
  --ui-color-primary-200: #bfdbfe;
  --ui-color-primary-300: #93c5fd;
  --ui-color-primary-400: #60a5fa;
  --ui-color-primary-500: #3b82f6;
  --ui-color-primary-600: #2563eb;
  --ui-color-primary-700: #1d4ed8;
  --ui-color-primary-800: #1e40af;
  --ui-color-primary-900: #1e3a8a;
  --ui-color-primary-950: #172554;
  
  --ui-color-danger-50: #fef2f2;
  --ui-color-danger-100: #fee2e2;
  --ui-color-danger-200: #fecaca;
  --ui-color-danger-300: #fca5a5;
  --ui-color-danger-400: #f87171;
  --ui-color-danger-500: #ef4444;
  --ui-color-danger-600: #dc2626;
  --ui-color-danger-700: #b91c1c;
  --ui-color-danger-800: #991b1b;
  --ui-color-danger-900: #7f1d1d;
  --ui-color-danger-950: #450a0a;
  
  --ui-color-warning-50: #fffbeb;
  --ui-color-warning-100: #fef3c7;
  --ui-color-warning-200: #fde68a;
  --ui-color-warning-300: #fcd34d;
  --ui-color-warning-400: #fbbf24;
  --ui-color-warning-500: #f59e0b;
  --ui-color-warning-600: #d97706;
  --ui-color-warning-700: #b45309;
  --ui-color-warning-800: #92400e;
  --ui-color-warning-900: #78350f;
  --ui-color-warning-950: #451a03;
  
  --ui-color-gray-50: #f9fafb;
  --ui-color-gray-100: #f3f4f6;
  --ui-color-gray-200: #e5e7eb;
  --ui-color-gray-300: #d1d5db;
  --ui-color-gray-400: #9ca3af;
  --ui-color-gray-500: #6b7280;
  --ui-color-gray-600: #4b5563;
  --ui-color-gray-700: #374151;
  --ui-color-gray-800: #1f2937;
  --ui-color-gray-900: #111827;
  --ui-color-gray-950: #030712;
  
  /* Variáveis específicas do Nuxt UI */
  --ui-success: var(--ui-color-success-500);
  --ui-primary: var(--ui-color-primary-500);
  --ui-danger: var(--ui-color-danger-500);
  --ui-error: var(--ui-color-danger-500);
  --ui-warning: var(--ui-color-warning-500);
  --ui-gray: var(--ui-color-gray-500);
  --ui-secondary: var(--ui-color-gray-500);
  --ui-info: var(--ui-color-primary-500);
  
  /* Variáveis de texto */
  --ui-text-dimmed: var(--ui-color-gray-400);
  --ui-text-muted: var(--ui-color-gray-500);
  --ui-text-toned: var(--ui-color-gray-600);
  --ui-text: var(--ui-color-gray-700);
  --ui-text-highlighted: var(--ui-color-gray-900);
  --ui-text-inverted: #ffffff;
  
  /* Variáveis de background */
  --ui-bg: #ffffff;
  --ui-bg-muted: var(--ui-color-gray-50);
  --ui-bg-elevated: var(--ui-color-gray-100);
  --ui-bg-accented: var(--ui-color-gray-200);
  --ui-bg-inverted: var(--ui-color-gray-900);
  
  /* Variáveis de border */
  --ui-border: var(--ui-color-gray-200);
  --ui-border-muted: var(--ui-color-gray-200);
  --ui-border-accented: var(--ui-color-gray-300);
  --ui-border-inverted: var(--ui-color-gray-900);
  
  /* Variáveis de radius */
  --ui-radius: 0.25rem;
  
  /* Variáveis de font */
  --ui-font: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --ui-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  
  /* Variáveis de transition */
  --ui-transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  --ui-transition-duration: 0.15s;
  --ui-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Variáveis de container */
  --ui-container: 80rem;
  
  /* Variáveis de spacing */
  --ui-spacing: 0.25rem;
  
  /* Variáveis de shadow */
  --ui-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --ui-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --ui-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --ui-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --ui-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  
  /* Variáveis de z-index */
  --ui-z-dropdown: 1000;
  --ui-z-sticky: 1020;
  --ui-z-fixed: 1030;
  --ui-z-modal-backdrop: 1040;
  --ui-z-modal: 1050;
  --ui-z-popover: 1060;
  --ui-z-tooltip: 1070;
  --ui-z-toast: 1080;
}
`