<template>
  <div
    class="description markdown"
    v-html="item.descriptionHtml[$i18n.locale]"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Prop } from '~/node_modules/nuxt-property-decorator'
import { TimelineItem } from '~/types/timeline'

@Component({})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineItem
}
</script>

<style scoped lang="scss">
.description {
  text-align: justify;
  margin: 0.5rem 1rem 0;
}
</style>
