import { ref, reactive } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import type { NavigationItem, PusherInstance } from '@/types'
import { useHttp } from './useHttp'

interface BadgeState {
  badges: Record<string, string | number>
  badgeLoader: Record<string, any>
}

export function useBadgeManager(pusher?: PusherInstance) {
  const { get } = useHttp()
  
  const state = reactive<BadgeState>({
    badges: {},
    badgeLoader: {}
  })

  const channel = ref<any>(null)

  const setBadgeValue = (linkName: string, value: string | number) => {
    state.badges[linkName] = value
  }

  const getBadgeValue = (linkName: string) => {
    return state.badges[linkName]
  }

  const setBadgesValue = async (headerLink: NavigationItem) => {
    if (!headerLink.badgeTotalUrl || !headerLink.linkName) return

    const response = await get(headerLink.badgeTotalUrl)
    if (response) {
      const data = response as any
      setBadgeValue(headerLink.linkName, data?.total || 0)
    }
  }

  const loadBadge = (headerLink: NavigationItem) => {
    if (!headerLink.linkName || !headerLink.badgeTotalUrl) return

    if (!state.badgeLoader[headerLink.linkName]) {
      const throttledFn = useThrottleFn(setBadgesValue, 2000)
      state.badgeLoader[headerLink.linkName] = throttledFn
    }

    state.badgeLoader[headerLink.linkName](headerLink)
  }

  const initBadge = (headerLink: NavigationItem, userId?: string) => {
    if (!headerLink.badgeTotalUrl || !headerLink.linkName) return

    loadBadge(headerLink)

    if (headerLink.badgeEvent && userId && pusher) {
      try {
        if (!channel.value) {
          channel.value = pusher.subscribe(`user.${userId}`)
        }

        channel.value.unbind(headerLink.badgeEvent)
        channel.value.bind(headerLink.badgeEvent, () => {
          loadBadge(headerLink)
        })
        
      } catch (error) {
        console.error(`Error configuring Pusher for ${headerLink.linkName}:`, error)
      }
    }
  }

  const initBadgesForLinks = (headerLinks: NavigationItem[], userId?: string) => {
    headerLinks.forEach(headerLink => initBadge(headerLink, userId))
  }

  return {
    setBadgeValue,
    getBadgeValue,
    initBadgesForLinks
  }
}
