<template>
  <Description :page-item="getAchievementPage" :subtitle="getAchievementPage.organisation" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import Description from '~/components/hero/Description.vue'
import { VUEX_NAMES } from "~/util/constants";
const vuexModule = namespace(VUEX_NAMES.ACHIEVEMENTS)

@Component({
  components: { Description }
})
export default class extends Vue {
  @vuexModule.Getter
  getAchievementPage
}
</script>
