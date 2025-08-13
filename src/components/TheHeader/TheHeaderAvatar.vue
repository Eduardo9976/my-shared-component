<template>
  <div>
    <div
      class="group py-2 px-4 hover:bg-[rgba(0,0,0,0.1)] cursor-pointer"
      @click.stop="visibleMenu = !visibleMenu"
    >
      <div
        class="flex items-center justify-center size-12 rounded-full bg-[rgba(0,0,0,0.4)] mx-auto border-transparent border group-hover:border-white group-hover:border-2"
      >
        <span class="text-2xl uppercase">{{ props.user.acronym }}</span>
      </div>
    </div>

    <TheHeaderAvatarMenu v-model:visible="visibleMenu" v-bind="$props" />
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import type {ProfileItem, User} from '@/types'
import TheHeaderAvatarMenu from './TheHeaderAvatarMenu.vue'

interface Props {
  user: User
  profileItems: ProfileItem[]
}

const props = defineProps<Props>()

const visibleMenu = ref(false)
</script>
