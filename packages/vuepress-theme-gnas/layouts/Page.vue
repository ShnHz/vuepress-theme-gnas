<template>
  <main class="page">
    <div class="content-wrap">
      <slot name="top" />

      <PageTitle v-if="$page.frontmatter.title != false"/>

      <Content class="theme-default-content" />

      <Valine v-if="$site.themeConfig.valine.enable && ($page.frontmatter.config && $page.frontmatter.config.valine)" />

      <PageEdit />

      <PageNav v-bind="{ sidebarItems }" />

      <slot name="bottom" />
    </div>

    <Directory v-if="$page.frontmatter && $page.frontmatter.config && $page.frontmatter.config.dir" ref="directory" />

  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import PageTitle from '@theme/components/PageTitle.vue'
import Directory from '@theme/components/Directory.vue'

import Valine from '@theme/components/Valine.vue'

export default {
  components: { PageEdit, PageNav, PageTitle, Directory, Valine },
  props: ['sidebarItems'],
  data() {
    return {
      blogDirectoryVisible: false
    }
  },
  watch: {
  },
  mounted() {
    if (this.$refs.directory) this.$refs.directory.getDirectory()
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>

$wrapper
  max-width $contentWidth
  margin 0 auto
  padding 2rem 2.5rem
  @media (max-width: $MQNarrow)
    padding 2rem
  @media (max-width: $MQMobileNarrow)
    padding 1.5rem


.page {
  min-height:100vh;
  padding-bottom: 2rem;
  display: block;

  .content-wrap{
    overflow hidden
    position relative
  }
}
</style>
