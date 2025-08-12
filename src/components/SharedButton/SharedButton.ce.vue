<template>
  <div class="border border-blue-500 p-4 bg-blue-100">
    <UButton
      color="success"
      variant="solid"
      class="font-bold"
      @click="open = true"
    >
      <UIcon name="i-lucide-check-circle" class="mr-2" />
      Botão Atualizado - open = {{ open }}
    </UButton>

    <br />

    <MeIcon name="store" size="xl" color="black" />
    icon acima
    <br />

    <UDropdownMenu :items="dropdownItems" class="mt-4">
      <UButton icon="i-lucide-menu" color="neutral" variant="outline" />
    </UDropdownMenu>

    <UAccordion :items="accordionItems" class="mt-4" />

    <TestModal v-model:open="open" />
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import MeIcon from "../MeIcon/MeIcon.vue";

const open = ref(false)

watch(open, (newValue: boolean) => {
  console.log('open mudou:', newValue)
})

const dropdownItems = ref([
  {
    label: 'Profile',
    icon: 'i-lucide-user'
  },
  {
    label: 'Settings',
    icon: 'i-lucide-cog'
  },
  {
    label: 'Help',
    icon: 'i-lucide-help-circle'
  }
])

const accordionItems = ref([
  {
    label: 'Icons',
    icon: 'i-lucide-smile',
    content: 'You have nothing to do, @nuxt/icon will handle it automatically.'
  },
  {
    label: 'Colors',
    icon: 'i-lucide-swatch-book',
    content:
      'Choose a primary and a neutral color from your Tailwind CSS theme.'
  },
  {
    label: 'Components',
    icon: 'i-lucide-box',
    content:
      'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
  }
])
</script>
