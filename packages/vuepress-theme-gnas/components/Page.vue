<template>
  <main class="page">
    <slot name="top" />

    <Content class="theme-default-content" />

    <Valine v-if="$site.themeConfig.valine.enable"/>
    <!-- <BlogDirectory v-if="blogDirectoryVisible" /> -->

    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
// import BlogDirectory from './BlogDirectory.vue'

import Valine from '@theme/components/Valine.vue'

export default {
  components: { PageEdit, PageNav, Valine },
  props: ['sidebarItems'],
  data() {
    return {
      blogDirectoryVisible: false
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        // this.getBlogDirectoryVisible()
      },
      // 深度观察监听
      deep: true
    }
  },
  mounted() {
    this.getBlogDirectoryVisible()
  },
  methods: {
    getBlogDirectoryVisible() {
      // let pageClass = document.getElementsByClassName('theme-container')[0]
      //   .className
      // if (pageClass.includes('blog-catalog')) {
      //   this.blogDirectoryVisible = true
      // } else {
      //   this.blogDirectoryVisible = false
      // }
    }
  }
}
</script>

<style lang="stylus">

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
