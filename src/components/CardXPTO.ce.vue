<template>
    <div class="card-container">
        <UCard class="w-full max-w-sm">
            <template #header>
                <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-star" class="text-yellow-500" />
                    <h3 class="text-lg font-semibold">Card XPTO</h3>
                </div>
            </template>
            
            <div class="space-y-3">
                <p class="text-gray-600">
                    Este é um card de exemplo criado como web component. 
                    Ele demonstra o uso de vários componentes do Nuxt UI.
                </p>
                
                <div class="flex items-center gap-2">
                    <UBadge color="success" variant="soft">
                        <UIcon name="i-lucide-check" class="w-3 h-3" />
                        Funcionando
                    </UBadge>
                    <UBadge color="warning" variant="soft">
                        <UIcon name="i-lucide-alert-triangle" class="w-3 h-3" />
                        Atenção
                    </UBadge>
                </div>
                
                <UProgress :value="75" color="primary" />
                
                <div class="flex gap-2">
                    <UButton color="primary" variant="solid" size="sm">
                        <UIcon name="i-lucide-heart" class="w-4 h-4" />
                        Curtir
                    </UButton>
                    <UButton color="primary" variant="outline" size="sm">
                        <UIcon name="i-lucide-share" class="w-4 h-4" />
                        Compartilhar
                    </UButton>
                </div>
            </div>
            
            <template #footer>
                <div class="flex justify-between items-center text-sm text-gray-500">
                    <span>Criado em {{ new Date().toLocaleDateString() }}</span>
                    <UButton color="primary" variant="ghost" size="xs">
                        <UIcon name="i-lucide-more-horizontal" />
                    </UButton>
                </div>
            </template>
        </UCard>
    </div>
</template>

<script setup lang="ts">
// Importar estilos diretamente no componente
import { ref } from 'vue';
import '../assets/main.css'

// Aqui você pode adicionar props, emits, composables, etc.
// Por exemplo:
// const props = defineProps<{
//   title?: string
//   description?: string
// }>()

// const emit = defineEmits<{
//   like: [value: boolean]
//   share: [value: string]
// }>()
</script>

<style scoped>
.card-container {
    font-family: var(--ui-font);
}
</style>
