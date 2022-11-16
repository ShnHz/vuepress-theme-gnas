<template>
    <footer class="footer-wrap">
        <div :style="{ 'background-image': `url(${bannerImg})` }" class="bg">
        </div>
        <div class="footer-wrap">
            <div class="copyright">©{{ $site.themeConfig.startYear }} - {{ thisYear }} By {{ $site.themeConfig.author }}</div>
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
    }
}
</script>
<style lang="stylus">
  footer {
    position: relative;
    margin-top: 1rem;
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

    .footer-wrap {
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
    footer {
        .footer-wrap {
            line-height:1.8;
            text-align:left;
            a{
                display:block;
            }
        }
    }
}
</style>