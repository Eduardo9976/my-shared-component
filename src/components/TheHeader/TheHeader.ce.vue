<template>
  <header :class="headerClasses" :style="headerStyles">
    <nav class="flex justify-between items-center">
      <TheHeaderBrand :brand="brand" />

      <TheHeaderNavigation :icon-color="iconColor" :items="navigationItems" />
    </nav>
  </header>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import type {Brand, NavigationItem} from '@/types'
import TheHeaderBrand from './TheHeaderBrand.vue'
import TheHeaderNavigation from './TheHeaderNavigation.vue'

const brand = ref<Brand>({
  logo: 'https://eletrods.me.com.br/logo.svg',
  link: 'https://me.com.br',
  newTab: true,
  background: {
    primaryColor: '#343434',
    secondaryColor: '#009900',
    iconColor: 'peachPuff'
    // repeatImage: 'https://conteudo.imguol.com.br/c/home/46/2020/03/02/balaio-do-kotscho-150-1583157444753_100x100.jpg.webp',
    // mainImage: 'https://conteudo.imguol.com.br/c/noticias/90/2019/04/01/leonardo-sakamoto-1554157201028_v2_100x100.jpg.webp',
  }
})

const navigationItems = ref<NavigationItem[]>([
  {
    iconName: 'objects-column',
    label: 'Dashboard',
    route: '/dashboard'
  },
  {
    iconName: 'store',
    label: 'Fornecedores',
    route: '/fornecedores'
  }
])

const headerClasses = computed(() => {
  const baseClasses = 'p-4 shadow-lg'
  return `${baseClasses} text-white`
})

const headerStyles = computed(() => {
  const styles: Record<string, string> = {}
  const bg = brand.value.background || {}

  const hasMainImage = Boolean(bg.mainImage)
  const hasRepeatImage = Boolean(bg.repeatImage)
  const hasPrimaryColor = Boolean(bg.primaryColor)
  const hasSecondaryColor = Boolean(bg.secondaryColor)

  if (hasMainImage && hasRepeatImage && bg.mainImage && bg.repeatImage) {
    // Cenário 2: Imagem principal + imagem repetida
    styles.backgroundImage = `url(${bg.mainImage}), url(${bg.repeatImage})`
    styles.backgroundSize = 'cover, auto'
    styles.backgroundPosition = 'center, center'
    styles.backgroundRepeat = 'no-repeat, repeat'
  } else if (
    hasMainImage &&
    hasPrimaryColor &&
    bg.mainImage &&
    bg.primaryColor
  ) {
    // Cenário 3: Imagem principal + cor primária
    styles.backgroundColor = bg.primaryColor
    styles.backgroundImage = `url(${bg.mainImage})`
    styles.backgroundSize = 'contain'
    styles.backgroundPosition = 'center'
    styles.backgroundRepeat = 'no-repeat'
  } else if (hasRepeatImage && !hasMainImage && bg.repeatImage) {
    // Cenário 4: Apenas imagem repetida
    styles.backgroundImage = `url(${bg.repeatImage})`
    styles.backgroundSize = 'auto'
    styles.backgroundPosition = 'center'
    styles.backgroundRepeat = 'repeat'
  } else if (
    hasPrimaryColor &&
    hasSecondaryColor &&
    !hasMainImage &&
    !hasRepeatImage &&
    bg.primaryColor &&
    bg.secondaryColor
  ) {
    // Cenário 1: Gradiente com cores primária e secundária
    styles.background = `linear-gradient(135deg, ${bg.primaryColor} 0%, ${bg.secondaryColor} 100%)`
  } else if (
    hasPrimaryColor &&
    !hasSecondaryColor &&
    !hasMainImage &&
    !hasRepeatImage &&
    bg.primaryColor
  ) {
    // Cenário 5: Apenas cor primária
    styles.backgroundColor = bg.primaryColor
  } else {
    // Padrão: variável CSS
    styles.backgroundColor = 'var(--ui-primary)'
  }

  return styles
})

const iconColor = computed(() => {
  return brand.value.background?.iconColor || 'white'
})
</script>
