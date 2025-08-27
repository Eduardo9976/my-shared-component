<template>
  <a
    :href="useSanitizeURL(brand.link)"
    :target="brand.newTab ? '_blank' : '_self'"
    class="px-4 flex items-center justify-center"
  >
    <img
      :src="brand.logo"
      alt="logo"
      class="basis-[75px] grow shrink min-w-0 max-h-[32px]"
    />
  </a>
</template>

<script setup lang="ts">
import {useSanitizeURL} from '@/composables/useSanitizeURL.ts'
import type {Brand} from '@/types'

interface Props {
  brand: Brand
}

defineProps<Props>()
</script>
