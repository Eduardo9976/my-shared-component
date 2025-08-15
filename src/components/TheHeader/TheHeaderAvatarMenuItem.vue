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
        @click.prevent="() => handleClick(item)"
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

function handleClick(item: ProfileItem) {
  if (item.url) {
    const isExternal = /^https?:\/\//.test(item.url)

    if (isExternal) {
      window.open(item.url, '_self')
    } else {
      window.location.href = item.url
    }

    return props.setVisibleToFalse()
  }

  if (item?.click) {
    item.click()
    props.setVisibleToFalse()
  }
}
</script>
