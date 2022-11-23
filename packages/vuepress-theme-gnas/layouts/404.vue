<template>
    <div class="page-404-wrap" :style="{ 'backgroundImage': backgroundImage }">
        <component is="script" src="//cdn.dnpw.org/404/v2.min.js" maincolor="#F00" jumptime="-1" jumptarget="/"
            tips="404" error="" charset="utf-8" v-if="$site.themeConfig.notFoundPagePublicWelfare != false" />

        <div class="page-404-content theme-container" v-else>
            <div class="theme-default-content">
                <h1>404</h1>

                <h2>{{ getMsg() }}</h2>

                <RouterLink to="/">
                    Take me home.
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            msgs: [
                `There's nothing here.`,
                `How did we get here?`,
                `That's a Four-Oh-Four.`,
                `Looks like we've got some broken links.`
            ],
            backgroundImage: 'url(' + require('../svg/bg.svg') + ')',
        };
    },
    methods: {
        getMsg() {
            return this.msgs[Math.floor(Math.random() * this.msgs.length)]
        }
    },
}
</script>
<style lang="stylus">
.page-404-wrap{
    z-index: 999999;
    display flex
    align-items:center;
    justify-content:center;
    min-height 100vh;
    position: relative;
    background: #fff center center / cover no-repeat;
    .page-404-content{
        margin-top -6rem;
        h1{
            font-size: 80px
        }
        h2{
            padding-bottom 2rem;
        }
    }
}
</style>
