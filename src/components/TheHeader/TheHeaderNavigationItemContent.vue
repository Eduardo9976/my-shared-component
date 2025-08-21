<template>
  <component
    :is="isLink ? 'a' : 'button'"
    :href="isLink ? url : undefined"
    :target="isLink ? (target ?? '_self') : undefined"
    :type="!isLink ? 'button' : undefined"
    class="grid place-items-center gap-1 px-2 py-1 cursor-pointer relative transition-colors duration-200 hover:bg-[rgba(0,0,0,0.1)] text-[var(--color-neutral-300)] text-center"
    :class="[
      isLink ? 'no-underline' : 'border-0 bg-transparent',
      active && activeClass
    ]"
    :style="{'--header-icon-color': iconColor}"
    @click.prevent.stop="handleClick"
  >
    <div class="relative flex items-center justify-center">
      <MeIcon :icon="icon || ''" :custom-size="24" :color="iconColor" />

      <UChip
        v-if="badge?.text"
        :text="badge.text"
        color="error"
        size="3xl"
        position="top-right"
        :inset="false"
        :ui="{
          base: 'px-2 py-3 ring-0 font-semibold',
          root: 'translate-x-2'
        }"
      />
    </div>

    <p class="text-xs py-[6px] text-[var(--header-icon-color)] whitespace-nowrap">{{ label }}</p>
  </component>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import MeIcon from '@/components/MeIcon/MeIcon.vue'
import type {NavigationItem} from '@/types'

interface Props extends NavigationItem {
  iconColor: string
}

const props = defineProps<Props>()

const isLink = computed(() => Boolean(props.url))

const activeClass =
  "after:content-[''] after:bg-[var(--header-icon-color)] after:h-1 after:rounded-full after:absolute after:block after:w-[80%] after:bottom-0 after:left-1/2 after:-translate-x-1/2"

function handleClick() {
  props.click?.(props)
}
</script>
