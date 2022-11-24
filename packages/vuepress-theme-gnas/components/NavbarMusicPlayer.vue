<template>
    <div class="music-player-wrap">
        <el-popover placement="top" width="248" v-model="visible" popper-class="music-player-popper">
            <span class="btn-wrap" slot="reference">
                <i class="gnas-i gnas-i-music"></i>
            </span>
            <div class="player-wrap">
                <div class="function-wrap">
                    <i class="gnas-i gnas-i-music-next2 reversal"></i>
                    <i :class="playerStatus == 'pause' ? 'gnas-i gnas-i-music-start' : 'gnas-i gnas-i-music-pause'"
                        @click="playerStatus == 'pause' ? start() : pause()"></i>
                    <i class="gnas-i gnas-i-music-next2"></i>
                </div>

                <div class="music-wrap">
                    <p class="music-name">{{ active.music.name }}</p>
                    <p class="slider-info-wrap">
                        <span class="active-time">{{ active.currentTimeStr }}</span>
                        <span class="all-time">{{ active.durationStr }}</span>
                    </p>
                    <p class="slider-wrap">
                        <el-slider v-model="active.currentTime" :show-tooltip="false" :min="0" :max="active.duration"
                            @change="sliderChange">
                        </el-slider>
                    </p>
                </div>
            </div>
            <audio id="globalAudio" :src="active.music && active.music.href" type="audio/mp3" @timeupdate="updata"
                @canplay="canplay" :autoplay="$site.themeConfig.music.autoplay" preload="meta"></audio>
        </el-popover>
    </div>
</template>
<script>
export default {
    data() {
        return {
            visible: true,
            loading: true,

            playerStatus: 'pause',
            active: {
                index: 0,
                currentTime: 0,
                duration: 0,
                music: {}
            },
            audio: null
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.active.music = this.$site.themeConfig.music.list[this.active.index]
        },
        canplay() {
            this.audio = document.getElementById("globalAudio");
            this.active.currentTime = 0
            this.active.currentTimeStr = '0:00'
            this.active.duration = this.audio.duration
            this.active.durationStr = this.formatTime(this.audio.duration)

            this.loading = false
        },
        start() {
            this.playerStatus = 'played'
            this.audio.play()
        },
        pause() {
            this.playerStatus = 'pause'
            this.audio.pause()
        },
        updata() {
            this.active.currentTime = this.audio.currentTime
            this.active.currentTimeStr = this.formatTime(this.audio.currentTime)
        },

        formatTime(time) {
            let m = Math.round(time / 60)
            let s = Math.round(time % 60)

            return `${m}:${s < 10 ? '0' + s : s}`
        },

        sliderChange(time) {
            console.log(time)
        }
    }
}
</script>
<style lang="stylus">
.music-player-wrap{
    display fixed;
    .btn-wrap{
        cursor: pointer;
        display flex;
        align-items center;
        justify-content center;
        height: 30px;
        min-width: 40px;
        margin-top: 2px;
        text-align: center;
        color: rgba(0, 0, 0, 0.54);
        border-radius: 5px;
        transition: all 0.5s ease;

        &:hover {
            background: rgba(0, 0, 0, 0.05);
        }

        i {
            font-size: 20px;
        }
    }
}

.music-player-popper{
    padding 20px 12px;
    background #2f3133;
    border:none;
    border-radius 8px;
    .popper__arrow{
        border-bottom-color:  #2f3133 !important;
        &:after{
            border-bottom-color:  #2f3133 !important;
        }
    }
    audio{
        position :fixed;
        top:-1000px;
        opacity 0;
    }
    .player-wrap{
        display flex;
        align-items:center;
        flex-direction:column;

        .function-wrap{
            display flex;
            align-items:center;
            margin-bottom 20px;
            i{
                cursor pointer;
                margin 0 8px;
                color #fff;
                font-size: 32px;
                &.reversal{
                    transform: rotate(180deg);
                }
                &.gnas-i-music-next2{
                    margin -2px 10px 0;
                    font-size 20px;
                }
            }
        }

        .music-wrap{
            width 280px;
            padding 0 36px;
            text-align:center;
            p{
                line-height 1.2 !important;
            }
            .music-name{
                overflow: hidden; 
                white-space: nowrap; 
                text-overflow: ellipsis;
                color:#fff;
            }
            .slider-info-wrap{
                display flex
                justify-content: space-between
                width 100%;
                margin-top 6px;
            }
            .slider-wrap{
                .el-slider{
                    .el-slider__runway{
                        height 4px;
                        margin: 6px 0;
                        background-color:#555;
                        .el-slider__bar{
                            background-color:#fff;
                        }
                        .el-slider__button-wrapper{
                            .el-slider__button{
                                height 14px;
                                width 14px;
                                border none;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>