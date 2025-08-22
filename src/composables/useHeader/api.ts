import {useHttp} from '@/composables/useHttp'

type UseHttpReturn = ReturnType<typeof useHttp>
import type {GTM, ProfileItem, User} from '@/types'
import type {HeaderResponse, SiteMapResponse, UserDetails} from '@/types/header'
import {
  mapUserDetailsFromResponse,
  createProfileItemClickHandler
} from './mappers'

const API_ENDPOINTS = {
  USERS: {
    CURRENT: '/do/api/v1/users/GetCurrentUser',
    CHANGE_LANGUAGE: '/do/api/v1/users/ChangeLanguage'
  },
  HEADER: '/do/api/v2/header',
  SITEMAP: {
    DEFAULT: '/do/api/v1/sitemap',
    PDM: '/do/api/v1/sitemap/pdm'
  }
} as const

const HTTP_HEADERS = {
  NO_CACHE: {'Cache-Control': 'no-cache', Authorization: ''}
} as const

const ERROR_MESSAGES = {
  USER_DATA: 'Falha ao carregar dados do usuário', // refatorar
  NAVIGATION: 'Falha ao carregar dados de navegação',
  SITEMAP: 'Falha ao carregar sitemap',
  USER_DETAILS: 'Falha ao carregar detalhes do usuário'
} as const

const buildQueryString = (
  params: Record<string, string | number | Date>
): string => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value))
    }
  })

  return searchParams.toString()
}

const isPdmPath = (pathname: string): boolean =>
  pathname.includes('/MEPDM/') || pathname.includes('/PDM/')

export const loadUserData = async (
  get: UseHttpReturn['get'],
  setCustomToken: UseHttpReturn['setCustomToken']
): Promise<User> => {
  const data = await get<User>(API_ENDPOINTS.USERS.CURRENT)

  if (!data) {
    throw new Error(ERROR_MESSAGES.USER_DATA)
  }

  if (data.token?.accessToken && typeof data.token.accessToken === 'string') {
    setCustomToken(data.token.accessToken)
  }

  return data
}

export const loadHeaderData = async (
  get: UseHttpReturn['get'],
  userId: string,
  culture: string,
  lastAccess: Date | undefined
): Promise<HeaderResponse> => {
  const queryParams = {
    v: new Date(lastAccess || 0).getTime(),
    id: userId,
    lang: culture
  }

  const queryString = buildQueryString(queryParams)
  const url = `${API_ENDPOINTS.HEADER}?${queryString}`

  const response = await get<HeaderResponse>(url)

  if (!response) {
    throw new Error(ERROR_MESSAGES.NAVIGATION)
  }

  return response
}

export const loadSiteMapData = async (
  get: UseHttpReturn['get'],
  userId: string,
  culture: string,
  lastAccess: Date | undefined
): Promise<SiteMapResponse> => {
  const pathname = window.location.pathname
  const baseUrl = isPdmPath(pathname)
    ? API_ENDPOINTS.SITEMAP.PDM
    : API_ENDPOINTS.SITEMAP.DEFAULT

  const queryParams = {
    v: new Date(lastAccess || 0).getTime(),
    id: userId,
    lang: culture
  }

  const queryString = buildQueryString(queryParams)
  const url = `${baseUrl}?${queryString}`

  const response = await get<SiteMapResponse>(url)

  if (!response) {
    throw new Error(ERROR_MESSAGES.SITEMAP)
  }

  return response
}

export const loadUserDetails = async (
  get: UseHttpReturn['get']
): Promise<UserDetails> => {
  try {
    const response = await get<Record<string, unknown>>(
      API_ENDPOINTS.USERS.CURRENT,
      {headers: HTTP_HEADERS.NO_CACHE}
    )

    if (!response) {
      throw new Error(ERROR_MESSAGES.USER_DETAILS)
    }

    return mapUserDetailsFromResponse(response)
  } catch (error) {
    console.warn(
      'Erro ao carregar detalhes do usuário, usando valores padrão:',
      error
    )

    return {
      user: {} as UserDetails['user'],
      customer: {} as UserDetails['customer'],
      locale: '',
      token: '',
      permissions: {},
      precisions: {},
      links: [],
      virtualEntities: []
    }
  }
}

export const changeLocale = async (
  post: UseHttpReturn['post'],
  locale: string,
  gtm: GTM
): Promise<void> => {
  gtm.push({
    event: 'MS_perfilLocale',
    selectOp: locale
  })

  await post(API_ENDPOINTS.USERS.CHANGE_LANGUAGE, {culture: locale})
  window.location.reload()
}

export const mapProfileLinks = (
  profileItems: Record<string, unknown>[],
  gtm: GTM,
  onChangeLocale: (locale: string) => Promise<void>
): ProfileItem[] => {
  const handleProfileLinks = [...profileItems]
  const localeLinks = handleProfileLinks.find(item => item.name === 'locale')

  if (localeLinks?.children) {
    const handleLinks = (localeLinks.children as Record<string, unknown>[]).map(
      ({active, children, label, url}) => {
        const locale = (url as string)?.match(/[a-z]{2}-[A-Z]{2}/g)?.[0]

        return {
          active,
          children,
          label,
          click: locale ? () => onChangeLocale(locale) : undefined
        }
      }
    )

    handleProfileLinks.forEach(item => {
      if (item.name === 'locale') {
        item.children = handleLinks
      }
    })
  }

  return handleProfileLinks.map(item => {
    if (item.name === 'locale') {
      return {...item, children: item.children}
    }

    return {
      ...item,
      click: createProfileItemClickHandler(item, gtm)
    }
  }) as ProfileItem[]
}
