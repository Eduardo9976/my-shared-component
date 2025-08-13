<template>
  <div
    class="grid place-items-center gap-1 px-2 py-1 cursor-pointer relative transition-colors duration-200 hover:bg-[rgba(0,0,0,0.1)]"
    :class="
      props.active &&
      'after:content-[\'\'] after:bg-[var(--header-icon-color)] after:h-1 after:rounded-full after:absolute after:block after:w-[80%] after:bottom-0 after:left-1/2 after:-translate-x-1/2'
    "
    :style="{'--header-icon-color': iconColor}"
    @click="handleClick"
  >
    <div class="flex items-center justify-center">
      <MeIcon :icon="props.icon" :custom-size="24" :color="iconColor" />
    </div>

    <p class="text-xs py-[6px] text-[var(--header-icon-color)]">{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
import MeIcon from '@/components/MeIcon/MeIcon.vue'
import type {NavigationItem} from '@/types'

interface Props extends NavigationItem {
  iconColor: string
}

const props = defineProps<Props>()

function handleClick() {
  props.click?.(props)
}
</script>
