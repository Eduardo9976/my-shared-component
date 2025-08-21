import type {GTM} from '@/types'
import type {HeaderLink} from '@/composables/useHeaderStore'
import type {NavItem, SiteMapItem, Customer, UserDetails} from '@/types/header'

const GTM_EVENTS = {
  MAIS_BUSCAR: 'MS_maisBuscar',
  TELAS_PRINCIPAIS: 'MS_telasPrincipais',
  MAIS_OPCAO: 'MS_maisOpcao',
  PERFIL_OPCAO: 'MS_perfilOpcao'
} as const

export const createNavItemClickHandler = (navItem: NavItem, gtm: GTM) => {
  if (navItem.siteMap) {
    return () => gtm.push({event: GTM_EVENTS.MAIS_BUSCAR})
  }

  if (navItem.url) {
    return () => {
      gtm.push({
        event: GTM_EVENTS.TELAS_PRINCIPAIS,
        selectOp: navItem.linkName
      })
      window.location.href = navItem.url!
    }
  }

  return undefined
}

export const createSiteMapClickHandler = (
  item: Record<string, unknown>,
  parentCategory: string,
  gtm: GTM
) => {
  if (!item.url) return undefined

  return () => {
    gtm.push({
      event: GTM_EVENTS.MAIS_OPCAO,
      categoria: parentCategory,
      selectOp: (item.description as string) ?? (item.name as string)
    })
    window.location.href = item.url as string
  }
}

export const createProfileItemClickHandler = (
  profileItem: Record<string, unknown>,
  gtm: GTM
) => {
  if (!profileItem.url || profileItem.name === 'locale') return undefined

  return () => {
    gtm.push({
      event: GTM_EVENTS.PERFIL_OPCAO,
      selectOp: profileItem.label as string
    })
    window.location.href = profileItem.url as string
  }
}

export const mapHeaderLinks = (navItems: NavItem[], gtm: GTM): HeaderLink[] =>
  navItems.map(({$id, ...rest}) => ({
    ...rest,
    id: $id || undefined,
    url: null,
    click: createNavItemClickHandler({$id, ...rest}, gtm)
  }))

export const mapSiteMapItems = (
  items: Record<string, unknown>[],
  parentCategory: string,
  gtm: GTM
): SiteMapItem[] =>
  items.map(item => {
    const hasChildren = (item.children as Record<string, unknown>[])?.length > 0
    const nextParentCategory =
      (item.description as string) ?? (item.name as string)

    return {
      id: item.$id as string,
      name: item.name as string,
      description: item.description as string,
      url: (item.url as string) || '',
      click: createSiteMapClickHandler(item, parentCategory, gtm),
      children: hasChildren
        ? mapSiteMapItems(
            item.children as Record<string, unknown>[],
            nextParentCategory,
            gtm
          )
        : []
    }
  })

export const siteMapChildrenMapper = (
  data: Record<string, unknown>,
  parent: string | null,
  gtm: GTM
): Record<string, unknown> => ({
  ...data,
  children:
    (data.children as Record<string, unknown>[])?.map(
      (childOption): Record<string, unknown> => {
        if ((childOption.children as Record<string, unknown>[])?.length) {
          return {
            ...siteMapChildrenMapper(
              childOption,
              (childOption.description as string) ??
                (childOption.name as string),
              gtm
            )
          }
        }

        return {
          ...childOption,
          url: null,
          click: childOption.url
            ? () => {
                gtm.push({
                  event: GTM_EVENTS.MAIS_OPCAO,
                  categoria: parent || '',
                  selectOp: childOption.description as string
                })
                window.location.href = childOption.url as string
              }
            : null
        }
      }
    ) || []
})

export const mapNavigationItems = (
  navItems: NavItem[],
  activeLinkName: string,
  gtm: GTM
) =>
  navItems.map(({$id, ...rest}) => ({
    ...rest,
    active: rest.linkName?.toLowerCase() === activeLinkName?.toLowerCase(),
    click: createNavItemClickHandler({$id, ...rest}, gtm),
    id: $id,
    visible: rest.visible ?? true
  }))

export const mapUserDetailsFromResponse = (
  response: Record<string, unknown>
): UserDetails => {
  const user = {
    id: response.id as string,
    name: response.fullName as string,
    role: response.profile as string,
    acronym:
      ((response.header as Record<string, unknown>)?.nameInitials as string) ||
      '',
    culture: response.culture as string,
    lastAccess: new Date((response.lastAccess as string) || 0),
    token: response.token as {
      accessToken: string
      refreshToken: string
      expiresIn: number
      kcAccessToken?: string | null
    },
    badge: {
      variant: 'default',
      icon: 'user'
    }
  }

  const customer: Customer = {
    idMain: response.idMain as string,
    registrationCompleted:
      ((response.company as Record<string, unknown>)
        ?.registrationCompleted as boolean) || false
  }

  if ((response.header as Record<string, unknown>)?.customization) {
    const header = response.header as Record<string, unknown>
    const customization = header.customization as Record<string, unknown>
    const homeUserUrl = header.homeUserUrl as string
    const backgroundColor = customization.backgroundColor as Record<
      string,
      unknown
    >
    const backgroundColorSecundary =
      customization.backgroundColorSecundary as Record<string, unknown>
    const buttonColor = customization.buttonColor as Record<string, unknown>

    customer.header = {
      appsUrls: {users: homeUserUrl},
      logo: customization.clientLogo as string,
      iconColor: buttonColor?.primary as string,
      background: {
        mainImage: customization.backgroundMainImage as string,
        repeatImage: customization.backgroundRepeatImage as string,
        primaryColor: backgroundColor?.primary as string,
        secondaryColor: backgroundColorSecundary?.primary as string
      }
    }
  }

  return {
    user,
    customer,
    locale: response.culture as string,
    token: response.token as string,
    permissions: (response.permit as Record<string, unknown>) || {},
    precisions: (response.precision as Record<string, unknown>) || {},
    links: (response.links as unknown[]) || [],
    virtualEntities: (response.vEnts as unknown[]) || []
  }
}
