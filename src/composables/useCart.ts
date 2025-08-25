import {ref, computed} from 'vue'
import {useThrottleFn} from '@vueuse/core'
import {useHttp} from './useHttp'
import type {CartData} from '@/types'

export function useCart() {
  const {get} = useHttp()

  const cartItemCount = ref<number>(0)

  const fetchCart = async (): Promise<void> => {
    try {
      const response = await get<CartData>('/cart/cart')

      if (response) {
        cartItemCount.value =
          response.itemCount || response.products?.length || 0
      }
    } catch (err) {
      console.error('Erro ao buscar dados do carrinho:', err)
    }
  }

  const throttledFetchCart = useThrottleFn(fetchCart, 2000)

  const loadCart = (): void => {
    throttledFetchCart()
  }

  return {
    cartItemCount: computed(() => cartItemCount.value),
    fetchCart,
    loadCart
  }
}
