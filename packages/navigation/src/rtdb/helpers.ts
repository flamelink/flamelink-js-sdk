export const getNavigationRefPath = (
  navKey: string | string[],
  env: string,
  locale: string
) => {
  if (Array.isArray(navKey) && navKey[0] && navKey[1]) {
    return `/flamelink/environments/${env}/navigation/${navKey[0]}/${locale}/${
      navKey[1]
    }`
  }

  return `/flamelink/environments/${env}/navigation/${
    navKey ? `${navKey}/${locale}` : ''
  }`
}
