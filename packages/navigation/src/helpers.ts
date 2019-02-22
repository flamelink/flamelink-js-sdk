import curry from 'lodash/curry'
import { formatStructure } from '@flamelink/sdk-utils'

export const structureItems = curry((options: any, nav: any) => {
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
})
