<template>
  <i
    :class="[
      currentIcon,
      variantClass,
      'inline-flex items-center justify-center',
      variantClasses,
      hoverClasses
    ]"
    :style="iconStyle"
    :aria-label="ariaLabel"
    role="img"
    data-cy="icon-element"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <slot />
  </i>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'

const iconTypes = {
  regular: 'me-icon',
  solid: 'me-icon-s',
  light: 'me-icon-l',
  thin: 'me-icon-t'
}

const variants = ['primary', 'success', 'danger', 'warning']

interface Props {
  color?: string
  hoverColor?: string
  hoverIcon?: string
  icon?: string
  name?: string
  type?: 'regular' | 'solid' | 'light' | 'thin'
  variant?: 'primary' | 'success' | 'danger' | 'warning' | ''
  size?: number | string
  customSize?: number
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: '',
  hoverColor: '',
  hoverIcon: '',
  icon: '',
  name: '',
  type: 'regular',
  variant: '',
  size: '',
  customSize: undefined,
  ariaLabel: undefined
})

const isHover = ref(false)

const iconStyle = computed(() => {
  const styles: Record<string, string> = {}

  const color = isHover.value ? props.hoverColor : props.color
  if (color) styles.color = color

  if (props.customSize) {
    const px = `${props.customSize}px`
    Object.assign(styles, { width: px, height: px, fontSize: px })
  } else if (props.size) {
    styles.fontSize = typeof props.size === 'number' ? `${props.size}px` : props.size
  }

  return styles
})

const variantClass = computed(() => {
  return props.variant && variants.includes(props.variant)
    ? `icon-${props.variant}`
    : ''
})

const variantClasses = computed(() => {
  if (!props.variant) return ''

  const variantMap = {
    primary: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600'
  }

  return variantMap[props.variant] || ''
})

const hoverClasses = computed(() => {
  if (!isHover.value) return ''

  if (props.hoverIcon) {
    return 'transition-all duration-200'
  }

  if (props.hoverColor) {
    return 'transition-colors duration-200'
  }

  return ''
})

const currentIcon = computed(() => {
  if (isHover.value && props.hoverIcon) {
    return props.hoverIcon
  }

  if (props.icon) {
    return props.icon
  }

  if (props.name) {
    return [iconTypes[props.type], `icon-${props.name}`]
  }

  return []
})
</script>
