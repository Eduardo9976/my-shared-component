<template>
  <a
    :href="useSanitizeURL(brand.link)"
    :target="brand.newTab ? '_blank' : '_self'"
    class="px-4"
  >
    <img :src="brand.logo" alt="logo" class="max-w-[75px] max-h-[32px]" />
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
