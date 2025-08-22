<template>
  <header :class="headerClasses" :style="headerStyles">
    <nav class="flex items-center justify-between">
      <TheHeaderBrand :brand="storeBrand" />

      <TheHeaderNavigation
        :navigationItems="storeNavigationItems"
        :iconColor="iconColor"
        :siteMapItems="storeSiteMapItems"
      />

      <TheHeaderAvatar :user="storeUser" :profileItems="storeProfileItems" />
    </nav>
  </header>

  <AppBackdrop
    v-if="backdropState.visible"
    :z-index="backdropState.zIndex"
    @click="closeBackdrop"
  />
</template>

<script setup lang="ts">
import {ref, computed, provide, onMounted, toRef, watch} from 'vue'
import TheHeaderBrand from './TheHeaderBrand.vue'
import TheHeaderNavigation from './TheHeaderNavigation.vue'
import TheHeaderAvatar from './TheHeaderAvatar.vue'
import AppBackdrop from '@/components/AppBackdrop.vue'
import {useHeaderStore} from '@/composables/useHeaderStore.ts'
import {
  type SupportedLocale,
  useTranslations
} from '@/composables/useTranslations/useTranslations.ts'
import {useHeader} from '@/composables/useHeader/useHeader.ts'
import type {GTM, PusherInstance} from '@/types'
import {useHttp} from '@/composables/useHttp'
import {useBadgeManager} from '@/composables/useBadgeManager'

interface Props {
  activeLinkName?: string
  gtm?: GTM
  token?: string
  pusher?: PusherInstance
}

const props = defineProps<Props>()

const {initializeData} = useHeader(
  props.activeLinkName || 'home',
  props.gtm || {push: (e: unknown) => console.log('click no gtm', e)}
)

const headerStore = useHeaderStore()
const {initBadgesForLinks} = useBadgeManager(props.pusher)

const storeUser = toRef(headerStore, 'user')

const storeNavigationItems = toRef(headerStore, 'navigationItems')

const storeBrand = toRef(headerStore, 'brand')

const storeProfileItems = toRef(headerStore, 'profileItems')

const storeSiteMapItems = toRef(headerStore, 'siteMapItems')

const storeHeaderLinks = toRef(headerStore, 'headerLinks')

watch(
  storeHeaderLinks,
  newHeaderLinks => {
    if (newHeaderLinks && newHeaderLinks.length > 0 && storeUser.value.id) {
      initBadgesForLinks(newHeaderLinks, storeUser.value.id)
    }
  },
  {immediate: true}
)

const backdropState = ref({
  visible: false,
  zIndex: 9999
})

function showBackdrop(zIndex = 9999) {
  backdropState.value = {
    visible: true,
    zIndex
  }
}

function closeBackdrop() {
  backdropState.value.visible = false
}

provide('headerBackdrop', {
  show: showBackdrop,
  close: closeBackdrop,
  state: backdropState
})

onMounted(async () => {
  const {setToken} = useHttp()

  if (props.token) {
    setToken(props.token)
  }

  await initializeData()
  useTranslations().setLocale(storeUser.value.culture as SupportedLocale)
})

const headerClasses = computed(() => {
  const baseClasses = `shadow-lg text-white border-b`
  return `${baseClasses}`
})

const headerStyles = computed(() => {
  const styles: Record<string, string> = {}
  const bg = storeBrand.value?.background || {}

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
    styles.backgroundColor = 'var(--ui-primary)'
  }

  styles.borderBottomColor = iconColor.value || 'transparent'

  return styles
})

const iconColor = computed(() => {
  return storeBrand.value?.iconColor || 'var(--ui-bg)'
})
</script>
