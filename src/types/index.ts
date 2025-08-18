export interface BrandBackground {
  primaryColor?: string
  secondaryColor?: string
  iconColor?: string
  mainImage?: string
  repeatImage?: string
}

export interface Brand {
  logo: string
  link: string
  newTab: boolean
  background?: BrandBackground
}

export interface NavigationItem {
  id: string
  icon: string | null
  label: string | null
  active?: boolean
  click?: (item: NavigationItem) => void
  siteMap?: boolean | null
  linkName: string | null
  url?: string | null
  target?: string | null
  badgeTotalUrl?: string | null
  badgeEvent?: string | null
  visible?: boolean
}
export interface NavigationSeparatorItem {
  separator?: boolean
}

export type NavigationItemOrSeparator = NavigationItem | NavigationSeparatorItem

export interface User {
  name: string
  role?: string
  email?: string
  acronym: string
  badge: {
    variant: string
    icon: string
  }
}

export interface ProfileItem {
  label?: string
  click?: () => void
  url?: string
  icon?: {
    class: string
    color: string
  }
  active?: boolean
  children?: ProfileItem[]
}

export interface SiteMapItem {
  id: string
  name: string
  description: string
  url?: string
  children: SiteMapItem[]
}

export interface HeaderBackdrop {
  show: (zIndex?: number) => void
  close: () => void
  state: {visible: boolean; zIndex: number}
}
