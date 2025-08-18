import {reactive, toRefs} from 'vue'
import type {
  NavigationItem,
  NavigationSeparatorItem,
  NavigationItemOrSeparator,
  SiteMapItem
} from '@/types'

const isSeparator = (item: NavigationItemOrSeparator): item is NavigationSeparatorItem => {
  return 'separator' in item && item.separator === true
}

const state = reactive({
  navigationItems: [] as NavigationItemOrSeparator[],
  customNavigationItems: [] as NavigationItem[],
  siteMapItems: [] as SiteMapItem[]
})

const setNavigationItems = (
  items: NavigationItemOrSeparator[]
) => {
  state.navigationItems = items
  state.customNavigationItems = items.filter((item) => !isSeparator(item)) as NavigationItem[]
}

const setCustomNavigationItems = (items: NavigationItem[]) => {
  const updatedItems: (NavigationItem | NavigationSeparatorItem)[] = []
  let i = 0

  for (const item of state.navigationItems) {
    updatedItems.push(isSeparator(item) ? item : items[i++] ?? item)
  }

  state.customNavigationItems = items
  state.navigationItems = updatedItems
}


const setSiteMapItems = (items: SiteMapItem[]) => {
  state.siteMapItems = items
}

export function useNavigationStore() {
  return {
    ...toRefs(state),
    setNavigationItems,
    setCustomNavigationItems,
    setSiteMapItems
  }
}
