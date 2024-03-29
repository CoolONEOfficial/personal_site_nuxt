import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'

// @ts-ignore
Vue.use(InfiniteLoading, {
  props: {
    spinner: 'spiral',
    distance: 700
    /* other props need to configure */
  },
  system: {
    throttleLimit: 50
    /* other settings need to configure */
  },
  slots: {
    noMore: 'No more message' // you can pass a string value
    // error: InfiniteError, // you also can pass a Vue component as a slot
  }
})
