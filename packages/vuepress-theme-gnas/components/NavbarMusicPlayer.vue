<template>
    <div class="music-player-wrap">
        <el-popover placement="top" width="324" v-model="visible" popper-class="music-player-popper">
            <span class="btn-wrap" slot="reference" :class="{ 'rotate': playerStatus == 'played' }">
                <i class="gnas-i gnas-i-music"></i>
            </span>
            <div class="player-wrap">
                <div class="function-wrap">
                    <i class="gnas-i gnas-i-music-next2 reversal" :class="{ 'disabled': musicList.length <= 1 }"
                        @click="musicList.length > 1 && prev()"></i>
                    <p class="music-name">{{ active.music.name }}</p>
                    <i class="gnas-i gnas-i-music-next2" @click="musicList.length > 1 && next()"
                        :class="{ 'disabled': musicList.length <= 1 }"></i>
                </div>
                <audio id="globalAudio" :src="active.music && active.music.href" type="audio/mp3" @canplay="canplay"
                    :autoplay="autoplay" preload="meta" controls="controls" @ended="ended"
                    @play="played = true; playerStatus = 'played'" @pause="playerStatus = 'pause'"></audio>
            </div>
        </el-popover>
    </div>
</template>
<script>
export default {
    data() {
        return {
            visible: false,
            loading: true,

            playerStatus: 'pause',
            active: {
                index: 0,
                music: {}
            },
            audio: null,
            played: null
        }
    },
    computed: {
        musicList() {
            return this.$site.themeConfig.music.list
        },
        autoplay() {
            return this.$site.themeConfig.music.autoplay || this.played
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.loading = true
            this.active.music = this.musicList[this.active.index]
        },
        canplay() {
            this.audio = document.getElementById("globalAudio");
            this.loading = false
        },
        prev() {
            this.played = true
            this.active.index = this.active.index == 0 ? this.musicList.length - 1 : this.active.index - 1
            this.loading = true
            this.active.music = this.musicList[this.active.index]
        },
        next() {
            this.played = true
            this.active.index = this.active.index == this.musicList.length - 1 ? 0 : this.active.index + 1
            this.loading = true
            this.active.music = this.musicList[this.active.index]
        },
        ended() {
            if (this.musicList.length <= 1) {
                this.init()
            } else {
                this.next()
            }
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
            transition: all .4s;
        }

        &.rotate{
            i{
                color:$accentColor;
                animation:rotate 8s infinite;
            }
        }

        @keyframes rotate {
            100%{
                transform:rotate(360deg);
            }
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
        // position :fixed;
        // top:-1000px;
        // opacity 0;
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
                &.disabled{
                    cursor : not-allowed
                    color:rgba(255,255,255,.2)
                }
                &.gnas-i-music-next2{
                    margin -2px 10px 0;
                    font-size 20px;
                }
            }

            .music-name{
                width 200px;
                overflow: hidden; 
                white-space: nowrap; 
                text-overflow: ellipsis;
                text-align:center;
                color:#fff;
            }
        }

    }
}

@media screen  and (max-width: 340px){
    .music-player-popper{
        width 100vw !important;
        left:0 !important;
        border-radius:0 !important;
        .popper__arrow{
            display none;
        }
        audio{
            width calc(100vw - 24px)
        }
    }
}
</style>