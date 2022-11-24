<template>
    <div class="theme-container" :class="pageClasses" @touchend="onTouchEnd" @touchstart="onTouchStart">
        <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />
        <Sidebar v-if="shouldShowSidebar" :items="sidebarItems" @toggle-sidebar="toggleSidebar" />
        <slot>
        </slot>
        <Footer :bannerImg="bannerImg" />
    </div>
</template>
<script>
import Navbar from '@theme/components/Navbar.vue'
import Footer from '@theme/components/Footer.vue'
import Sidebar from '@theme/components/Sidebar.vue'

export default {
    components: {
        Navbar,
        Footer,
        Sidebar,
    },
    props: {
        sidebarItems: {
            type: Array,
            default: () => []
        },
        shouldShowNavbar: {
            type: [Boolean, String],
            default: true
        },
        shouldShowSidebar: {
            type: [Boolean, Number],
            default: true
        },
        bannerImg: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            isSidebarOpen: false,
            touchStart: {}
        }
    },
    computed: {
        pageClasses() {
            const userPageClass = this.$page.frontmatter.pageClass
            return [
                {
                    'no-navbar': !this.shouldShowNavbar,
                    'sidebar-open': this.isSidebarOpen,
                    'no-sidebar': !this.shouldShowSidebar,
                    'index': this.$page.frontmatter.home,
                    'friend': this.$page.frontmatter.mode == 'friend',
                    'tag': this.$page.frontmatter.mode == 'tag',
                    'archives': this.$page.frontmatter.mode == 'archives',
                    'blog': this.$page.regularPath.includes(this.$site.themeConfig.blogBase),
                    'directory-wrap': this.$page.frontmatter.config && this.$page.frontmatter.config.dir && this.$page.regularPath.includes(this.$site.themeConfig.blogBase),
                    'directory': this.$page.frontmatter.config && this.$page.frontmatter.config.dir && !this.$page.regularPath.includes(this.$site.themeConfig.blogBase)
                },
                userPageClass,
            ]
        },
    },
    watch: {

    },
    mounted() {
        this.$router.afterEach(() => {
            this.isSidebarOpen = false
        })

        if (this.$site.themeConfig.valine.enable && this.$site.themeConfig.valine.globalAccess) {
            this.addGlobalAccess()
        }
    },
    methods: {
        toggleSidebar(to) {
            this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
            this.$emit('toggleSidebar', this.isSidebarOpen)
        },

        // side swipe
        onTouchStart(e) {
            this.touchStart = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY,
            }
        },
        onTouchEnd(e) {
            const dx = e.changedTouches[0].clientX - this.touchStart.x
            const dy = e.changedTouches[0].clientY - this.touchStart.y


            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
                if (dx > 0 && this.touchStart.x <= 80) {
                    this.toggleSidebar(true)
                } else {
                    this.toggleSidebar(false)
                }
            }
        },

        // 记录全局访问量
        addGlobalAccess(Counter, currPath = '/') {
            // let lvs = Utils.findAll(document, '.leancloud_visitors,.leancloud-visitors');
            // if (lvs.length) {
            //     let lv = lvs[0];
            //     let url = Utils.attr(lv, 'id');
            //     let title = Utils.attr(lv, 'data-flag-title');
            //     let xid = encodeURI(url);
            //     let o = {
            //         el: lv,
            //         url: url,
            //         xid: xid,
            //         title: title
            //     }
            //     // 判断是否需要+1
            //     if (decodeURI(url) === decodeURI(currPath)) {
            //         let query = new AV.Query(Counter);
            //         query.equalTo('url', url);
            //         query.find().then(ret => {
            //             if (ret.length > 0) {
            //                 let v = ret[0];
            //                 v.increment("time");
            //                 v.save().then(rt => {
            //                     Utils.find(lv, '.leancloud-visitors-count').innerText = rt.get('time')
            //                 }).catch(ex => {
            //                     console.log(ex)
            //                 });
            //             } else {
            //                 createCounter(Counter, o)
            //             }
            //         }).catch(ex => {
            //             ex.code == 101 && createCounter(Counter, o)
            //         })
            //     } else CounterFactory.show(Counter, lvs)
            // }
        }
    },
}
</script>
<style lang="stylus">

</style>
