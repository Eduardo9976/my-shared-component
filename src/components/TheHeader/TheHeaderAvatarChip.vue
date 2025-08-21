<template>
  <UChip
    v-if="props?.user?.badge?.icon"
    color="error"
    size="3xl"
    position="bottom-right"
    :inset="false"
    :ui="{
      base: 'p-2 ring-0 font-semibold',
      root: 'translate-x-1 translate-y-3'
    }"
  >
    <template #content>
      <MeIcon
        v-if="props.user?.badge.icon"
        :icon="props.user?.badge.icon"
        :color="props.user?.badge.variant || 'danger'"
      />
    </template>
  </UChip>
</template>
<script setup lang="ts">
import type {User} from '@/types/index.js'

interface Props {
  user: User
}

const props = defineProps<Props>()
</script>
