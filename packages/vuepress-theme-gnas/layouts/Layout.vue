<template>
    <CommonLayout :sidebarItems="sidebarItems" :shouldShowNavbar="shouldShowNavbar"
        :shouldShowSidebar="shouldShowSidebar" :bannerImg="bannerImg" @toggleSidebar="toggleSidebar">
        <PageHome v-if="$page.frontmatter.home" :bannerImg="bannerImg" />
        <PageFriend v-else-if="$page.frontmatter.mode == 'friend'" />
        <PageTag v-else-if="$page.frontmatter.mode == 'tag'" />
        <PageArchives v-else-if="$page.frontmatter.mode == 'archives'" />
        <Page :sidebar-items="sidebarItems" v-else />

        <FirstLoading :bannerImg="bannerImg" v-if="$site.themeConfig.firstLoading != false" />
    </CommonLayout>
</template>
<script>
import { resolveSidebarItems } from '../util'

import CommonLayout from '@theme/layouts/CommonLayout.vue'
import PageHome from '@theme/layouts/PageHome.vue'
import PageFriend from '@theme/layouts/PageFriend.vue'
import PageTag from '@theme/layouts/PageTag.vue'
import PageArchives from '@theme/layouts/PageArchives.vue'
import Page from '@theme/layouts/Page.vue'

import FirstLoading from '@theme/components/FirstLoading.vue'

export default {
    components: {
        CommonLayout,
        PageHome,
        PageFriend,
        PageTag,
        PageArchives,

        Page,

        FirstLoading
    },
    data() {
        return {
        }
    },
    computed: {
        shouldShowNavbar() {
            const { themeConfig } = this.$site
            const { frontmatter } = this.$page
            if (frontmatter.navbar === false || themeConfig.navbar === false) {
                return false
            }
            return (
                this.$title ||
                themeConfig.logo ||
                themeConfig.repo ||
                themeConfig.nav ||
                this.$themeLocaleConfig.nav
            )
        },
        shouldShowSidebar() {
            const { frontmatter } = this.$page
            return (
                !frontmatter.home &&
                frontmatter.sidebar !== false &&
                this.sidebarItems.length
            )
        },
        sidebarItems() {
            return resolveSidebarItems(
                this.$page,
                this.$page.regularPath,
                this.$site,
                this.$localePath
            )
        },
        bannerImg() {
            let index = Math.floor(Math.random() * this.$site.themeConfig.home.bannerList.length)
            return this.$site.themeConfig.home.bannerList[index]
        }
    },
    watch: {
        $route: {
            handler: function (to, from) {
            },
            immediate: true,
        },
    },
    mounted() {

    },
    methods: {
        toggleSidebar(isSidebarOpen) {
            this.$emit('toggle-sidebar', isSidebarOpen)
        },
    },
}
</script>
<style lang="stylus">

</style>
