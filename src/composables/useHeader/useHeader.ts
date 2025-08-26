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
import {useTranslations} from '@/composables/useTranslations/useTranslations.ts'

export function useHeader(activeLinkName: string, gtm: GTM) {
  const {t} = useTranslations()
  const toast = useToast()
  const {get, post, setToken} = useHttp()
  const headerStore = useHeaderStore()
  const storeUser = toRef(headerStore, 'user')

  const handleUserDataLoad = async (): Promise<void> => {
    try {
      const userData = await loadUserData(get, setToken)
      headerStore.setUser(userData as unknown as User)
    } catch {
      toast.add({
        title: t('theHeader.apiErrors.generic'),
        color: 'error'
      })
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
      toast.add({
        title: t('theHeader.apiErrors.generic'),
        color: 'error'
      })
    }
  }

  const handleSiteMapLoad = async (): Promise<void> => {
    try {
      const response = await loadSiteMapData(
        get,
        storeUser.value.id,
        storeUser.value.culture ?? '',
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
      toast.add({
        title: t('theHeader.apiErrors.generic'),
        color: 'error'
      })
    }
  }

  const initializeData = async (): Promise<void> => {
    try {
      await handleUserDataLoad()
      await Promise.allSettled([
        handleNavigationItemsLoad(),
        handleSiteMapLoad()
      ])
    } catch {
      toast.add({
        title: t('theHeader.apiErrors.generic'),
        color: 'error'
      })
    }
  }

  return {
    initializeData
  }
}
