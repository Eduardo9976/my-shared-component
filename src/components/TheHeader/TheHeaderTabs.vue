<template>
  <div class="p-4 w-[384px]">


    <UTabs
      :items="items"
      class="w-full"
      size="xs"
      variant="pill"
      color="neutral"
      :ui="{
        list: 'grid grid-col w-full',
        trigger:
          'flex-1 text-center cursor-pointer data-[state=active]:bg-white data-[state=active]:text-gray-900 focus:outline-none focus-visible:outline-none',
        indicator: 'bg-white'
      }"
    >
      <template #navigationItems>
        <keep-alive>
          <Suspense>
            <TheHeaderTabsNavigationItems />
            <template #fallback>
              <div class="p-4 text-center text-gray-500">{{ t('theHeader.tabs.loading') }}</div>
            </template>
          </Suspense>
        </keep-alive>
      </template>

      <template #siteMapItems>
        <keep-alive>
          <Suspense>
            <TheHeaderTabsSiteMapItems :siteMapItems="props.siteMapItems" />
            <template #fallback>
              <div class="p-4 text-center text-gray-500">{{ t('theHeader.tabs.loading') }}</div>
            </template>
          </Suspense>
        </keep-alive>
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import type {TabsItem} from '@nuxt/ui'
import type {SiteMapItem} from '@/types'
import TheHeaderTabsSiteMapItems from '@/components/TheHeader/TheHeaderTabsSiteMapItems.vue'
import TheHeaderTabsNavigationItems from '@/components/TheHeader/TheHeaderTabsNavigationItems.vue'
import {useTranslations} from '@/composables/localI18n/useTranslations.ts'

const {t} = useTranslations()

interface Props {
  siteMapItems?: SiteMapItem[]
}

const props = defineProps<Props>()

const items = ref<TabsItem[]>([
  {
    label: t('theHeader.tabs.othersFuncionality'),
    slot: 'siteMapItems' as const
  }
])
</script>
