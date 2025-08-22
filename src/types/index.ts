export interface BrandBackground {
  primaryColor?: string
  secondaryColor?: string
  mainImage?: string
  repeatImage?: string
}

export interface Brand {
  logo: string
  link: string
  newTab: boolean
  iconColor?: string
  background?: BrandBackground
}

export interface NavigationItem {
  id?: string
  icon: string | null
  label: string | null
  active?: boolean
  click?: (item: NavigationItem) => void
  siteMap?: boolean | null
  linkName?: string | null
  url?: string | null
  target?: string | null
  badgeTotalUrl?: string | null
  badgeEvent?: string | null
  badge?: {
    text: string
  } | null
  visible?: boolean
}
export interface NavigationSeparatorItem {
  separator?: boolean
}

export type NavigationItemOrSeparator = NavigationItem | NavigationSeparatorItem

export interface User {
  id: string
  name: string
  role?: string
  email?: string
  acronym: string
  culture?: string
  lastAccess?: Date
  token?: {
    accessToken: string
    refreshToken: string
    expiresIn: number
    kcAccessToken?: string | null
  }
  badge: {
    variant: string
    icon: string
  }
}

export interface ProfileItem {
  $id?: string
  label?: string
  click?: () => void
  url?: string | null
  icon?: {
    class: string
    color: string
  } | null
  active?: boolean
  name?: string | null
  children?: ProfileItem[] | null
  target?: string | null
}

export interface SiteMapItem {
  id: string
  name: string
  description: string
  url?: string
  target?: string | null
  children: SiteMapItem[]
}

export interface HeaderBackdrop {
  show: (zIndex?: number) => void
  close: () => void
  state: {visible: boolean; zIndex: number}
}

export type GTM = {
  push: (data: Record<string, unknown>) => void
}

export type PusherInstance = {
  subscribe: (channel: string) => any
  unsubscribe: (channel: string) => void
}

export * from './http'
export * from './header'
