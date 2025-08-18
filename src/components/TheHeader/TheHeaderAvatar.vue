<template>
  <div>
    <UPopover
      v-model:open="visibleMenu"
      :content="{
        align: 'end',
        side: 'bottom',
        sideOffset: -63
      }"
      :ui="{
        content: 'z-[10003]'
      }"
      mode="click"
      @update:open="handlePopoverUpdate"
    >
      <div class="group py-2 px-4 hover:bg-[rgba(0,0,0,0.1)] cursor-pointer">
        <div
          class="flex items-center justify-center size-12 rounded-full bg-[rgba(0,0,0,0.4)] mx-auto border-transparent border group-hover:border-white group-hover:border-2"
        >
          <span class="text-2xl uppercase">{{ props.user.acronym }}</span>
          <TheHeaderAvatarChip :user="props.user" />
        </div>
      </div>

      <template #content>
        <TheHeaderAvatarMenu
          :user="props.user"
          :profileItems="props.profileItems"
          :set-visible-to-false="setVisibleToFalse"
        />
      </template>
    </UPopover>
  </div>
</template>

<script setup lang="ts">
import {inject, onBeforeUnmount, ref, watch} from 'vue'
import type {HeaderBackdrop, ProfileItem, User} from '@/types'
import TheHeaderAvatarMenu from './TheHeaderAvatarMenu.vue'
import TheHeaderAvatarChip from '@/components/TheHeader/TheHeaderAvatarChip.vue'

interface Props {
  user: User
  profileItems: ProfileItem[]
}

const props = defineProps<Props>()

const visibleMenu = ref(false)

const headerBackdrop = inject<HeaderBackdrop>('headerBackdrop')

function handlePopoverUpdate(open: boolean) {
  if (open) {
    headerBackdrop?.show(9999)
  } else {
    headerBackdrop?.close()
  }
}

function setVisibleToFalse() {
  visibleMenu.value = false
  headerBackdrop?.close()
}

watch(visibleMenu, newValue => {
  if (!newValue) {
    headerBackdrop?.close()
  }
})

onBeforeUnmount(() => {
  setVisibleToFalse()
})
</script>
