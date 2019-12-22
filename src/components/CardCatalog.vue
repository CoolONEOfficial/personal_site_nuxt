<template>
  <div :class="['container', { 'is-loading': isLoading }]">
    <div
      :class="[
        'columns',
        'is-multiline',
        `columns-${$device.isMobile ? 'mobile' : 'desktop'}`
      ]"
    >
      <div
        class="column is-one-third"
        v-for="(_, index) of new Array(paginationCount / 2)"
        :key="index"
        data-aos="fade"
      >
        <Card
          v-for="(i, cardIndex) of [
            items[index],
            items[paginationCount / 2 + index]
          ].filter(Boolean)"
          :key="cardIndex"
          :item="i"
          :subtitle="i[itemSubtitle]"
          class="has-margin-top-20"
        />
      </div>
    </div>

    <b-pagination
      v-if="docsCount > paginationCount"
      :total="docsCount"
      :current.sync="currentPage"
      :per-page="paginationCount"
      order="is-centered"
      size="is-small"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { PAGINATION_COUNT } from '~/util/constants'
import { Watch } from '~/node_modules/nuxt-property-decorator'
import Card from '~/components/Card.vue'

@Component({
  components: { Card }
})
export default class extends Vue {
  @Prop()
  items

  @Prop()
  itemSubtitle!: String

  @Prop()
  docsCount

  @Prop()
  onNextPage

  @Prop()
  onPrevPage

  @Watch('currentPage')
  async onCurrentPageChanged(newVal, prevVal) {
    console.log('new curr: ', newVal, ', prev: ', prevVal)

    const diff = Math.abs(newVal - prevVal)

    this.isLoading = true
    for (let i = 0; i < diff; i++) {
      await (newVal > prevVal ? this.onNextPage() : this.onPrevPage())
    }
    this.isLoading = false
  }

  isLoading = false

  currentPage = 1

  get paginationCount() {
    return PAGINATION_COUNT
  }
}
</script>

<style scoped lang="scss">
.container {
  transition: opacity 1s;
}
.is-loading {
  opacity: 0.5;
}

.columns-desktop {
  min-height: calc(100vh - 3.5rem - 80px);
}

.columns-mobile {
  min-height: calc(100vh - 5rem - 25px);
}
</style>