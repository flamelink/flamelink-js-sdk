import getImageSizes from './image-sizes'
import getGlobals from './globals'
import { getAllSchemas } from './schemas'
import { SeedRTDB } from './types'

export default (): SeedRTDB => ({
  environments: {
    development: {
      __meta__: {
        createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
        createdDate: '2018-09-26T16:32:39.289Z'
      },
      content: {
        productCategory: {
          en: {
            '1546177486327': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2018-12-30T13:44:46.327Z'
              },
              active: true,
              id: 1546177486327,
              name: 'Footwear'
            },
            '1546177507532': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2018-12-30T13:45:07.532Z'
              },
              active: true,
              id: 1546177507532,
              name: 'Decor'
            },
            '1546177546300': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2018-12-30T13:45:46.300Z'
              },
              active: true,
              id: 1546177546300,
              name: 'Shoes'
            },
            '1546177598222': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2018-12-30T13:46:38.222Z'
              },
              active: true,
              id: 1546177598222,
              name: 'Electronics'
            }
          }
        },
        products: {
          en: {
            '1542623529262': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2018-11-19T10:32:09.262Z',
                lastModifiedBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                lastModifiedDate: '2019-02-22T20:12:16.670Z'
              },
              provider: 'amazon',
              description: '',
              category: 1546177507532,
              id: '1542623529262',
              name: 'Lichtschale',
              price: '2995'
            },
            '1542623747232': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2018-11-19T10:35:47.232Z',
                lastModifiedBy: 'UNKNOWN',
                lastModifiedDate: '2019-01-21T19:26:31.518Z'
              },
              provider: 'amazon',
              description: '',
              category: 1546177507532,
              id: '1542623747232',
              name: 'Tischlicht Weihnachten Elch Rot ',
              price: '790'
            },
            '1542723028898': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2018-11-20T14:10:28.898Z',
                lastModifiedBy: 'UNKNOWN',
                lastModifiedDate: '2019-01-21T19:26:31.525Z'
              },
              provider: 'amazon',
              description:
                'Tauchen Sie in die Brillanz von 4K HDR ein: Unglaubliche Kontraste, lebensrechte Farben und außerordentliches Detail in 4K.<br>4K X-Reality PRO - Jedes Detail neu durchdacht: Dank einer Bilddatenbank die Kontraste, Farben und Details überprüft, wird  jede Szene analysiert und verbessert.<br>Mit unserer Funktion zur Sprachsteuerung drücken Sie einfach nur den Mikrofon-Button und sagen Android was Sie sehen möchten.<br>Das schlanke Gehäuse, die Einfassung mit abgerundeten Ecken und der elegant gewinkelte Standfuß in warmem Silber bilden einen idealen Platz für eine Soundbar.<br>Motionflow XR - für ebenmäßige Action: Genießen Sie glatte und scharfe Details selbst in schnellen Actionszenen dank Motionflow XR Technologie.',
              category: 1539623280907,
              id: '1542723028898',
              name: 'Samsung 55" Smart TV',
              price: '63496'
            },
            '1542736913606': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2018-11-20T18:01:53.606Z',
                lastModifiedBy: 'UNKNOWN',
                lastModifiedDate: '2019-01-21T19:26:31.532Z'
              },
              provider: 'amazon',
              description:
                '<h2 style="text-align:center"><span style="font-size:24px"><span style="font-family:Georgia,serif"><u>Das ist ein Test &uuml;berschrift</u></span></span></h2>\n\n<p style="text-align:center"><span style="font-size:48px"><span style="font-family:Georgia,serif"><u>Hier sollte eine &Uuml;berschrift stehen</u></span></span></p>\n\n<ul>\n\t<li><strong>Prozessor</strong>: Intel Core i7-8550U (1,80 GHz bis zu 4,00 GHz Burst-Frequenz)</li>\n\t<li><strong>Besonderheiten</strong>: Geb&uuml;ndelte Power mit Intel Core i7 CPU, rasanter SSD und bis zu 10h Akkulaufzeit. Genie&szlig;en Sie gestochen scharfe Bilder auf dem matten 15 Zoll Full-HD Display mit IPS Technologie</li>\n\t<li><strong>Design:</strong> Genie&szlig;en Sie das ultraschlanke- und leichte Vollaluminium-Design. Die extra schmalen Displayr&auml;nder lassen Das Ultrabook noch edler aussehen. Mit der QWERTZ-Tastatur mit <strong>Hintergrundbeleuchtung</strong> k&ouml;nnen Sie auch ganz komfortabel im Dunkeln arbeiten.</li>\n\t<li><strong>Vielf&auml;ltige</strong> Anschl&uuml;sse und Schnittstellen: Bluetooth 4.0, HD Webcam, AC-WLAN, 1x HDMI, 1x USB 3.1, 2x USB 3.0, 1x USB 2.0, SD Kartenleser, 1x Audio In/Out</li>\n\t<li><strong>Herstellergarantie</strong>: 2 Jahre Garantie (Einsende-/ R&uuml;cksendeservice) inkl. 1 Jahr International Travelers Warranty, Lieferumfang: 1x Acer Swift 3, 65W AC-Netzteil</li>\n</ul>\n',
              category: 1546177598222,
              id: '1542736913606',
              name: 'Acer Swift 3 ',
              price: '99900'
            },
            '1548268136055': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2019-01-23T18:28:56.055Z',
                lastModifiedBy: 'UNKNOWN',
                lastModifiedDate: '2019-01-23T19:24:37.351Z'
              },
              provider: 'amazon',
              description:
                'PERFEKTES LICHT: Gibt die richtige Menge Licht ab, um Sie durch die Dunkelheit zu führen.<br>AUTOMATISCHE BELEUCHTUNG: Wenn Lichtsensoren Dunkelheit messen, schalten sich die Bewegungssensoren ein, um im richtigen Moment Licht zu spenden. Es werden Bewegungen im 120°-Winkel auf bis zu drei Metern Entfernung erkannt.<br>ENERGIEEFFIZIENT: Drei AAA-Batterien (nicht mitgeliefert) spenden etwa ein Jahr lang angenehmes Licht.<br>NACHTLICHT: Verhindert, dass Sie nachts das Licht einschalten müssen.<br>WAS SIE BEKOMMEN: Drei Lumi Nachtlichter zum Aufkleben, 6 Schrauben, 6 Dübel, eine Bedienungsanleitung, eine Happy Card und 18 Monate Garantie.',
              category: 1546177598222,
              id: '1548268136055',
              name: 'LED Nachtlicht mit Bewegungssensor',
              price: '1499'
            },
            '1548269859478': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2019-01-23T18:57:39.478Z',
                lastModifiedBy: 'UNKNOWN',
                lastModifiedDate: '2019-01-23T19:24:37.373Z'
              },
              provider: 'amazon',
              description:
                'Umfangreiche Funktionen - Plattenspieler mit drei Geschwindigkeiten, CD-Player, FM-Radio, Bluetooth und 3,5-mm-Aux-Eingang<br>Beeindruckendes 50er-Jahre-Mahagoni-Styling<br>Wunderschöner Drehknopf für das Analogradio<br>Eingebaute Stereolautsprecher',
              category: 1546177598222,
              id: '1548269859478',
              name: 'Bluethooth Record Player Music Centre mit Plattenspieler',
              price: '16811'
            }
          }
        }
      },
      navigation: {
        mainNav: {
          en: {
            __meta__: {
              createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
              createdDate: '2019-02-21T08:24:22.671Z'
            },
            id: 'mainNav',
            items: [
              {
                attachment: 0,
                component: '',
                cssClass: 'home',
                id: 1550737379833,
                newWindow: false,
                order: 0,
                parentIndex: 0,
                title: 'Home',
                url: '/',
                uuid: 1550737379833
              },
              {
                attachment: 0,
                component: '',
                cssClass: 'about',
                id: 1550737393540,
                newWindow: false,
                order: 1,
                parentIndex: 0,
                title: 'About',
                url: '/about',
                uuid: 1550737393540
              },
              {
                attachment: 0,
                component: '',
                cssClass: 'about',
                id: 1550737414320,
                newWindow: false,
                order: 2,
                parentIndex: 1550737393540,
                title: 'Team',
                url: '/about/team',
                uuid: 1550737414320
              },
              {
                attachment: 0,
                component: '',
                cssClass: 'about',
                id: 1550737442171,
                newWindow: false,
                order: 3,
                parentIndex: 1550737393540,
                title: 'Careers',
                url: '/about/careers',
                uuid: 1550737442171
              }
            ],
            title: 'Main Nav'
          }
        }
      },
      schemas: getAllSchemas({ dbType: 'rtdb' })
    },
    production: {
      __meta__: {
        createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
        createdDate: '2018-09-26T16:32:39.289Z'
      },
      content: {
        productCategory: {
          en: {
            '1546177486327': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2018-12-30T13:44:46.327Z'
              },
              active: true,
              id: 1546177486327,
              name: 'Footwear'
            },
            '1546177507532': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2018-12-30T13:45:07.532Z'
              },
              active: true,
              id: 1546177507532,
              name: 'Decor'
            },
            '1546177546300': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2018-12-30T13:45:46.300Z'
              },
              active: true,
              id: 1546177546300,
              name: 'Shoes'
            },
            '1546177598222': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2018-12-30T13:46:38.222Z'
              },
              active: true,
              id: 1546177598222,
              name: 'Electronics'
            }
          }
        },
        products: {
          en: {
            '1542623529262': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2018-11-19T10:32:09.262Z',
                lastModifiedBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                lastModifiedDate: '2019-02-22T20:15:01.728Z'
              },
              provider: 'amazon',
              description: '',
              category: 1546177507532,
              id: '1542623529262',
              name: 'Lichtschale',
              price: '2995'
            },
            '1542623747232': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2018-11-19T10:35:47.232Z',
                lastModifiedBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                lastModifiedDate: '2019-02-22T20:15:50.383Z'
              },
              provider: 'amazon',
              description: '',
              category: 1546177507532,
              id: '1542623747232',
              name: 'Tischlicht Weihnachten Elch Rot ',
              price: '790'
            },
            '1542723028898': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2018-11-20T14:10:28.898Z',
                lastModifiedBy: 'UNKNOWN',
                lastModifiedDate: '2019-01-21T19:26:31.525Z'
              },
              provider: 'amazon',
              description:
                'Tauchen Sie in die Brillanz von 4K HDR ein: Unglaubliche Kontraste, lebensrechte Farben und außerordentliches Detail in 4K.<br>4K X-Reality PRO - Jedes Detail neu durchdacht: Dank einer Bilddatenbank die Kontraste, Farben und Details überprüft, wird  jede Szene analysiert und verbessert.<br>Mit unserer Funktion zur Sprachsteuerung drücken Sie einfach nur den Mikrofon-Button und sagen Android was Sie sehen möchten.<br>Das schlanke Gehäuse, die Einfassung mit abgerundeten Ecken und der elegant gewinkelte Standfuß in warmem Silber bilden einen idealen Platz für eine Soundbar.<br>Motionflow XR - für ebenmäßige Action: Genießen Sie glatte und scharfe Details selbst in schnellen Actionszenen dank Motionflow XR Technologie.',
              category: 1539623280907,
              id: '1542723028898',
              name: 'Samsung 55" Smart TV',
              price: '63496'
            },
            '1542736913606': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2018-11-20T18:01:53.606Z',
                lastModifiedBy: 'UNKNOWN',
                lastModifiedDate: '2019-01-21T19:26:31.532Z'
              },
              provider: 'amazon',
              description:
                '<h2 style="text-align:center"><span style="font-size:24px"><span style="font-family:Georgia,serif"><u>Das ist ein Test &uuml;berschrift</u></span></span></h2>\n\n<p style="text-align:center"><span style="font-size:48px"><span style="font-family:Georgia,serif"><u>Hier sollte eine &Uuml;berschrift stehen</u></span></span></p>\n\n<ul>\n\t<li><strong>Prozessor</strong>: Intel Core i7-8550U (1,80 GHz bis zu 4,00 GHz Burst-Frequenz)</li>\n\t<li><strong>Besonderheiten</strong>: Geb&uuml;ndelte Power mit Intel Core i7 CPU, rasanter SSD und bis zu 10h Akkulaufzeit. Genie&szlig;en Sie gestochen scharfe Bilder auf dem matten 15 Zoll Full-HD Display mit IPS Technologie</li>\n\t<li><strong>Design:</strong> Genie&szlig;en Sie das ultraschlanke- und leichte Vollaluminium-Design. Die extra schmalen Displayr&auml;nder lassen Das Ultrabook noch edler aussehen. Mit der QWERTZ-Tastatur mit <strong>Hintergrundbeleuchtung</strong> k&ouml;nnen Sie auch ganz komfortabel im Dunkeln arbeiten.</li>\n\t<li><strong>Vielf&auml;ltige</strong> Anschl&uuml;sse und Schnittstellen: Bluetooth 4.0, HD Webcam, AC-WLAN, 1x HDMI, 1x USB 3.1, 2x USB 3.0, 1x USB 2.0, SD Kartenleser, 1x Audio In/Out</li>\n\t<li><strong>Herstellergarantie</strong>: 2 Jahre Garantie (Einsende-/ R&uuml;cksendeservice) inkl. 1 Jahr International Travelers Warranty, Lieferumfang: 1x Acer Swift 3, 65W AC-Netzteil</li>\n</ul>\n',
              category: 1546177598222,
              id: '1542736913606',
              name: 'Acer Swift 3 ',
              price: '99900'
            },
            '1548268136055': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2019-01-23T18:28:56.055Z',
                lastModifiedBy: 'UNKNOWN',
                lastModifiedDate: '2019-01-23T19:24:37.351Z'
              },
              provider: 'amazon',
              description:
                'PERFEKTES LICHT: Gibt die richtige Menge Licht ab, um Sie durch die Dunkelheit zu führen.<br>AUTOMATISCHE BELEUCHTUNG: Wenn Lichtsensoren Dunkelheit messen, schalten sich die Bewegungssensoren ein, um im richtigen Moment Licht zu spenden. Es werden Bewegungen im 120°-Winkel auf bis zu drei Metern Entfernung erkannt.<br>ENERGIEEFFIZIENT: Drei AAA-Batterien (nicht mitgeliefert) spenden etwa ein Jahr lang angenehmes Licht.<br>NACHTLICHT: Verhindert, dass Sie nachts das Licht einschalten müssen.<br>WAS SIE BEKOMMEN: Drei Lumi Nachtlichter zum Aufkleben, 6 Schrauben, 6 Dübel, eine Bedienungsanleitung, eine Happy Card und 18 Monate Garantie.',
              category: 1546177598222,
              id: '1548268136055',
              name: 'LED Nachtlicht mit Bewegungssensor',
              price: '1499'
            },
            '1548269859478': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2019-01-23T18:57:39.478Z',
                lastModifiedBy: 'UNKNOWN',
                lastModifiedDate: '2019-01-23T19:24:37.373Z'
              },
              provider: 'amazon',
              description:
                'Umfangreiche Funktionen - Plattenspieler mit drei Geschwindigkeiten, CD-Player, FM-Radio, Bluetooth und 3,5-mm-Aux-Eingang<br>Beeindruckendes 50er-Jahre-Mahagoni-Styling<br>Wunderschöner Drehknopf für das Analogradio<br>Eingebaute Stereolautsprecher',
              category: 1546177598222,
              id: '1548269859478',
              name: 'Bluethooth Record Player Music Centre mit Plattenspieler',
              price: '16811'
            }
          }
        }
      },
      id: 'production',
      navigation: {
        mainNav: {
          en: {
            __meta__: {
              createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
              createdDate: '2019-02-21T08:24:22.671Z'
            },
            id: 'mainNav',
            items: [
              {
                attachment: 0,
                component: '',
                cssClass: 'homepage',
                id: 1550737379833,
                newWindow: false,
                order: 0,
                parentIndex: 0,
                title: 'Home',
                url: '/',
                uuid: 1550737379833
              },
              {
                attachment: 0,
                component: '',
                cssClass: 'about',
                id: 1550737393540,
                newWindow: false,
                order: 1,
                parentIndex: 0,
                title: 'About',
                url: '/about',
                uuid: 1550737393540
              },
              {
                attachment: 0,
                component: '',
                cssClass: 'about',
                id: 1550737414320,
                newWindow: false,
                order: 2,
                parentIndex: 1550737393540,
                title: 'Team',
                url: '/about/team',
                uuid: 1550737414320
              },
              {
                attachment: 0,
                component: '',
                cssClass: 'about',
                id: 1550737442171,
                newWindow: false,
                order: 3,
                parentIndex: 1550737393540,
                title: 'Careers',
                url: '/about/careers',
                uuid: 1550737442171
              }
            ],
            title: 'Main Nav'
          }
        }
      },
      schemas: getAllSchemas({ dbType: 'rtdb' })
    }
  },
  media: {
    files: {
      '1528620608859': {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2018-06-10T08:50:10.816Z'
        },
        contentType: 'image/png',
        file: '1528620608859_DPLogoBlack.png',
        folderId: 1527417855487,
        id: 1528620608859,
        sizes: getImageSizes(),
        type: 'images'
      },
      '1528620608862': {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2018-06-10T08:50:10.947Z'
        },
        contentType: 'image/png',
        file: '1528620608862_DPLogoGrey03.png',
        folderId: 1527417855487,
        id: 1528620608862,
        sizes: getImageSizes(),
        type: 'images'
      },
      '1528620608864': {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2018-06-10T08:50:11.167Z'
        },
        contentType: 'image/png',
        file: '1528620608864_DPLogoGrey04.png',
        folderId: 1527417855487,
        id: 1528620608864,
        sizes: getImageSizes(),
        type: 'images'
      },
      '1531563092357': {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2018-07-14T10:11:37.281Z'
        },
        contentType: 'image/jpeg',
        file: '1531563092357_Beziehung.jpg',
        folderId: 1527419508703,
        id: 1531563092357,
        sizes: getImageSizes(),
        type: 'images'
      },
      '1531563101325': {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2018-07-14T10:11:50.083Z'
        },
        contentType: 'image/jpeg',
        file: '1531563101325_FürDieFrau.jpg',
        folderId: 1527419508703,
        id: 1531563101325,
        sizes: getImageSizes(),
        type: 'images'
      },
      '1531563114467': {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2018-07-14T10:12:01.949Z'
        },
        contentType: 'image/jpeg',
        file: '1531563114467_FürEchteMänner.jpg',
        folderId: 1527419508703,
        id: 1531563114467,
        sizes: getImageSizes(),
        type: 'images'
      },
      '1531563126373': {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2018-07-14T10:12:15.506Z'
        },
        contentType: 'image/jpeg',
        file: '1531563126373_Geburtstag.jpg',
        folderId: 1527419508703,
        id: 1531563126373,
        sizes: getImageSizes(),
        type: 'images'
      },
      '1531563142990': {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2018-07-14T10:12:30.022Z'
        },
        contentType: 'image/jpeg',
        file: '1531563142990_Hochzeit.jpg',
        folderId: 1527419508703,
        id: 1531563142990,
        sizes: getImageSizes(),
        type: 'images'
      },
      '1531563188306': {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2018-07-14T10:13:15.075Z'
        },
        contentType: 'image/jpeg',
        file: '1531563188306_MutterTag.jpg',
        folderId: 1527419508703,
        id: 1531563188306,
        sizes: getImageSizes(),
        type: 'images'
      },
      '1531563204262': {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2018-07-14T10:13:28.996Z'
        },
        contentType: 'image/jpeg',
        file: '1531563204262_Ostern.jpg',
        folderId: 1527419508703,
        id: 1531563204262,
        sizes: getImageSizes(),
        type: 'images'
      },
      '1531563213573': {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2018-07-14T10:13:42.922Z'
        },
        contentType: 'image/jpeg',
        file: '1531563213573_Romatisch.jpg',
        folderId: 1527419508703,
        id: 1531563213573,
        sizes: getImageSizes(),
        type: 'images'
      },
      '1531563226779': {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2018-07-14T10:13:50.504Z'
        },
        contentType: 'image/jpeg',
        file: '1531563226779_Valentinstag.jpg',
        folderId: 1527419508703,
        id: 1531563226779,
        sizes: getImageSizes(),
        type: 'images'
      },
      '1531563236482': {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2018-07-14T10:14:02.179Z'
        },
        contentType: 'image/jpeg',
        file: '1531563236482_VaterTag.jpg',
        folderId: 1527419508703,
        id: 1531563236482,
        sizes: getImageSizes(),
        type: 'images'
      },
      '1531563247073': {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2018-07-14T10:14:14.365Z'
        },
        contentType: 'image/jpeg',
        file: '1531563247073_Weihnachten.jpg',
        folderId: 1527419508703,
        id: 1531563247073,
        sizes: getImageSizes(),
        type: 'images'
      },
      '1531563333298': {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2018-07-14T10:15:40.066Z'
        },
        contentType: 'image/png',
        file: '1531563333298_1527700339772_Startsite.png',
        folderId: 1527419508703,
        id: 1531563333298,
        sizes: getImageSizes(),
        type: 'images'
      }
    },
    folders: {
      '1527417855487': {
        id: 1527417855487,
        name: 'Root',
        order: 0,
        parentId: 0
      },
      '1527419508703': {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2018-05-27T11:11:48.704Z',
          lastModifiedBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          lastModifiedDate: '2018-05-27T11:11:56.058Z'
        },
        id: 1527419508703,
        name: 'Products',
        order: 1,
        parentId: 1527417855487
      }
    }
  },
  permissions: {
    '1': {
      content: {
        development: {
          productCategory: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          products: {
            create: true,
            delete: true,
            update: true,
            view: true
          }
        },
        production: {
          productCategory: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          products: {
            create: true,
            delete: true,
            update: true,
            view: true
          }
        }
      },
      environments: {
        development: true,
        production: true
      },
      id: 1,
      media: {
        create: true,
        delete: true,
        update: true,
        view: true
      },
      name: 'Super Admin',
      navigation: {
        development: {
          create: true,
          delete: true,
          update: true,
          view: true
        },
        production: {
          create: true,
          delete: true,
          update: true,
          view: true
        }
      },
      permissions: {
        create: true,
        delete: true,
        update: true,
        view: true
      },
      schemas: {
        development: {
          create: true,
          delete: true,
          update: true,
          view: true
        },
        production: {
          create: true,
          delete: true,
          update: true,
          view: true
        }
      },
      settings: {
        backups: {
          create: true,
          delete: true,
          update: true,
          view: true
        },
        environments: {
          create: true,
          delete: true,
          update: true,
          view: true
        },
        general: {
          create: true,
          delete: true,
          update: true,
          view: true
        },
        globals: {
          create: true,
          delete: true,
          update: true,
          view: true
        },
        locales: {
          create: true,
          delete: true,
          update: true,
          view: true
        }
      },
      users: {
        create: true,
        delete: true,
        update: true,
        view: true
      }
    },
    '1527613656960': {
      __meta__: {
        createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
        createdDate: '2018-05-29T17:07:36.961Z',
        lastModifiedBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
        lastModifiedDate: '2019-01-29T12:01:52.721Z'
      },
      content: {
        development: {
          productCategory: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          products: {
            create: true,
            delete: true,
            update: true,
            view: true
          }
        },
        production: {
          productCategory: {
            create: false,
            delete: false,
            update: false,
            view: true
          },
          products: {
            create: false,
            delete: false,
            update: false,
            view: true
          }
        }
      },
      environments: {
        development: true,
        production: true
      },
      id: 1527613656960,
      media: {
        create: true,
        delete: true,
        update: true,
        view: true
      },
      name: 'Editor',
      navigation: {
        development: {
          create: true,
          delete: true,
          update: true,
          view: true
        },
        production: {
          create: false,
          delete: false,
          update: false,
          view: true
        }
      },
      permissions: {
        create: true,
        delete: true,
        update: true,
        view: true
      },
      schemas: {
        development: {
          create: true,
          delete: true,
          update: true,
          view: true
        },
        production: {
          create: false,
          delete: false,
          update: false,
          view: false
        }
      },
      settings: {
        backups: {
          create: true,
          update: true,
          view: true
        },
        customLinks: {
          update: true,
          view: true
        },
        environments: {
          create: true,
          delete: true,
          update: true,
          view: true
        },
        general: {
          update: true,
          view: true
        },
        globals: {
          update: true,
          view: true
        },
        locales: {
          create: true,
          delete: true,
          view: true
        }
      },
      users: {
        create: true,
        update: true,
        view: true,
        delete: true
      }
    }
  },
  settings: {
    backups: {
      '1548413391985': {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2019-01-25T10:49:51.985Z'
        },
        file: 'test-project_2019_01_25_12_49_49.json',
        id: 1548413391985,
        timestamp: '2019-01-25 12:49:49'
      },
      '1548414447390': {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2019-01-25T11:07:27.391Z'
        },
        file: 'test-project_2019_01_25_13_07_25.json',
        id: 1548414447390,
        timestamp: '2019-01-25 13:07:25'
      }
    },
    defaultLocale: 'en',
    environments: {
      development: {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2018-09-26T16:32:31.765Z'
        },
        id: 'development',
        name: 'Development'
      },
      production: {
        id: 'production',
        name: 'Production'
      }
    },
    general: {
      __meta__: {
        createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
        createdDate: '2018-05-27T11:26:57.042Z',
        lastModifiedBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
        lastModifiedDate: '2018-07-14T09:58:25.612Z'
      },
      defaultPermissionsGroup: 1,
      id: 'general',
      imageSizes: getImageSizes()
    },
    globals: getGlobals('rtdb'),
    locales: {
      en: {
        id: 'en',
        name: 'English (America)'
      }
    }
  },
  users: {
    LKJcOW4CiwS8pijpqmhQcDl9TvX2: {
      displayName: 'JP Erasmus',
      email: 'jperasmus11@gmail.com',
      enabled: 'Yes',
      firstName: 'JP',
      id: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
      lastName: 'Erasmus',
      permissions: 1
    }
  }
})
