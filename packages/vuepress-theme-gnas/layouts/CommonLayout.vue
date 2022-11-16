<template>
    <div class="theme-container" :class="pageClasses">
        <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

        <slot>
        </slot>

        <Footer :bannerImg="bannerImg" />
    </div>
</template>
<script>
import Navbar from '@theme/components/Navbar.vue'
import Footer from '@theme/components/Footer.vue'

export default {
    components: {
        Navbar,
        Footer
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
            type: [Boolean,Number],
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
                },
                userPageClass,
            ]
        },
    },
    watch: {

    },
    mounted() {

    },
    methods: {
        toggleSidebar(to) {
            this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
            this.$emit('toggle-sidebar', this.isSidebarOpen)
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
    },
}
</script>
<style lang="stylus">

</style>
