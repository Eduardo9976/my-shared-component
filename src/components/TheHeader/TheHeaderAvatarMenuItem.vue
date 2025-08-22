<template>
  <ul class="cursor-pointer overflow-hidden rounded-bl-lg">
    <li v-for="(item, index) in props.profileItems" :key="index">
      <UAccordion
        v-if="item.children"
        :items="accordionItems(item)"
        :ui="{
          body: 'p-0',
          trigger: `py-2 px-4 hover:bg-blue-100 hover:text-primary flex navigationItems-center gap-2 cursor-pointer font-normal ${item.active ? 'text-primary' : ''}`
        }"
      >
        <template #body="{item: accordionItem}">
          <TheHeaderAvatarMenuItem
            :profile-items="accordionItem.children || []"
            :set-visible-to-false="setVisibleToFalse"
            nested
          />
        </template>
      </UAccordion>

      <a
        v-else
        class="flex h-10 cursor-pointer items-center gap-2 px-4 py-2 group hover:text-primary hover:bg-blue-100"
        :href="item.url || '#'"
        @click.prevent.stop="() => handleClick(item)"
      >
        <span
          class="text-gray-500 group-hover:text-primary"
          :class="{
            'text-[var(--color-neutral-400)] font-semibold':
              props.nested && !item.active
          }"
        >
          {{ item.label }}
        </span>
        <span>
          <MeIcon
            v-if="item.icon"
            :icon="item.icon.class"
            :custom-size="16"
            :color="item.icon.color"
            class="leading-none"
          />
        </span>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type {ProfileItem} from '@/types'
import MeIcon from '@/components/MeIcon/MeIcon.vue'
import { useIsExternalUrl } from '@/composables/useIsExternalUrl'

interface Props {
  profileItems: ProfileItem[]
  setVisibleToFalse: () => void
  nested?: boolean
}

const props = defineProps<Props>()

function accordionItems(item: ProfileItem) {
  const {icon, ...rest} = item
  return [
    {
      ...rest,
      label: icon ? `${icon.class} ${item.label || ''}` : item.label || '',
      children: item.children || []
    }
  ]
}

const { isExternalUrl } = useIsExternalUrl()

function handleClick(item: ProfileItem) {
  const {url, click} = item
  const target = item.target ?? '_blank'

  if (click) {
    click()
    props.setVisibleToFalse()
    return
  }

  if (url) {
    if (isExternalUrl(url)) {
      window.open(url, target, 'noopener,noreferrer')
    } else {
      window.location.href = url
    }

    props.setVisibleToFalse()
    return
  }
}
</script>
