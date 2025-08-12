# Types Directory

Este diretório contém todas as definições de tipos TypeScript centralizadas para o projeto.

## Estrutura

### `index.ts`

Arquivo principal que exporta todos os tipos do projeto.

## Tipos Disponíveis

### Brand Types

```typescript
import type {Brand, BrandBackground} from '@/types'

interface Brand {
  logo: string
  link: string
  newTab: boolean
  background?: BrandBackground
}

interface BrandBackground {
  primaryColor?: string
  secondaryColor?: string
  iconColor?: string
  mainImage?: string
  repeatImage?: string
}
```

### Navigation Types

```typescript
import type {NavigationItem} from '@/types'

interface NavigationItem {
  iconName: string
  label: string
  route?: string
}
```

## Como Usar

### Importação Simples

```typescript
import type {Brand, NavigationItem} from '@/types'
```

### Importação Específica

```typescript
import type {Brand} from '@/types'
import type {NavigationItem} from '@/types'
```

## Benefícios

- ✅ **Centralização**: Todos os tipos em um local
- ✅ **Reutilização**: Fácil importar em qualquer componente
- ✅ **Manutenibilidade**: Mudanças em um lugar afetam todo o projeto
- ✅ **Consistência**: Padrões de tipos uniformes
- ✅ **Escalabilidade**: Fácil adicionar novos tipos

## Adicionando Novos Tipos

1. Adicione a interface no arquivo `index.ts`
2. Exporte usando `export type { NewType }`
3. Importe onde necessário: `import type { NewType } from '@/types'`

## Exemplo de Uso

```typescript
// Em qualquer componente
import type {Brand, NavigationItem} from '@/types'

const brand: Brand = {
  logo: '/logo.svg',
  link: 'https://example.com',
  newTab: true,
  background: {
    primaryColor: '#FF0000',
    iconColor: 'white'
  }
}

const navItems: NavigationItem[] = [{iconName: 'home', label: 'Início'}]
```
