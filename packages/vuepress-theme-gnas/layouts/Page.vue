<template>
  <main class="page">
    <slot name="top" />

    <Content class="theme-default-content" />

    <Directory v-if="$page.frontmatter && $page.frontmatter.config && $page.frontmatter.config.directory" ref="directory"/>

    <Valine
      v-if="$site.themeConfig.valine.enable && (!$page.frontmatter || !$page.frontmatter.config || $page.frontmatter && $page.frontmatter.config && $page.frontmatter.config.valine)" />

    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import Directory from '@theme/components/Directory.vue'

import Valine from '@theme/components/Valine.vue'

export default {
  components: { PageEdit, PageNav, Directory, Valine },
  props: ['sidebarItems'],
  data() {
    return {
      blogDirectoryVisible: false
    }
  },
  watch: {
  },
  mounted() {
    if(this.$refs.directory){
      this.$refs.directory.getDirectory()
    }
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

  .theme-default-content{
  }
}
</style>
