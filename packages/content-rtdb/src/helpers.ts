export const getContentRefPath = (
  ref: string | string[],
  env: string,
  locale: string
) => {
  if (Array.isArray(ref)) {
    return `/flamelink/environments/${env}/content/${
      ref[0] ? `${ref[0]}/${locale}${ref[1] ? `/${ref[1]}` : ''}` : ''
    }`
  }

  return `/flamelink/environments/${env}/content/${
    ref ? `${ref}/${locale}` : ''
  }`
}
