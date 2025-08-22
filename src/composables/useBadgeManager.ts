import { ref, reactive } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import type { NavigationItem, PusherInstance } from '@/types'
import { useHttp } from './useHttp'

interface BadgeState {
  badges: Record<string, string | number>
  badgeLoader: Record<string, any>
}

const globalState = reactive<BadgeState>({
  badges: {},
  badgeLoader: {}
})

const globalChannel = ref<any>(null)

export function useBadgeManager(pusher?: PusherInstance, onBadgeChange?: (linkName: string, value: string | number) => void) {
  const { get } = useHttp()

  const setBadgeValue = (linkName: string, value: string | number) => {
    globalState.badges[linkName] = value

    if (onBadgeChange) {
      onBadgeChange(linkName, value)
    }
  }

  const getBadgeValue = (linkName: string) => {
    return globalState.badges[linkName]
  }

  const setBadgesValue = async (headerLink: NavigationItem) => {
    if (!headerLink.badgeTotalUrl || !headerLink.linkName) return

    const response = await get(headerLink.badgeTotalUrl.replace('https://trunk.api.web.mercadoe.com', '')) // remover replace, usado no proxy
    if (response) {
      const data = response as any
      setBadgeValue(headerLink.linkName, data?.total ?? 0)
    }
  }

  const loadBadge = (headerLink: NavigationItem) => {
    if (!headerLink.linkName || !headerLink.badgeTotalUrl) return

    globalState.badgeLoader[headerLink.linkName] ??= useThrottleFn(setBadgesValue, 2000);

    globalState.badgeLoader[headerLink.linkName](headerLink)
  }

  const initBadge = (headerLink: NavigationItem, userId?: string) => {
    if (!headerLink.badgeTotalUrl || !headerLink.linkName) return

    loadBadge(headerLink)

    if (headerLink.badgeEvent && userId && pusher) {
      try {
        globalChannel.value ??= pusher.subscribe(`user.${userId}`);

        globalChannel.value.unbind(headerLink.badgeEvent)
        globalChannel.value.bind(headerLink.badgeEvent, () => {
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
