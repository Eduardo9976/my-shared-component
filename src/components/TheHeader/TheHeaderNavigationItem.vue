<template>
  <div class="grid place-items-center gap-1">
    <div>
      <MeIcon :name="iconName" size="xl" :color="iconColor" />
    </div>
    <p class="text-xs" :style="{color: iconColor}">{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
import MeIcon from '@/components/MeIcon/MeIcon.vue'

interface Props {
  iconName: string
  label: string
  iconColor: string
}

defineProps<Props>()
</script>
