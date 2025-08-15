<template>
  <teleport :to="teleportTo">
    <div
      :class="[
        'size-full fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)]',
        className
      ]"
      :style="{zIndex: zIndex}"
    >
      <div class="size-full">
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
type TProps = {
  teleportTo?: string
  class?: string
  zIndex?: number
}

const {
  teleportTo = 'body',
  class: className,
  zIndex = 10000
} = defineProps<TProps>()

defineEmits<{
  click: []
}>()
</script>
