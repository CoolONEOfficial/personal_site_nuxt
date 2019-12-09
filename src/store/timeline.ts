import { vuexfireMutations } from 'vuexfire'
import { GeoPoint, TimelineItem } from '~/types/timeline'
import firebase from 'firebase'
import Timestamp = firebase.firestore.Timestamp
import QuerySnapshot = firebase.firestore.QuerySnapshot

export const state = () => ({
  timelineItems: [],
  hoveredItem: null
})

export const mutations = {
  ...vuexfireMutations,
  updateTimelineItems(state, payload) {
    state.timelineItems = payload
  },
  updateHoveredItem(state, hoveredItem) {
    state.hoveredItem = hoveredItem
  }
}

function mergeAndSortItems(that, ...colNames: any) {
  const cols = []
  for (const mName of colNames) {
    cols.push(that.$fireStore.collection(mName).get() as never)
  }
  return (
    Promise.all(cols)
      // merge the results
      .then(async (promiseResults: QuerySnapshot[]) => {
        const mergedData = []
        for (const snapshot of promiseResults) {
          for (const doc of snapshot.docs) {
            const data = doc.data()
            data['date'] = (data['date'] as Timestamp).toDate()
            data['type'] = doc.ref.parent.path
            data['doc'] = doc.id
            if (data['type'] == 'hacks') {
              data['location']['geopoint'] = {
                latitude: data['location']['geopoint'].latitude,
                longitude: data['location']['geopoint'].longitude
              }
            }
            if (Boolean(data['images'])) {
              console.log('dev: ', process.env.NODE_ENV)
              data['images'] =
                process.env.NODE_ENV === 'production'
                  ? await Promise.all(
                      (
                        await that.$fireStorage
                          .ref()
                          .child(data.type + '/' + data.doc)
                          .list()
                      ).items
                        .filter((i) => i.name.includes('_400x400'))
                        .map((i) => i.getDownloadURL() as never)
                    )
                  : ['icon.png', 'icon.png', 'icon.png', 'icon.png']
            }

            mergedData.push(data as never)
          }
        }
        return mergedData
      })

      // sort the results
      .then((mergedData) =>
        mergedData.sort(
          (a, b) => (b as TimelineItem).date - (a as TimelineItem).date
        )
      )

      // add years
      .then((sortedData) => {
        for (let index = 1; index < sortedData.length; index++) {
          const prevYear = new Date(
            (sortedData[index - 1] as TimelineItem).date
          ).getFullYear()
          const currentYear = new Date(
            (sortedData[index] as TimelineItem).date
          ).getFullYear()
          if (prevYear > currentYear) {
            sortedData.splice(index, 0, {
              date: prevYear,
              type: 'years'
            } as never)
            index++
          }
        }
        return sortedData
      })

      // log any errors
      .catch((e) => console.error('error! ', e))
  )
}

export const actions = {
  async loadTimelineItems({ commit }) {
    const items = await mergeAndSortItems(
      this,
      'projects',
      'books',
      'achievements',
      'hacks'
    )
    commit('updateTimelineItems', items)
    return items
  },
  updateHoveredItem: ({ commit, state }, hoveredItem) => {
    commit('updateHoveredItem', hoveredItem)
    return state.hoveredItem
  }
}

export const getters = {
  getTimelineItems(state) {
    return state.timelineItems
  },
  getHoveredItem(state) {
    return state.hoveredItem
  }
}
