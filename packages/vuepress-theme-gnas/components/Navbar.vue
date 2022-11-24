<template>
  <header class="navbar" :class="{ 'navbar-transparent': transparent }">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

    <router-link :to="$localePath" class="home-link">
      <img :alt="$siteTitle" :src="$withBase($site.themeConfig.logo)" class="logo" v-if="$site.themeConfig.logo" />
      <span :class="{ 'can-hide': $site.themeConfig.logo }" class="site-name" ref="siteName" v-if="$siteTitle">{{
          $siteTitle
      }}</span>
    </router-link>

    <div :style="linksWrapMaxWidth ? {
      'max-width': linksWrapMaxWidth + 'px'
    } : {}" class="links">

      <!-- 音乐播放器 -->
      <ClientOnly
        v-if="$site.themeConfig.music && $site.themeConfig.music.enable == true && $site.themeConfig.music.list && $site.themeConfig.music.list.length > 0">
        <component is="NavbarMusicPlayer" />
      </ClientOnly>

      <!-- 黑夜模式 -->
      <ClientOnly v-if="$site.themeConfig.themeMode.enable == true">
        <component is="NavbarThemeMode" />
      </ClientOnly>

      <AlgoliaSearchBox :options="algolia" v-if="isAlgoliaSearch" />
      <SearchBox v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false" />
      <NavLinks class="can-hide" />
    </div>
  </header>
</template>

<script>
const lodash = require('lodash');

import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@theme/components/SidebarButton.vue'
import NavLinks from '@theme/components/NavLinks.vue'

import NavbarMusicPlayer from '@theme/components/NavbarMusicPlayer.vue'
import NavbarThemeMode from '@theme/components/NavbarThemeMode.vue'

export default {
  components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox, NavbarMusicPlayer, NavbarThemeMode },
  data() {
    return {
      linksWrapMaxWidth: null,

      transparent: false,
      transparentEdit: false,
      scrollTop: 0
    }
  },
  computed: {
    algolia() {
      return (
        this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      )
    },

    isAlgoliaSearch() {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  },
  watch: {
    '$route': {
      immediate: true,
      deep: true,
      handler(route) {
        this.transparentEdit = this.transparent = route.path == '/'
      }
    },
    scrollTop: {
      handler(newVal) {
        if (this.transparentEdit) {
          this.transparent = newVal < 500
        }
      },
    },
  },
  mounted() {
    let _this = this

    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING =
      parseInt(css(this.$el, 'paddingLeft')) +
      parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth =
          this.$el.offsetWidth -
          NAVBAR_VERTICAL_PADDING -
          ((this.$refs.siteName && this.$refs.siteName.offsetWidth) || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
    window.addEventListener(
      'scroll',
      lodash.throttle(function () {
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop
        //变量windowHeight是可视区的高度
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight
        //变量scrollHeight是滚动条的总高度
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight
        //滚动条到底部的条件
        var thresold = scrollHeight - scrollTop - windowHeight

        _this.scrollTop = scrollTop
      }, 100)
    )
  },
}

function css(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem;
$navbar-horizontal-padding = 1.5rem;

.navbar {
  padding: $navbar-vertical-padding $navbar-horizontal-padding;
  line-height: $navbarHeight - 1.4rem;
  transition: all 0.5s ease;
  border-bottom: 1px solid #eaecef;
  background: rgba(255, 255, 255, .8);
  backdrop-filter: blur(20px);
  &.navbar-transparent {
    background: rgba(255, 255, 255, 0);
    backdrop-filter: blur(2px);
    border: none;

    .home-link {
      opacity: 0;

      .site-name {
        color: #111;
      }
    }

    .nav-item {
      >.nav-link {
        color: #fff;
      }

      .dropdown-title {
        color: #fff;
      }
    }
  }

  a, span, img {
    display: inline-block;
  }

  .home-link {
    display:flex;
    align-items:center;
  }

  .logo {
    height: $navbarHeight - 2rem;
    min-width: $navbarHeight - 2rem;
    margin-right: 0.8rem;
    margin-top: 0.4rem;
    vertical-align: top;
  }

  .site-name {
    font-size: 1.3rem;
    font-weight: 600;
    color: $textColor;
    position: relative;
  }

  .links {
    padding-left: 1.5rem;
    box-sizing: border-box;
    background-color:transparent;
    white-space: nowrap;
    font-size: 0.9rem;
    position: absolute;
    right: $navbar-horizontal-padding;
    top: $navbar-vertical-padding;
    display: flex;

    .search-box {
      flex: 0 0 auto;
      vertical-align: top;
    }
  }

  .router-link-active{
    border-bottom none !important;
  }
}

@media (max-width: $MQMobile) {
  .navbar {
    padding-left: 4rem;

    .can-hide {
      display: none;
    }

    .links {
      padding-left: 1.5rem;
    }

    .site-name {
      width: calc(100vw - 9.4rem);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
