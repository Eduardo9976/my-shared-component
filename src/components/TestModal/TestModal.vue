<script setup lang="ts">
import {ref, watch} from 'vue'

const first = defineModel('open', {
  type: Boolean,
  default: false
})
const second = ref(false)

watch(first, (newValue: boolean) => {
  console.log('First changed', newValue)
})
</script>

<template>
  <teleport to="body">
    <UModal
      v-model:open="first"
      title="First modal"
      :ui="{footer: 'justify-end'}"
    >
      <UButton color="neutral" variant="subtle" label="Open" />

      <template #footer>
        <UButton
          label="Close"
          color="neutral"
          variant="outline"
          @click="first = false"
        />

        <UModal
          v-model:open="second"
          title="Second modal"
          :ui="{footer: 'justify-end'}"
        >
          <UButton label="Open second" color="neutral" />

          <template #footer>
            <UButton
              label="Close"
              color="neutral"
              variant="outline"
              @click="second = false"
            />
          </template>
        </UModal>
      </template>
    </UModal>
  </teleport>
</template>
