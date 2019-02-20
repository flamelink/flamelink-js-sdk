export const getSchemasRefPath = (ref: string, env: string) =>
  `/flamelink/environments/${env}/schemas/${ref || ''}`
