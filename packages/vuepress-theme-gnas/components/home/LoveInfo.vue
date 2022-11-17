<template>
    <div class="love-info-wrap">
        <div class="avatar-info">
            <img alt :src="$site.themeConfig.home.loveConfig.boy" />
            <i class="gnas-i gnas-i-love"></i>
            <img alt :src="$site.themeConfig.home.loveConfig.girl" />
        </div>
        <p>{{ daysNum }} 天 {{ hoursNum }} 时 {{ minutesNum }} 分 {{ secondsNum }} 秒
        </p>
    </div>
</template>
<script>

export default {
    data() {
        return {
            daysNum: '∞',
            hoursNum: '∞',
            minutesNum: '∞',
            secondsNum: '∞',
        }
    },
    mounted() {
        let _this = this
        let countDownDate = Date.parse(new Date(this.$site.themeConfig.home.loveConfig.startDay))
        let x = setInterval(function () {
            let now = Date.parse(new Date())
            var diff = now - countDownDate
            _this.daysNum = Math.floor(diff / (1000 * 60 * 60 * 24))
            _this.hoursNum = Math.floor(
                (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )
            _this.minutesNum = Math.floor(
                (diff % (1000 * 60 * 60)) / (1000 * 60)
            )
            _this.secondsNum = Math.floor((diff % (1000 * 60)) / 1000)
        }, 1000)

        this.$once('hook:beforeDestroy', () => {
            clearInterval(x)
        })
    }
}
</script>
<style lang="stylus">
.love-info-wrap {
    width 100% 
    padding: 1rem 1.2rem;
    margin-top:20px;
    border-radius: 8px;
    background: #fff;

    text-align: center;

    .avatar-info {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: #fff 2px solid;
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
        margin: 0 20px;
        }

        i {
        color: #f56c6c;
        animation: xintiao 1.33s ease-in-out infinite;
        }

        @keyframes xintiao {
        0% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }

        50% {
            -webkit-transform: scale(0.8);
            transform: scale(0.8);
        }

        to {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
        }
    }

    p {
        margin-top: 10px;
    }
}
</style>