import type {NavigationItem, User, ProfileItem} from './index'

export type NavItem = NavigationItem & {$id: string}

export type HeaderResponse = {
  user: User
  navItems: NavItem[]
  brand: Brand
  profileItems: ProfileItem[]
}

export type SiteMapResponse = {
  name: string
  children: SiteMapItem[]
}

export type Customer = {
  idMain: string
  registrationCompleted: boolean
  header?: {
    appsUrls: {
      users: string
    }
    logo: string
    iconColor: string
    background: {
      mainImage: string
      repeatImage: string
      primaryColor: string
      secondaryColor: string
    }
  }
}

export type UserDetails = {
  user: User
  customer: Customer
  locale: string
  token: string
  permissions: Record<string, unknown>
  precisions: Record<string, unknown>
  links: unknown[]
  virtualEntities: unknown[]
}

export type Brand = {
  logo: string
  link: string
  newTab: boolean
  iconColor?: string
  background?: {
    primaryColor?: string
    secondaryColor?: string
    mainImage?: string
    repeatImage?: string
  }
}

export type SiteMapItem = {
  id: string
  name: string
  description: string
  url?: string
  target?: string | null
  children: SiteMapItem[]
  click?: () => void
}
