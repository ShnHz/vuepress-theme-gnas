<template>
    <CommonLayout :sidebarItems="sidebarItems" :shouldShowNavbar="shouldShowNavbar" v-if="isRouterAlive"
        :shouldShowSidebar="shouldShowSidebar" :bannerImg="bannerImg" @toggleSidebar="toggleSidebar">
        <PageLock v-if="isLock" />
        <PageHome v-else-if="$page.frontmatter.home" :bannerImg="bannerImg" />
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
import PageLock from '@theme/layouts/PageLock.vue'
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
        PageLock,

        FirstLoading
    },
    data() {
        return {
            isRouterAlive: true
        }
    },
    computed: {
        // 当前页面是否被加密
        isLock() {
            // 确保vue监听到数据使isLock变化
            if (this.isRouterAlive) void (0)

            // main
            if (this.$page.frontmatter.password) {
                if (this.isCommonPw) {
                    return sessionStorage.getItem('gnasCommonLock') != 'unlock'
                } else {
                    return sessionStorage.getItem(`gnasPageLock-${this.$page.regularPath}`) != 'unlock'
                }
            }
            return false
        },
        // 如果是加密页面，页面密码是否为通用密码
        isCommonPw() {
            let pagePw = this.$page.frontmatter.password
            let commonPw = this.$site.themeConfig.password
            return pagePw == true || pagePw == commonPw
        },
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
                this.sidebarItems.length && !['friend', 'tag', 'archives'].includes(frontmatter.mode) && !this.$page.regularPath.includes(this.$site.themeConfig.blogBase)
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
        reload() {
            this.isRouterAlive = false
            this.$nextTick(() => {
                this.isRouterAlive = true
            })
        },
        toggleSidebar(isSidebarOpen) {
            this.$emit('toggle-sidebar', isSidebarOpen)
        },
    },
    provide() {
        return {
            reload: this.reload
        }
    }
}
</script>
<style lang="stylus">

</style>
