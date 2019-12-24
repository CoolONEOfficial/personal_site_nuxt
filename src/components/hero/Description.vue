<template>
  <div :class="['container', { 'has-text-centered': !pageItem.singleImage }]">
    <div :class="['columns', 'is-multiline', { 'is-6': !$device.isMobile }]">
      <div
        :class="[
          'column',
          { 'small-width': !$device.isMobile && !pageItem.singleImage }
        ]"
      >
        <div :class="[{ columns: pageItem.singleImage }]">
          <figure
            :class="[
              'image',
              'is-128x128',
              'description-logo',
              { 'image-centered': !pageItem.singleImage }
            ]"
            v-if="!$device.isMobile && pageItem.logo"
          >
            <img :src="pageItem.logo" />
          </figure>
          <div class="column">
            <h1 class="title">
              {{ pageItem.title[$i18n.locale] }}
            </h1>
            <h2 v-if="subtitle" class="subtitle description-subtitle">
              {{ subtitle }}
            </h2>
          </div>
        </div>
        <div
          v-if="pageItem.description"
          class="has-text-justified"
          v-html="$md.render(pageItem.description[$i18n.locale])"
        />
        <br />
        <nav class="level" v-if="pageItem.description">
          <div class="level-left">
            <time :datetime="pageItem.date.toDateString()">{{
              $dateFns.format(pageItem.date.getTime(), 'd MMMM yyyy', {
                locale: locales[$i18n.locale]
              })
            }}</time>
          </div>
          <div class="level-right">
            <b-taglist attached class="is-marginless">
              <b-tag
                class="hover-dark is-marginless"
                v-for="(i, index) of pageItem.tags"
                :key="index"
              >
                {{ i }}
              </b-tag>
            </b-taglist>
          </div>
        </nav>
      </div>
      <div class="column" v-if="pageItem.singleImage">
        <figure class="image">
          <img
            :src="pageItem.singleImage.original"
            :class="[
              'description-image',
              { 'description-image-desktop': !$device.isMobile }
            ]"
          />
        </figure>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { enUS, ru } from 'date-fns/locale'

@Component({})
export default class extends Vue {
  @Prop({ required: true })
  pageItem

  @Prop({ required: true })
  subtitle

  locales = {
    en: enUS,
    ru
  }
}
</script>

<style lang="scss">
.description {
  &-image {
    object-fit: contain;
    max-height: 60vh;
    max-width: 40vw;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    &-desktop {
      position: absolute;
      top: 50%;
      transform: translateX(-50%) translateY(-40%);
    }
  }

  &-subtitle {
    margin-bottom: 0.5rem !important;
  }
}

.small-width {
  max-width: 33vw !important;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>