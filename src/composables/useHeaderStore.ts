import {reactive, toRefs, computed} from 'vue'
import type {
  NavigationItem,
  NavigationSeparatorItem,
  NavigationItemOrSeparator,
  SiteMapItem,
  User,
  Brand,
  ProfileItem,
  PusherInstance,
  CartNavItem
} from '@/types'
import {useBadgeManager} from './useBadgeManager'
import {
  useTranslations,
  type SupportedLocale
} from './useTranslations/useTranslations'

interface HeaderState {
  user: User
  navigationItems: NavigationItemOrSeparator[]
  customNavigationItems: NavigationItem[]
  siteMapItems: SiteMapItem[]
  brand: Brand
  profileItems: ProfileItem[]
  headerLinks: NavigationItem[]
  badges: Record<string, string | number>
  showCart: boolean
  cartNavItem: CartNavItem | null
}

const initialState: HeaderState = {
  user: {} as User,
  navigationItems: [],
  customNavigationItems: [],
  siteMapItems: [],
  brand: {} as Brand,
  profileItems: [],
  headerLinks: [],
  badges: {},
  showCart: false,
  cartNavItem: null
}

const state = reactive<HeaderState>(initialState)

let badgeManagerInstance: ReturnType<typeof useBadgeManager> | null = null

const getBadgeManager = (pusher?: PusherInstance) => {
  badgeManagerInstance ??= useBadgeManager(
    pusher,
    (linkName: string, value: string | number) => {
      state.badges[linkName] = value
    }
  )
  return badgeManagerInstance
}

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
    const badgeManager = getBadgeManager(pusher)
    badgeManager.initBadgesForLinks(state.headerLinks, user.id)
  }
}

const setBrand = (brand: Brand): void => {
  state.brand = brand
}

const setProfileItems = (profileItems: ProfileItem[]): void => {
  state.profileItems = profileItems
}

const setNavigationItems = (navigationItems: NavigationItemOrSeparator[]): void => {
  state.navigationItems = navigationItems
}

const setSiteMapItems = (siteMapItems: SiteMapItem[]): void => {
  state.siteMapItems = siteMapItems
}

const setHeaderLinks = (headerLinks: NavigationItem[], pusher?: PusherInstance): void => {
  state.headerLinks = headerLinks

  if (state.user.id && headerLinks.length > 0) {
    const badgeManager = getBadgeManager(pusher)
    badgeManager.initBadgesForLinks(headerLinks, state.user.id)
  }
}

const updateBadgeValue = (linkName: string, value: string | number): void => {
  const badgeManager = getBadgeManager()
  badgeManager.setBadgeValue(linkName, value)
  state.badges[linkName] = value
}

const getBadgeValue = (linkName: string): string | number | undefined => {
  return state.badges[linkName]
}

const setShowCart = (show: boolean): void => {
  state.showCart = show
}

const createCartNavItem = (): CartNavItem => {
  const {t, setLocale} = useTranslations()

  if (state.user.culture) {
    setLocale(state.user.culture as SupportedLocale)
  }

  return {
    id: '00',
    active: false,
    icon: 'me-icon-l icon-cart-shopping',
    label: t('theHeader.cart.label'),
    linkName: t('theHeader.cart.linkName'),
    separator: false,
    siteMap: false,
    target: null,
    url: null,
    click: () => null,
    visible: true,
    badge: {
      text: 0
    }
  }
}

const updateCartBadge = (count: number): void => {
  if (state.cartNavItem) {
    state.cartNavItem.badge = {
      text: count
    }
  }
}

// Interface interna para rastrear cultura
interface CartNavItemWithCulture extends CartNavItem {
  _culture?: string
}

const getCartNavItem = (): CartNavItem | null => {
  if (!state.showCart) {
    return null
  }

  if (state.cartNavItem && state.user.culture) {
    const currentCulture = state.user.culture
    const itemCulture = (state.cartNavItem as CartNavItemWithCulture)._culture
    
    if (itemCulture !== currentCulture) {
      state.cartNavItem = null
    }
  }

  if (state.cartNavItem) {
    return state.cartNavItem
  }

  const cartItem = createCartNavItem()
  
  if (state.user.culture) {
    (cartItem as CartNavItemWithCulture)._culture = state.user.culture
  }
  
  state.cartNavItem = cartItem
  return cartItem
}

const refreshCart = (): void => {
  // Será implementado no componente
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
    getBadgeValue,
    setShowCart,
    getCartNavItem,
    refreshCart,
    updateCartBadge
  }
}
