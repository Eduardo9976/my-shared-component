import {reactive, toRefs} from 'vue'
import type {
  NavigationItem,
  NavigationSeparatorItem,
  SiteMapItem
} from '@/types'

const state = reactive({
  navigationItems: [] as (NavigationItem | NavigationSeparatorItem)[],
  siteMapItems: [] as SiteMapItem[]
})

const setNavigationItems = (
  items: (NavigationItem | NavigationSeparatorItem)[]
) => {
  state.navigationItems = items
}

const setSiteMapItems = (items: SiteMapItem[]) => {
  state.siteMapItems = items
}

export function useNavigationStore() {
  return {
    ...toRefs(state),
    setNavigationItems,
    setSiteMapItems
  }
}
