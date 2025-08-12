<template>
  <div>
    <a
      :href="useSanitizeURL(brand.link)"
      :target="brand.newTab ? '_blank' : '_self'"
    >
      <img :src="brand.logo" alt="logo" />
    </a>
  </div>
</template>

<script setup lang="ts">
import {useSanitizeURL} from '@/composables/useSanitizeURL.ts'
import type {Brand} from '@/types'

interface Props {
  brand: Brand
}

defineProps<Props>()
</script>
