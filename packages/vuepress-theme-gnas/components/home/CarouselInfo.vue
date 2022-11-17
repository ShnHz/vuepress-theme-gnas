<template>
    <div class="carousel-info-wrap">
        <el-carousel :interval="10000" arrow="always" direction="vertical" trigger="click">
            <el-carousel-item :key="item.title" v-for="item in $site.themeConfig.home.carouselConfig.list">
                <div :style="{
                    'background-image': `url(${item.bg})`,
                    'background-position': 'center center',
                    'background-size': 'cover'
                }" class="card-carousel-item">
                    <div>
                        <h2>{{ item.title }}</h2>
                        <p>{{ item.content }}</p>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>

export default {
    data() {
        return {

        }
    },
}
</script>
<style lang="stylus">
.carousel-info-wrap {
    width 100% 
    padding: 0 0;
    margin-top:20px;
    border-radius: 8px;
    background: #fff;

    overflow: hidden;

    .card-carousel-item {
        position: relative;
        width: 100%;
        height: 100%;

        >div {
            position: absolute;
            bottom: 0;
            padding: 2rem 1.4rem;

            h2 {
                color: #fff;
                font-size: 26px;
                padding-bottom: 0.5rem;
            }

            p {
                color: #fff;
                font-size: 14px;
            }
        }
    }
}
</style>