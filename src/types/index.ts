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
  icon: string
  label: string
  active?: boolean
  click?: (item: NavigationItem) => void
  siteMap?: boolean
}
export interface NavigationSeparatorItem {
  separator?: boolean
}

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

export interface HeaderBackdrop {
  show: (zIndex?: number) => void
  close: () => void
  state: { visible: boolean; zIndex: number }
}
