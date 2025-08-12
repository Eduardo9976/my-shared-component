// Brand related types
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

// Navigation related types
export interface NavigationItem {
  iconName: string
  label: string
  route?: string
}

// Export all types for easy importing
export type {BrandBackground, Brand, NavigationItem}
