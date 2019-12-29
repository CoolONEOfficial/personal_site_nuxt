import firebase from 'firebase/app'
import 'firebase/firestore'
import Timestamp = firebase.firestore.Timestamp
import { PLACEHOLDER_IMAGE } from '~/util/constants'
import DocumentSnapshot = firebase.firestore.DocumentSnapshot
import DocumentData = firebase.firestore.DocumentData
import { convertToHTML, convertToPlainText } from '~/util/md'

export class Item {
  constructor(
    public title: LocalizedString,
    public date: Date,
    public images?: Image[],
    public singleImage?: Image,
    public logo?: Image,
    public descriptionText?: LocalizedString,
    public descriptionHtml?: LocalizedString,
    public tags?: string[]
  ) {}

  static async fromDoc(that, doc: DocumentSnapshot): Promise<Item> {
    const data = doc.data() as DocumentData

    if (Boolean(data.images)) {
      let images: Image[]

      if (process.env.NODE_ENV === 'production') {
        const list = (
          await that.$fireStorage
            .ref()
            .child(`${doc.ref.parent.path}/${doc.id}/images`)
            .list()
        ).items

        images = []
        for (let i = 0; i < list.length; i += 2) {
          images.push({
            original: await list[i].getDownloadURL(),
            small: await list[i + 1].getDownloadURL()
          })
        }
      } else
        images = new Array(5).fill({
          original: PLACEHOLDER_IMAGE,
          small: PLACEHOLDER_IMAGE
        })

      data['images'] = images
    }

    if (Boolean(data.singleImage)) {
      data.singleImage =
        process.env.NODE_ENV === 'production'
          ? {
              original: await that.$fireStorage
                .ref()
                .child(`${doc.ref.parent.path}/${doc.id}/singleImage/1.jpg`)
                .getDownloadURL(),
              small: await that.$fireStorage
                .ref()
                .child(
                  `${doc.ref.parent.path}/${doc.id}/singleImage/1_400x400.jpg`
                )
                .getDownloadURL()
            }
          : {
              original: PLACEHOLDER_IMAGE,
              small: PLACEHOLDER_IMAGE
            }
    }

    if (Boolean(data.logo)) {
      data.logo =
        process.env.NODE_ENV === 'production'
          ? {
            original: await that.$fireStorage
              .ref()
              .child(`${doc.ref.parent.path}/${doc.id}/logo/1.jpg`)
              .getDownloadURL(),
            small: await that.$fireStorage
              .ref()
              .child(
                `${doc.ref.parent.path}/${doc.id}/logo/1_400x400.jpg`
              )
              .getDownloadURL()
          }
          : {
            original: PLACEHOLDER_IMAGE,
            small: PLACEHOLDER_IMAGE
          }
    }

    return new Item(
      data.title,
      (data.date as Timestamp).toDate(),
      data.images,
      data.singleImage,
      data.logo,
      LocalizedString.mdToText(LocalizedString.fromMap(data.description)),
      LocalizedString.mdToHtml(LocalizedString.fromMap(data.description)),
      data.tags
    )
  }
}

export class LocalizedString {
  constructor(public en: string, public ru: string) {}

  static fromMap(map: Map<string, any> | any) {
    if (!Boolean(map)) return
    const en: string = map['en']
    const ru = map['ru']
    return new LocalizedString(
      Boolean(en) ? en.replace(/\\n/g, '\n') : '',
      Boolean(ru) ? ru.replace(/\\n/g, '\n') : ''
    )
  }

  static mdToHtml(str?: LocalizedString) {
    if (!str) return
    str.ru = convertToHTML(str.ru)
    str.en = convertToHTML(str.en)
    return str
  }

  static mdToText(str?: LocalizedString) {
    if (!str) return
    str.ru = convertToPlainText(str.ru)
    str.en = convertToPlainText(str.en)
    return str
  }
}

export interface GeoPoint {
  latitude: number
  longitude: number
}

export interface Image {
  original: string
  small: string
}

export interface Location {
  title: LocalizedString
  geopoint: GeoPoint
}
