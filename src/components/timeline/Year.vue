<template>
  <header :class="['timeline-header']">
    <div class="horizontal-line" />
    <span :class="['tag', 'year-tag', { 'left-position': $device.isMobile }]">{{ item.date }}</span>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { TimelineItem } from '~/types/timeline'

@Component({})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineItem
}
</script>

<style scoped lang="scss">
.timeline-header {
  height: 20px !important;
}

.left-position {
  position: absolute;
  left: 10px;
}

.year-tag {
  z-index: 1;
}

.horizontal-line {
  position: absolute;
  margin-top: 10px;
  height: 1px;
  left: 0;
  width: 100vw;
  background-color: var(--timeline-line);
}
</style>
