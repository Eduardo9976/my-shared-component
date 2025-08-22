import {toRef} from 'vue'
import {useHttp} from '../useHttp'
import {useHeaderStore} from '@/composables/useHeaderStore.ts'
import type {NavigationItem, GTM, User} from '@/types'
import {
  mapHeaderLinks,
  mapNavigationItems,
  mapSiteMapItems,
  siteMapChildrenMapper
} from './mappers.ts'
import {
  loadUserData,
  loadHeaderData,
  loadSiteMapData,
  changeLocale,
  mapProfileLinks
} from './api.ts'

const ERROR_STATUS = {
  FORBIDDEN: 403,
  UNAUTHORIZED: 401
} as const

const ERROR_MESSAGES = {
  FORBIDDEN: '⚠️ Acesso negado (403) - Usuário não autenticado, usando mock',
  UNAUTHORIZED: '⚠️ Não autorizado (401) - Token inválido, usando mock',
  GENERIC: '⚠️ Erro ao carregar dados do usuário:',
  HEADER_LOAD: '❌ Erro ao carregar dados do header:'
} as const

export function useHeader(activeLinkName: string, gtm: GTM) {
  const {get, post, setToken} = useHttp()
  const headerStore = useHeaderStore()
  const storeUser = toRef(headerStore, 'user')

  const handleUserDataError = (error: unknown): void => {
    const errorObj = error as {response?: {status?: number}; message?: string}

    if (errorObj?.response?.status === ERROR_STATUS.FORBIDDEN) {
      console.warn(ERROR_MESSAGES.FORBIDDEN)
    } else if (errorObj?.response?.status === ERROR_STATUS.UNAUTHORIZED) {
      console.warn(ERROR_MESSAGES.UNAUTHORIZED)
    } else {
      console.warn(
        ERROR_MESSAGES.GENERIC,
        errorObj?.message || 'Erro desconhecido',
        'usando mock'
      )
    }
  }

  const handleUserDataLoad = async (): Promise<void> => {
    try {
      const userData = await loadUserData(get, setToken)
      headerStore.setUser(userData as unknown as User)
    } catch (error) {
      handleUserDataError(error)
    }
  }

  const handleNavigationItemsLoad = async (): Promise<void> => {
    try {
      const response = await loadHeaderData(
        get,
        headerStore.user.value.id,
        headerStore.user.value.culture ?? '',
        storeUser.value.lastAccess
      )

      headerStore.setUser({
        ...headerStore.user.value,
        ...response.user
      })

      const mappedNavigationItems = mapNavigationItems(
        response.navItems,
        activeLinkName,
        gtm
      ) as NavigationItem[]

      headerStore.setNavigationItems(mappedNavigationItems)
      headerStore.setHeaderLinks(mapHeaderLinks(response.navItems, gtm))
      headerStore.setBrand(response.brand)

      const handleChangeLocale = async (locale: string): Promise<void> => {
        await changeLocale(post, locale, gtm)
      }

      const mappedProfileItems = mapProfileLinks(
        response.profileItems as unknown as Record<string, unknown>[],
        gtm,
        handleChangeLocale
      )

      headerStore.setProfileItems(mappedProfileItems)
    } catch {
      console.warn('Não foi possível carregar itens de navegação, usando mock')
    }
  }

  const handleSiteMapLoad = async (): Promise<void> => {
    try {
      const response = await loadSiteMapData(
        get,
        storeUser.value.id,
        storeUser.value.culture || '',
        storeUser.value.lastAccess
      )

      siteMapChildrenMapper(
        response as unknown as Record<string, unknown>,
        response.name,
        gtm
      )

      const mappedSiteMapItems = mapSiteMapItems(
        response.children as unknown as Record<string, unknown>[],
        response.name,
        gtm
      )

      headerStore.setSiteMapItems(mappedSiteMapItems)
    } catch {
      console.warn('Não foi possível carregar sitemap, usando mock')
    }
  }

  const initializeData = async (): Promise<void> => {
    try {
      await handleUserDataLoad()
      await Promise.allSettled([
        handleNavigationItemsLoad(),
        handleSiteMapLoad()
      ])
    } catch (error) {
      console.error(ERROR_MESSAGES.HEADER_LOAD, error)
    }
  }

  return {
    initializeData
  }
}
