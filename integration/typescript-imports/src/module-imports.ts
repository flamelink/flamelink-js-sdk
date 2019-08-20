import flamelink from 'flamelink/app'
import 'flamelink/schemas'
import 'flamelink/content'
import 'flamelink/settings'
import 'flamelink/storage'
import 'flamelink/navigation'
import 'flamelink/users'
import 'flamelink/cf/schemas'
import 'flamelink/cf/content'
import 'flamelink/cf/settings'
import 'flamelink/cf/storage'
import 'flamelink/cf/navigation'
import 'flamelink/cf/users'
import 'flamelink/rtdb/schemas'
import 'flamelink/rtdb/content'
import 'flamelink/rtdb/settings'
import 'flamelink/rtdb/storage'
import 'flamelink/rtdb/navigation'
import 'flamelink/rtdb/users'

flamelink({
  firebaseApp: {},
  dbType: 'rtdb'
})
