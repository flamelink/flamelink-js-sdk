import { formatStructure } from '@flamelink/sdk-utils'

export const getNavigationRefPath = (
  navKey: string,
  env: string,
  locale: string
) =>
  `/flamelink/environments/${env}/navigation/${
    navKey ? `${navKey}/${locale}` : ''
  }`

export const structureItems = (options: any, nav: any) => {
  // Only try and structure items if items weren't plucked out
  if (nav && nav.hasOwnProperty('items')) {
    return Object.assign({}, nav, {
      items: formatStructure(
        options.structure,
        {
          idProperty: 'uuid',
          parentProperty: 'parentIndex'
        },
        nav.items
      )
    })
  }

  return nav
}
