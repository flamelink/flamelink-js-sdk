interface Globals {
  __meta__?: any
  adminEmail: string
  dateFormat: string
  id: 'globals'
  siteTitle: string
  tagline: string
  timeFormat: string
  timezone: string
  url: string
}

export default (): Globals => ({
  __meta__: {
    createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
    createdDate: '2019-04-05T12:08:24.510Z',
    lastModifiedBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
    lastModifiedDate: '2019-04-05T12:08:24.510Z'
  },
  adminEmail: 'admin@example.com',
  dateFormat: 'mm/dd/yyyy',
  id: 'globals',
  siteTitle: 'Test Site',
  tagline: 'Just another awesome project',
  timeFormat: 'HH:mm:ss',
  timezone: 'GMT',
  url: 'https://www.example.com'
})
