<template>
    <footer class="footer-wrap" v-if="visible">
        <div :style="{ 'background-image': `url(${bannerImg})` }" class="bg">
        </div>
        <div class="footer-main-wrap">
            <div class="copyright">©{{ $site.themeConfig.startYear }} - {{ thisYear }} By {{ $site.themeConfig.author }}
            </div>
            <div class="framework-info">
                <a href="https://vuepress.vuejs.org/zh/" rel="noopener" target="_blank">
                    <span>Vuepress</span>
                </a>
                <a href="https://vuepress.vuejs.org/zh/" rel="noopener" target="_blank">
                    <span>Vuepress-theme-gnas</span>
                </a>
                <a :href="$site.themeConfig.recordLink">{{ $site.themeConfig.record }}</a>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
    props: {
        bannerImg: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            thisYear: new Date().getFullYear()
        }
    },
    computed: {
        visible() {
            return ['tag', 'friend', 'archives'].includes(this.$page.frontmatter.mode) || this.$page.frontmatter.home == true || this.$page.regularPath.includes(this.$site.themeConfig.blogBase)
        }
    }
}
</script>
<style lang="stylus" scoped>
  .footer-wrap {
    position: relative;
    background: rgb(0, 0, 0);
    font-size:16px;
    .bg {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-attachment: local;
      background-position: bottom;
      background-size: cover;
      opacity: 0.3;
    }

    .footer-main-wrap {
      line-height:1.8;
      position: relative;
      padding: 4rem 1rem;
      color: #eee;
      text-align: center;

      a{
        margin:0 8px;
      }
    }
  }

@media (max-width: $MQMobile) {
    .footer-wrap {
        .footer-main-wrap {
            line-height:1.8;
            text-align:left;
            a{
                display:block;
            }
        }
    }
}
</style>