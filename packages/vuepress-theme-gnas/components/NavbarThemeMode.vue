<template>
    <div @click="selectMode(currentMode == 'light' ? 'dark' : 'light')" class="btn-wrap">
        <i class="gnas-i gnas-i-yueliang" v-if="currentMode == 'light'"></i>
        <i class="gnas-i gnas-i-taiyang" style="color:#fff;font-size: 20px;" v-if="currentMode == 'dark'"></i>
    </div>
</template>
<script>
export default {
    data() {
        return {
            currentMode: 'light',
        }
    },
    mounted() {
        this.currentMode =
            localStorage.getItem('themeMode') != null
                ? localStorage.getItem('themeMode')
                : this.$site.themeConfig.themeMode.default || 'light'
        this.selectMode(this.currentMode)
    },
    methods: {
        selectMode(currentMode) {
            this.currentMode = currentMode
            localStorage.setItem('themeMode', currentMode)

            if (currentMode == 'dark') {
                document
                    .querySelectorAll('#app')[0]
                    .setAttribute('class', 'theme--dark')
            } else {
                document.querySelectorAll('#app')[0].setAttribute('class', '')
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.btn-wrap{
    cursor: pointer;
    display flex;
    align-items center;
    justify-content center;
    height: 30px;
    min-width: 40px;
    margin-top: 2px;
    margin-right: 12px;
    text-align: center;
    color: rgba(0, 0, 0, 0.54);
    border-radius: 5px;
    transition: all 0.5s ease;

    &:hover {
        background: rgba(0, 0, 0, 0.05);
    }

    i {
        font-size: 22px;
    }

    .gnas-i-yueliang{
        position relative;
        top:1px;
    }
}
</style>