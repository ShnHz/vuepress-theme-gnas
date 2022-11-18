<template>
    <CommonLayout :sidebarItems="sidebarItems" :shouldShowNavbar="shouldShowNavbar"
        :shouldShowSidebar="shouldShowSidebar" :bannerImg="bannerImg">
        <CommonHome v-if="$page.frontmatter.home" :bannerImg="bannerImg" />
        <CommonFriend v-else-if="$page.frontmatter.friend"/>
        <CommonTag v-else-if="$page.frontmatter.tag"/>
        <Page :sidebar-items="sidebarItems" v-else />
    </CommonLayout>
</template>
<script>
import { resolveSidebarItems } from '../util'

import CommonLayout from '@theme/layouts/CommonLayout.vue'
import CommonHome from '@theme/layouts/CommonHome.vue'
import CommonFriend from '@theme/layouts/CommonFriend.vue'
import CommonTag from '@theme/layouts/CommonTag.vue'

import Page from '@theme/components/Page.vue'

export default {
    components: {
        CommonLayout,
        CommonHome,
        CommonFriend,
        CommonTag,

        Page
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
    },
}
</script>
<style lang="stylus">

</style>
