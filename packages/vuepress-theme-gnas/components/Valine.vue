<template>
  <div class="valine-wrap">
    <div :id="`valine-wrap-${uuid}`" class="valine-module">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Valine',
  data() {
    return {
      uuid: new Date().getTime() + Math.round(Math.random() * 10000)
    }
  },
  mounted() {
    const Valine = require('valine-gnas')

    new Valine({
      el: `#valine-wrap-${this.uuid}`,
      notify: false,
      verify: false,
      avatar: 'robohash',
      placeholder: '',
      visitor: true,
      recordIP: true,
      meta: ['nick', 'mail'],
      path: this.$page.frontmatter && this.$page.frontmatter.config && this.$page.frontmatter.config.valineId ? this.$page.frontmatter.config.valineId : this.$page.regularPath,
      ...this.$site.themeConfig.valine
    })
  }
}
</script>
<style lang="stylus">
.leancloud_visitors{
  .leancloud-visitors-count{
    font-size 16px
  }
}
.valine-wrap{
  margin: 0 auto;
  padding 2rem 2.5rem
  .valine-module {
    .vcopy.txt-right,.vpower {
      display: none;
    }
  }
}

@media (max-width: 959px){
  .valine-wrap {
    padding: 2rem;
  }
}

@media (max-width: 419px){
  .valine-wrap {
    padding: 1.5rem;
  }
}




</style>