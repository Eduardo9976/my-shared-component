<template>
  <div class="p-4 w-[384px]">
    <UTabs
      :items="items"
      class="w-full"
      size="xs"
      variant="pill"
      color="neutral"
      :ui="{
        list: 'grid grid-cols-2 w-full',
        trigger:
          'flex-1 text-center cursor-pointer data-[state=active]:bg-white data-[state=active]:text-gray-900 focus:outline-none focus-visible:outline-none',
        indicator: 'bg-white'
      }"
      @change="handleTabChange"
    >
      <template #navigationItems>
        <keep-alive>
          <Suspense>
            <TheHeaderTabsNavigationItems />
            <template #fallback>
              <div class="p-4 text-center text-gray-500">Carregando...</div>
            </template>
          </Suspense>
        </keep-alive>
      </template>

      <template #siteMapItems>
        <keep-alive>
          <Suspense>
            <TheHeaderTabsSiteMapItems />
            <template #fallback>
              <div class="p-4 text-center text-gray-500">Carregando...</div>
            </template>
          </Suspense>
        </keep-alive>
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import type {TabsItem} from '@nuxt/ui'
import TheHeaderTabsSiteMapItems from '@/components/TheHeader/TheHeaderTabsSiteMapItems.vue'
import TheHeaderTabsNavigationItems from '@/components/TheHeader/TheHeaderTabsNavigationItems.vue'

const items = ref<TabsItem[]>([
  {
    label: 'Apps',
    slot: 'navigationItems' as const
  },
  {
    label: 'Outras funcionalidades',
    slot: 'siteMapItems' as const
  }
])

// Função para lidar com a mudança de tab
const handleTabChange = (index: number) => {
  // O UTabs já gerencia o estado internamente, então não precisamos de estado adicional
  // O keep-alive vai preservar os componentes
}

// Otimização: pré-carregar os componentes quando o componente for montado
onMounted(() => {
  // Os componentes serão carregados lazy mas mantidos em memória pelo keep-alive
})
</script>
