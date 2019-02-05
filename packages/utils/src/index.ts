/**
 * @description This method probably doesn't have the best name, but
 * it is used to handle the difference between module systems - it
 * returns the `default` import.
 * @param {Any} `mod` The module being imported
 * @returns The module's default import
 */
export const getDefaultImport = (mod: any) =>
  mod && typeof mod === 'object' && 'default' in mod ? mod.default : mod
