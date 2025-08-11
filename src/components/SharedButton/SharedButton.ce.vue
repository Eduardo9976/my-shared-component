<template>
    <div class="border border-blue-500 p-4 bg-blue-100">
        <UButton color="success" variant="solid" class="font-bold">
            <UIcon name="i-lucide-check-circle" class="mr-2" />
            Botão Atualizado - Teste
        </UButton>

        <UDropdownMenu :items="dropdownItems" class="mt-4">
            <UButton icon="i-lucide-menu" color="neutral" variant="outline" />
        </UDropdownMenu>

        <UAccordion :items="accordionItems" class="mt-4" />

        <TestModal />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import '../../assets/main.css'

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
    content: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
  },
  {
    label: 'Components',
    icon: 'i-lucide-box',
    content: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
  }
])
</script>
