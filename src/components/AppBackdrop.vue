<template>
  <teleport :to="teleportTo">
    <div
      class="size-full fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)] z-10000"
    >
      <div class="size-full">
        <slot> slot content </slot>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
type TProps = {
  teleportTo?: string
}

const {teleportTo = 'body'} = defineProps<TProps>()
</script>
