<template>
  <Description :page-item="getProjectPage" :subtitle="subtitle" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import Description from '~/components/hero/Description.vue'
import { TimelineProject } from "~/types/items/project";
import { VUEX_NAMES } from "~/util/constants";
const vuexModule = namespace(VUEX_NAMES.PROJECTS)

@Component({
  components: { Description }
})
export default class extends Vue {
  @vuexModule.Getter
  getProjectPage

  get subtitle() {
    return TimelineProject.getSubtitle(
      this.$t(this.getProjectPage.type),
      this.$t('for'),
      this.$t(this.getProjectPage.platform),
      this.getProjectPage.platform
    )
  }
}
</script>

<i18n src="~/lang/projectsTypes.json" />
