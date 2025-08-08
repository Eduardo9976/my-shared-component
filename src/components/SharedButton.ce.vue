<template>
    <div class="border border-blue-500 p-4 bg-blue-100">
        <UButton color="success" variant="solid" class="font-bold">
            <UIcon name="i-lucide-check-circle" class="mr-2" />
            Botão Atualizado - Teste
        </UButton>

        <UDropdownMenu :items="dropdownItems" class="mt-4">
            <UButton icon="i-lucide-menu" color="neutral" variant="outline" />
        </UDropdownMenu>
    </div>
</template>

<script setup lang="ts">
// Importar estilos diretamente no componente
import { ref } from 'vue';
import '../assets/main.css'

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
</script>
