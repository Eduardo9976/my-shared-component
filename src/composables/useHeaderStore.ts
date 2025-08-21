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

const setUser = (user: User): void => {
  state.user = {...user}
}

const setBrand = (brand: Brand): void => {
  state.brand = {...brand}
}

const setProfileItems = (items: ProfileItem[]): void => {
  state.profileItems = items
}

const setHeaderLinks = (headerLinks: HeaderLink[]): void => {
  state.headerLinks = headerLinks
}

const setNavigationItems = (items: NavigationItemOrSeparator[]): void => {
  state.navigationItems = items
  state.customNavigationItems = navigationItemsWithoutSeparators.value
}

const setCustomNavigationItems = (items: NavigationItem[]): void => {
  const updatedItems: (NavigationItem | NavigationSeparatorItem)[] = []
  let itemIndex = 0

  for (const currentItem of state.navigationItems) {
    updatedItems.push(
      isSeparator(currentItem)
        ? currentItem
        : (items[itemIndex++] ?? currentItem)
    )
  }

  state.customNavigationItems = items
  state.navigationItems = updatedItems
}

const setSiteMapItems = (items: SiteMapItem[]): void => {
  state.siteMapItems = items
}

const findNavigationItemById = (id: string): NavigationItem | undefined => {
  if (!id) return undefined

  return state.navigationItems.find(
    item => !isSeparator(item) && item.id === id
  ) as NavigationItem | undefined
}

const updateNavigationItemsVisible = (
  item: NavigationItem,
  visible: boolean
): void => {
  if (!item.id) return

  const targetItem = findNavigationItemById(item.id)
  if (targetItem) {
    targetItem.visible = visible
    state.navigationItems = [...state.navigationItems]
  }
}

const resetState = (): void => {
  Object.assign(state, initialState)
}

export function useHeaderStore() {
  return {
    ...toRefs(state),
    navigationItemsWithoutSeparators,
    setUser,
    setBrand,
    setProfileItems,
    setHeaderLinks,
    setNavigationItems,
    setCustomNavigationItems,
    setSiteMapItems,
    isSeparator,
    findNavigationItemById,
    updateNavigationItemsVisible,
    resetState
  }
}
