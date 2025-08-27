import {ref, computed} from 'vue'
import {useThrottleFn} from '@vueuse/core'
import {useHttp} from './useHttp'
import {useTranslations} from './useTranslations/useTranslations'
import type {CartData, NavigationItemOrSeparator} from '@/types'

const cartItemCount = ref<string>('')

const updateCartItemCount = (value: string | number): void => {
  cartItemCount.value = String(value)
}

export function useCart() {
  const {get} = useHttp()
  const {t} = useTranslations()
  const toast = useToast()

  const fetchCart = async (): Promise<void> => {
    try {
      const response = await get<CartData>('/cart/cart')

      if (response?.products && response.products.length > 0) {
        updateCartItemCount(response.products.length)
      }
    } catch {
      toast.add({
        title: t('theHeader.apiErrors.cart'),
        color: 'error'
      })
    }
  }

  const throttledFetchCart = useThrottleFn(fetchCart, 2000)

  const loadCart = (): void => {
    throttledFetchCart()
  }

  const cartNavItem = computed((): NavigationItemOrSeparator => {
    return {
      id: '00',
      active: false,
      icon: 'me-icon-l icon-cart-shopping',
      label: t('theHeader.cart.label'),
      linkName: t('theHeader.cart.linkName'),
      separator: false,
      siteMap: false,
      target: null,
      click: () => null,
      visible: true,
      badge: {
        text: cartItemCount.value
      }
    }
  })

  return {
    cartNavItem,
    loadCart,
    updateCartItemCount
  }
}
