export const handleImport = (ex: any) =>
  ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
