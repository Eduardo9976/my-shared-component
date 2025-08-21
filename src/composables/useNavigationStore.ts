import {reactive, toRefs} from 'vue'
import type {
  NavigationItem,
  NavigationSeparatorItem,
  NavigationItemOrSeparator,
  SiteMapItem, User, Brand, ProfileItem
} from '@/types'

const state = reactive({
  user: {} as User,
  navigationItems: [] as NavigationItemOrSeparator[],
  customNavigationItems: [] as NavigationItem[],
  siteMapItems: [] as SiteMapItem[],
  brand: {} as Brand,
  profileItems: [] as ProfileItem[]
})

function setUser(user: User) {
  state.user = {
    ...user
  }
}

function setBrand(brand: Brand) {
  state.brand = {
    ...brand
  }
}

function setProfileItems(items: ProfileItem[]) {
  state.profileItems = items
}

function isSeparator(
  item: NavigationItemOrSeparator
): item is NavigationSeparatorItem {
  return 'separator' in item && item.separator === true
}

function setNavigationItems(items: NavigationItemOrSeparator[]) {
  state.navigationItems = items
  state.customNavigationItems = items.filter(
    item => !isSeparator(item)
  ) as NavigationItem[]
}

function setCustomNavigationItems(items: NavigationItem[]) {
  const updatedItems: (NavigationItem | NavigationSeparatorItem)[] = []
  let i = 0

  for (const item of state.navigationItems) {
    updatedItems.push(isSeparator(item) ? item : (items[i++] ?? item))
  }

  state.customNavigationItems = items
  state.navigationItems = updatedItems
}

function setSiteMapItems(items: SiteMapItem[]) {
  state.siteMapItems = items
}

function findNavigationItemById(id: string): NavigationItem | undefined {
  const foundItem = state.navigationItems.find(
    navItem => !isSeparator(navItem) && navItem.id === id
  )
  return foundItem as NavigationItem | undefined
}

function updateNavigationItemsVisible(item: NavigationItem, visible: boolean) {
  if (!item.id) return

  const targetItem = findNavigationItemById(item.id)

  if (targetItem) {
    targetItem.visible = visible
    state.navigationItems = [...state.navigationItems]
  }
}

export function useNavigationStore() {
  return {
    ...toRefs(state),
    setUser,
    setNavigationItems,
    setCustomNavigationItems,
    setSiteMapItems,
    setBrand,
    setProfileItems,
    isSeparator,
    updateNavigationItemsVisible
  }
}
