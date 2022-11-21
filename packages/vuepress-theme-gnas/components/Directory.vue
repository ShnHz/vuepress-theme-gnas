<template>
  <div class="directory-wrap">
    <header>目录</header>
    <div class="directory-content-wrap">
      <ul>
        <li :key="`directory-h3-${item.value}-${index}`" class="directory-h3-li" v-for="(item, index) in directory"
          :class="item.type">
          <a @click="scrollTo(item.href)" :title="item.value">{{ item.value }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      directory: [],
    }
  },
  methods: {
    getDirectory() {
      this.directory = [...document.querySelectorAll(this.$page.frontmatter.config && this.$page.frontmatter.config.dirTag ? this.$page.frontmatter.config.dirTag : 'h3, h4, h5')].map(item => {
        let dom = [...item.querySelectorAll('a')][0]
        let href = dom.getAttribute('href')
        return {
          type: item.tagName,
          value: href.replace(/[\r\n]/g, '').replace(/[\#\_]/g, '').replace(/[\-]/g, '.'),
          href: href.replace(/[\r\n]/g, '').replace(/[\s\.]/g, '-')
        }
      })
    },
    scrollTo(href) {
      window.history.pushState({}, 0, window.location.href.split('#')[0] + href)

      href = href.split('#')[1].toLowerCase()
      window.scrollTo({
        // 通过offsetYop获取元素位置
        // -100是为了避免它直接滑动到屏幕顶部，怪丑的
        top: document.getElementById(href).offsetTop - 100,
        behavior: 'smooth', // 平滑滚动
      })
    },
  },
}
</script>
<style lang="stylus" scoped>
.directory-wrap {
  position: sticky;
  top: 7.6rem;
  width: 300px;
  height: auto;
  min-width: 300px;
  max-height: 350px;
  background: #f4f4f4;
  padding: 1rem 1.2rem;

  header {
    height: 45px;
    padding-top: 1rem !important;
    margin-bottom: 0.5rem;

    font-weight: 600;
  }

  .directory-content-wrap {
    height: 250px;
    overflow-y: auto;
    ul{
      li{
        overflow: hidden;
        width: calc(100% - 10px);
        line-height: 2;
        position relative
        font-size: .875rem;
        word-wrap: normal;
        white-space: nowrap;
        text-overflow: ellipsis;
        &.H3{
          a{
            font-weight: 600;
          }
        }
        
        &.H4,&.H5,&.H6{
          &::before{
            content: "";
            width: 4px;
            height: 4px;
            position: absolute;
            left: 4px;
            top: 12px;
            border-radius: 50%;
            background: #000;
          }  
        }
        &.H4{
          width: calc(100% - 25px);

          padding-left: 15px;
        }

        &.H5{
          width: calc(100% - 40px);

          padding-left: 30px;
          &::before{
            opacity .5
          }
        }

        &.H6{
          width: calc(100% - 55px);

          padding-left: 45px;
          &::before{
            opacity .2
          }
        }
      }
      
    }
    a {
      display: block;
      max-width: 240px;
      color: #333;
      text-overflow:ellipsis;
      overflow: hidden;
    }
  }
}
</style>