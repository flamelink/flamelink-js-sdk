interface Globals {
  __meta__?: any
  _fl_meta_?: any
  adminEmail: string
  dateFormat: string
  id: string
  siteTitle: string
  tagline: string
  timeFormat: string
  timezone: string
  url: string
}

export default (dbType: string): Globals => {
  const globals = {
    adminEmail: 'admin@example.com',
    dateFormat: 'mm/dd/yyyy',
    id: 'globals',
    siteTitle: 'Test Site',
    tagline: 'Just another awesome project',
    timeFormat: 'HH:mm:ss',
    timezone: 'GMT',
    url: 'https://www.example.com'
  }

  switch (dbType) {
    case 'rtdb':
      return {
        ...globals,
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2019-04-05T12:08:24.510Z',
          lastModifiedBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          lastModifiedDate: '2019-04-05T12:08:24.510Z'
        }
      }

    case 'cf':
      return {
        ...globals,
        _fl_meta_: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: 'February 11, 2019 at 12:54:54 PM UTC+2',
          docId: 'globals',
          lastModifiedBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          lastModifiedDate: 'February 13, 2019 at 10:41:20 AM UTC+2'
        }
      }

    default:
      return globals
  }
}
