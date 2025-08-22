import {reactive, toRefs, computed} from 'vue'
import type {
  NavigationItem,
  NavigationSeparatorItem,
  NavigationItemOrSeparator,
  SiteMapItem,
  User,
  Brand,
  ProfileItem
} from '@/types'
import { useBadgeManager } from './useBadgeManager'
import type { PusherInstance } from '@/types'

export interface HeaderLink extends NavigationItem {
  url: string | null
  click?: (item: NavigationItem) => void
}

interface HeaderState {
  user: User
  navigationItems: NavigationItemOrSeparator[]
  customNavigationItems: NavigationItem[]
  siteMapItems: SiteMapItem[]
  brand: Brand
  profileItems: ProfileItem[]
  headerLinks: HeaderLink[]
}

const initialState: HeaderState = {
  user: {} as User,
  navigationItems: [],
  customNavigationItems: [],
  siteMapItems: [],
  brand: {} as Brand,
  profileItems: [],
  headerLinks: []
}

const state = reactive<HeaderState>(initialState)

const navigationItemsWithoutSeparators = computed(
  () =>
    state.navigationItems.filter(item => !isSeparator(item)) as NavigationItem[]
)

const isSeparator = (
  item: NavigationItemOrSeparator
): item is NavigationSeparatorItem =>
  'separator' in item && item.separator === true

const setUser = (user: User, pusher?: PusherInstance): void => {
  state.user = {...user}
  
  if (user.id && state.headerLinks.length > 0) {
    const { initBadgesForLinks } = useBadgeManager(pusher)
    initBadgesForLinks(state.headerLinks, user.id)
  }
}

const setBrand = (brand: Brand): void => {
  state.brand = {...brand}
}

const setProfileItems = (items: ProfileItem[]): void => {
  state.profileItems = items
}

const setNavigationItems = (items: NavigationItemOrSeparator[]): void => {
  state.navigationItems = items
  state.customNavigationItems = navigationItemsWithoutSeparators.value
}

const setSiteMapItems = (items: SiteMapItem[]): void => {
  state.siteMapItems = items
}

const setHeaderLinks = (headerLinks: HeaderLink[], pusher?: PusherInstance): void => {
  state.headerLinks = headerLinks
  
  if (state.user.id) {
    const { initBadgesForLinks } = useBadgeManager(pusher)
    initBadgesForLinks(headerLinks, state.user.id)
  }
}

const updateBadgeValue = (linkName: string, value: string | number): void => {
  const { setBadgeValue } = useBadgeManager()
  setBadgeValue(linkName, value)
}

const getBadgeValue = (linkName: string): string | number | undefined => {
  const { getBadgeValue: getBadge } = useBadgeManager()
  return getBadge(linkName)
}

export function useHeaderStore() {
  return {
    ...toRefs(state),
    navigationItemsWithoutSeparators,
    setUser,
    setBrand,
    setProfileItems,
    setNavigationItems,
    setSiteMapItems,
    setHeaderLinks,
    isSeparator,
    updateBadgeValue,
    getBadgeValue
  }
}
