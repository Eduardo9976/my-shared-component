import {toRef} from 'vue'
import {useHttp} from './useHttp'
import {useNavigationStore} from '@/composables/useNavigationStore'
import type {
  Brand,
  User,
  ProfileItem,
  NavigationItem,
  SiteMapItem,
  GTM
} from '@/types'

type NavItem = NavigationItem & {$id: string}

type getHeaderResponse = {
  user: User
  navItems: NavItem[]
  brand: Brand
  profileItems: ProfileItem[]
}

type getSetMapResponse = {
  name: string
  children: SiteMapItem[]
}

export function useHeaderData(activeLinkName: string, gtm: GTM) {
  const {get, post, setCustomToken} = useHttp()

  const navigationStore = useNavigationStore()

  const storeUser = toRef(navigationStore, 'user')

  // const cartItems = ref<unknown[]>([])
  // const badges = ref<Record<string, number>>({})

  const loadUserData = async () => {
    try {
      const data = await get<User>('/do/api/v1/users/GetCurrentUser')

      if (!data) {
        throw new Error('Falha ao carregar dados do usuário')
      }

      if (
        data.token?.accessToken &&
        typeof data.token.accessToken === 'string'
      ) {
        setCustomToken(data.token.accessToken)
      }

      navigationStore.setUser(data)
    } catch (error: unknown) {
      const errorObj = error as {response?: {status?: number}; message?: string}
      if (errorObj?.response?.status === 403) {
        console.warn(
          '⚠️ Acesso negado (403) - Usuário não autenticado, usando mock'
        )
      } else if (errorObj?.response?.status === 401) {
        console.warn('⚠️ Não autorizado (401) - Token inválido, usando mock')
      } else {
        console.warn(
          '⚠️ Erro ao carregar dados do usuário:',
          errorObj?.message || 'Erro desconhecido',
          'usando mock'
        )
      }
    }
  }

  const createNavItemClickHandler = (navItem: NavItem, gtm: GTM) => {
    if (!navItem.siteMap && !navItem.url) return null

    return () => {
      if (navItem.siteMap) {
        gtm.push({event: 'MS_maisBuscar'})
        return
      }

      gtm.push({
        event: 'MS_telasPrincipais',
        selectOp: navItem.linkName
      })

      window.location.href = navItem.url!
    }
  }

  const createSiteMapItemClickHandler = (
    item: Record<string, unknown>,
    parentCategory: string,
    gtm: GTM
  ) => {
    if (!item.url) return undefined

    return () => {
      gtm.push({
        event: 'MS_maisOpcao',
        categoria: parentCategory,
        selectOp: (item.description as string) ?? (item.name as string)
      })

      window.location.href = item.url as string
    }
  }

  const mapSiteMapItems = (
    items: Record<string, unknown>[],
    parentCategory: string,
    gtm: GTM
  ): SiteMapItem[] => {
    return items.map(item => {
      const hasChildren =
        (item.children as Record<string, unknown>[])?.length > 0
      const nextParentCategory =
        (item.description as string) ?? (item.name as string)

      return {
        id: item.$id as string,
        name: item.name as string,
        description: item.description as string,
        url: item.url as string,
        click: createSiteMapItemClickHandler(item, parentCategory, gtm),
        children: hasChildren
          ? mapSiteMapItems(
              item.children as Record<string, unknown>[],
              nextParentCategory,
              gtm
            )
          : []
      }
    })
  }

  const mapNavigationItems = (
    navItems: NavItem[],
    activeLinkName: string,
    gtm: GTM
  ) => {
    return navItems.map(item => {
      const {$id, ...rest} = item
      const isActive =
        rest.linkName?.toLowerCase() === activeLinkName?.toLowerCase()
      const isVisible = item.visible ?? true

      return {
        ...rest,
        active: isActive,
        click: createNavItemClickHandler(item, gtm),
        id: $id,
        visible: isVisible
      }
    })
  }

  const createProfileItemClickHandler = (
    profileItem: Record<string, unknown>,
    gtm: GTM
  ) => {
    if (!profileItem.url || profileItem.name === 'locale') return undefined

    return () => {
      gtm.push({
        event: 'MS_perfilOpcao',
        selectOp: profileItem.label as string
      })

      window.location.href = profileItem.url as string
    }
  }

  const changeLocale = async (locale: string, gtm: GTM) => {
    try {
      gtm.push({
        event: 'MS_perfilLocale',
        selectOp: locale
      })

      await post('/do/api/v1/users/ChangeLanguage', {culture: locale})

      navigationStore.setUser({
        ...navigationStore.user.value,
        culture: locale
      })

      window.location.reload()
    } catch (error) {
      console.error('Erro ao mudar idioma:', error)
    }
  }

  const createLocaleItemClickHandler = (
    child: Record<string, unknown>,
    gtm: GTM
  ) => {
    const locale = (child.url as string)?.match(/[a-z]{2}-[A-Z]{2}/g)?.[0]

    if (!locale) return undefined

    return () => {
      changeLocale(locale, gtm)
    }
  }

  const mapProfileItems = (
    profileItems: Record<string, unknown>[],
    gtm: GTM
  ): ProfileItem[] => {
    return profileItems.map(item => {
      if (item.name === 'locale') {
        return {
          ...item,
          children:
            (item.children as Record<string, unknown>[])?.map(
              (child: Record<string, unknown>) => ({
                ...child,
                click: createLocaleItemClickHandler(child, gtm)
              })
            ) ?? []
        }
      }

      return {
        ...item,
        click: createProfileItemClickHandler(item, gtm)
      }
    })
  }

  const loadNavigationItems = async () => {
    try {
      const query = `?v=${new Date(storeUser.value.lastAccess || 0).getTime()}&id=${navigationStore.user.value.id}&lang=${navigationStore.user.value.culture}`

      const response = await get<getHeaderResponse>(`/do/api/v2/header${query}`)

      if (!response) {
        throw new Error('Falha ao carregar dados de navegação')
      }

      navigationStore.setUser({
        ...navigationStore.user.value,
        ...response.user
      })

      navigationStore.setNavigationItems(
        mapNavigationItems(
          response.navItems,
          activeLinkName,
          gtm
        ) as NavigationItem[]
      )

      navigationStore.setBrand(response.brand)

      const mappedProfileItems = mapProfileItems(
        response.profileItems as unknown as Record<string, unknown>[],
        gtm
      )
      navigationStore.setProfileItems(mappedProfileItems)
    } catch {
      console.warn('Não foi possível carregar itens de navegação, usando mock')
    }
  }

  const loadSiteMap = async () => {
    try {
      const pathname = window.location.pathname
      const isPdm = pathname.includes('/MEPDM/') || pathname.includes('/PDM/')

      const url = isPdm ? '/do/api/v1/sitemap/pdm' : '/do/api/v1/sitemap'
      const query = `?v=${new Date(storeUser.value.lastAccess || 0).getTime()}&id=${storeUser.value.id}&lang=${storeUser.value.culture}`

      const response = await get<getSetMapResponse>(`${url}${query}`)

      if (!response) {
        throw new Error('Falha ao carregar sitemap')
      }

      const mappedSiteMapItems = mapSiteMapItems(
        response.children as unknown as Record<string, unknown>[],
        response.name as string,
        gtm
      )

      navigationStore.setSiteMapItems(mappedSiteMapItems)
    } catch {
      console.warn('Não foi possível carregar sitemap, usando mock')
    }
  }

  // const loadCartItems = async () => {
  //   try {
  //     const response = await get<{ data: { products: unknown[] } }>('/cart/cart')
  //     if (response) {
  //       cartItems.value = response.data?.products || []
  //     }
  //   } catch {
  //     console.warn('Não foi possível carregar itens do carrinho, usando mock')
  //     cartItems.value = []
  //   }
  // }

  // const loadBadgeValue = async (badgeUrl: string, linkName: string) => {
  //   try {
  //     const response = await get<{ data: { total: number } }>(badgeUrl)
  //     if (response) {
  //       badges.value[linkName] = response.data?.total || 0
  //     }
  //   } catch {
  //     console.warn(`Não foi possível carregar badge para ${linkName}`)
  //   }
  // }

  // const loadAllBadges = async () => {
  //   const badgePromises = navItems.value
  //     .filter(item => item.badgeTotalUrl)
  //     .map(item => loadBadgeValue(item.badgeTotalUrl!, item.id!))
  //
  //   await Promise.allSettled(badgePromises)
  // }

  const initializeData = async () => {
    try {
      // Primeiro carrega os dados do usuário
      await loadUserData()

      // Depois carrega os dados que dependem do usuário
      await Promise.allSettled([
        loadNavigationItems(),
        loadSiteMap()
        // loadCartItems(),
        // loadAllBadges()
      ])
    } catch (error) {
      console.error('❌ Erro ao carregar dados do header:', error)
    }
  }

  return {
    initializeData
  }
}
