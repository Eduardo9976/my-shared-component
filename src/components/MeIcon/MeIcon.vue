<template>
  <i
    :class="[
      ...iconClasses,
      sizeClasses,
      'inline-flex items-center justify-center'
    ]"
    :style="iconStyles"
    :aria-label="ariaLabel"
    role="img"
  />
</template>

<script setup lang="ts">
import {computed} from 'vue'

interface Props {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  color?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: undefined,
  ariaLabel: undefined
})

const iconClasses = computed(() => ['me-icon', `icon-${props.name}`])

const sizeClasses = computed(() => {
  const sizeMap = {
    xs: 'me-icon-xs',
    sm: 'me-icon-sm',
    md: 'me-icon-md',
    lg: 'me-icon-lg',
    xl: 'me-icon-xl',
    '2xl': 'me-icon-2xl'
  }
  return sizeMap[props.size] || sizeMap.md
})

const iconStyles = computed(() => {
  const baseStyles: Record<string, string> = {}

  if (props.color) {
    baseStyles.color = props.color
  }

  return baseStyles
})
</script>

<style scoped>
.me-icon-xs {
  font-size: 0.75rem !important;
  width: 0.75rem !important;
  height: 0.75rem !important;
}

.me-icon-sm {
  font-size: 0.875rem !important;
  width: 0.875rem !important;
  height: 0.875rem !important;
}

.me-icon-md {
  font-size: 1rem !important;
  width: 1rem !important;
  height: 1rem !important;
}

.me-icon-lg {
  font-size: 1.25rem !important;
  width: 1.25rem !important;
  height: 1.25rem !important;
}

.me-icon-xl {
  font-size: 1.5rem !important;
  width: 1.5rem !important;
  height: 1.5rem !important;
}

.me-icon-2xl {
  font-size: 2rem !important;
  width: 2rem !important;
  height: 2rem !important;
}
</style>
