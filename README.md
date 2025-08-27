# Header Web Component

Um web component moderno e responsivo para headers de aplicações web, desenvolvido com Vue 3 e TypeScript.

## 📋 Sobre

Este projeto fornece um header reutilizável como web component (`<the-header>`), oferecendo funcionalidades completas de navegação, autenticação e personalização visual para aplicações web modernas.

## ✨ Funcionalidades

### 🎨 **Personalização Visual**
- **Marca responsiva**: Logo que se adapta ao tamanho da tela
- **Temas customizáveis**: Suporte a cores primárias, secundárias e gradientes
- **Backgrounds flexíveis**: Imagens principais, repetidas ou cores sólidas
- **Design responsivo**: Adaptação automática para diferentes dispositivos

### 👤 **Sistema de Usuário**
- **Avatar inteligente**: Menu dropdown com posicionamento preciso
- **Perfil do usuário**: Exibição de nome, role e avatar
- **Menu de perfil**: Itens de navegação personalizáveis
- **Autenticação**: Renderização condicional baseada no estado do usuário

### 🧭 **Navegação**
- **Menu principal**: Navegação dinâmica com ícones e badges
- **Itens ativos**: Indicação visual de página atual
- **Links externos**: Suporte a abertura em nova aba
- **Site map**: Navegação secundária organizacional

### 🛒 **Carrinho de Compras**
- **Ícone de carrinho**: Exibição condicional e contador de itens
- **API integrada**: Carregamento automático dos dados do carrinho
- **Atualização dinâmica**: Sincronização em tempo real

### 🌐 **Internacionalização**
- **Multi-idioma**: Suporte completo a i18n
- **Idiomas suportados**:
  - Português (pt-BR, pt-PT)
  - Inglês (en-US)
  - Espanhol (es-ES, es-MX)
  - Francês (fr-FR, fr-CA)
- **Detecção automática**: Configuração baseada no perfil do usuário

### 🔔 **Sistema de Notificações**
- **Badges dinâmicos**: Contadores de notificações em tempo real
- **WebSocket/Pusher**: Integração para atualizações ao vivo
- **Gerenciamento inteligente**: Controle automático de estado

## 🚀 Instalação

### Pré-requisitos

```bash
Node.js ^20.19.0 || >=22.12.0
pnpm (recomendado)
```

### Desenvolvimento

```bash
# Clone o repositório
git clone <repository-url>
cd meweb-hipster-header

# Instale as dependências
pnpm install

# Execute em modo de desenvolvimento
pnpm dev
```

### Build para Produção

```bash
# Build completo
pnpm build

# Apenas verificação de tipos
pnpm type-check

# Build sem verificação de tipos
pnpm build-only
```

## 📦 Uso

### Implementação Básica

```html
<!DOCTYPE html>
<html>
<head>
  <script src="./dist/the-header.js"></script>
  <link rel="stylesheet" href="./dist/webcomponents-styles.css">
</head>
<body>
  <the-header 
    active-link-name="home"
    show-cart="true">
  </the-header>
</body>
</html>
```

### Props Disponíveis

| Prop | Tipo | Padrão | Descrição |
|------|------|---------|-----------|
| `active-link-name` | `string` | `"home"` | Nome do link ativo atual |
| `gtm` | `GTM` | `{}` | Configuração do Google Tag Manager |
| `pusher` | `PusherInstance` | `undefined` | Instância do Pusher para notificações |
| `show-cart` | `boolean` | `false` | Exibir ícone do carrinho |

### Exemplo Avançado

```javascript
// Configuração com GTM e Pusher
const header = document.querySelector('the-header');

header.setAttribute('active-link-name', 'products');
header.setAttribute('show-cart', 'true');

// Configurar GTM
header.gtm = {
  push: (event) => {
    console.log('GTM Event:', event);
    // Integração com Google Tag Manager
  }
};

// Configurar Pusher para notificações em tempo real
header.pusher = new Pusher('your-key', {
  cluster: 'your-cluster'
});
```

## 🏗️ Arquitetura

### Estrutura do Projeto

```
src/
├── components/
│   └── TheHeader/
│       ├── TheHeader.ce.vue          # Componente principal
│       ├── TheHeaderBrand.vue        # Logo/marca
│       ├── TheHeaderNavigation.vue   # Menu principal
│       ├── TheHeaderAvatar.vue       # Avatar do usuário
│       ├── TheHeaderAvatarMenu.vue   # Menu dropdown do avatar
│       └── the-header.ts             # Web component definition
├── composables/
│   ├── useHeader/                    # Lógica principal do header
│   ├── useHeaderStore.ts             # Estado global
│   ├── useCart.ts                    # Funcionalidades do carrinho
│   ├── useBadgeManager.ts           # Gerenciamento de badges
│   └── useTranslations/             # Sistema de i18n
└── types/                           # Definições TypeScript
```

### Web Component

O header é exportado como um web component customizado:

```typescript
// Definição do elemento customizado
const TheHeaderElement = defineCustomElement(TheHeader, {
  shadowRoot: true,
  styles: [meIconStyles, tailwindStyles]
});

customElements.define('the-header', TheHeaderElement);
```

## 🎨 Personalização

### Temas e Cores

O header suporta múltiplos cenários de customização visual:

1. **Gradiente**: Cores primária e secundária
2. **Imagem + Repetição**: Background complexo
3. **Imagem + Cor**: Fundo misto
4. **Apenas imagem**: Background de imagem
5. **Cor sólida**: Background simples

### CSS Customizado

```css
the-header {
  --ui-primary: #your-color;
  --color-primary: #your-primary;
}
```

## 🔧 API Endpoints

O header integra com os seguintes endpoints:

- `/do/*` - API principal de dados
- `/cart/*` - API do carrinho de compras
- `/chat-api-bff/*` - API do chat/comunicação

## 🧪 Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev                 # Servidor de desenvolvimento
pnpm build              # Build completo
pnpm preview            # Preview da build

# Qualidade de Código
pnpm lint               # Verificar lint
pnpm lint:fix           # Corrigir lint automaticamente
pnpm format             # Formatar código com Prettier
pnpm type-check         # Verificação de tipos TypeScript
```

### Tecnologias Utilizadas

- **Vue 3** - Framework JavaScript reativo
- **TypeScript** - Tipagem estática
- **Vite** - Build tool moderna
- **Tailwind CSS** - Framework CSS utility-first
- **Nuxt UI** - Componentes UI prontos
- **ME Icon** - Sistema de ícones customizado
- **Axios** - Cliente HTTP
- **VueUse** - Utilitários para Vue

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrão de Commits

```
Jira MW-0000 - #time 1h 0m ref: Description of changes
```

## 📄 Licença

Este projeto é privado e proprietário.

## 🆘 Suporte

Para suporte e dúvidas, entre em contato com a equipe de desenvolvimento.

---

Desenvolvido com ❤️ pela equipe ME Web