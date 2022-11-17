<template>
    <div class="author-info-wrap">
        <div class="avatar-info">
            <img :src="$site.themeConfig.home.authorConfig.avatar" />
            <p>{{$site.themeConfig.author}}</p>
        </div>
        <div class="data-info">
            <div @click="$router.push('/blog/Archives.html')" class="data-info-item">
                <p class="data-info-item-title">文章</p>
                <p class="data-info-item-data">{{ $blogList.length }}</p>
            </div>
            <div class="data-info-item">
                <p class="data-info-item-title">标签</p>
                <p class="data-info-item-data">{{ $tagList.length }}</p>
            </div>
        </div>
        <div @click="addBookMark" class="add-bookmark" v-if="$site.themeConfig.home.authorConfig.bookmark">
            <i class="el-icon-s-flag"></i>
            加入书签
        </div>
        <div class="social-info">
            <a :href="$site.themeConfig.home.authorConfig.github" v-if="$site.themeConfig.home.authorConfig.github">
                <i class="gnas-i gnas-i-github-fill"></i>
            </a>
            <i @click="openAlipay" class="gnas-i gnas-i-alipay" v-if="$site.themeConfig.home.authorConfig.alipay"></i>
            <i @click="openQQ" class="gnas-i gnas-i-QQ-circle-fill" v-if="$site.themeConfig.home.authorConfig.qq"></i>
            <i @click="openWechat" class="gnas-i gnas-i-wechat-fill" v-if="$site.themeConfig.home.authorConfig.wx"></i>
            <a :href="`mailto:${$site.themeConfig.home.authorConfig.email}`" v-if="$site.themeConfig.home.authorConfig.email">
                <i class="gnas-i gnas-i-email"></i>
            </a>
        </div>
    </div>
</template>
<script>

export default {
    methods: {
        /**
     * 添加书签
     */
        addBookMark() {
            this.$notify({
                message: '按 CTRL + D 将本页加入书签',
                position: 'bottom-right',
                showClose: false,
                duration: 2000,
                customClass: 'main-them-notify',
            })
        },
        /**
         * 打开QQ
         */
        openQQ() {
            this.$notify({
                message: `QQ号：${this.$site.themeConfig.home.authorConfig.qq}`,
                position: 'bottom-right',
                showClose: true,
                duration: 0,
                customClass: 'main-them-notify',
            })
        },
        /**
         * 打开微信
         */
        openWechat() {
            this.$notify({
                message: `微信号：${this.$site.themeConfig.home.authorConfig.wx}`,
                position: 'bottom-right',
                showClose: true,
                duration: 0,
                customClass: 'main-them-notify',
            })
        },
        /**
         * 打开支付宝
         */
        openAlipay() {
            this.$notify({
                title: '打赏一下吧~',
                position: 'bottom-right',
                dangerouslyUseHTMLString: true,
                message:
                    `<img src="${this.$site.themeConfig.home.authorConfig.alipay}" style="width:200px"/>`,
                duration: 0,
                customClass: 'ercode-notify',
            })
        },
    }
}
</script>
<style lang="stylus">
.author-info-wrap {
    width 100% 
    padding: 1rem 1.2rem;
    border-radius: 8px;
    background: #fff;

    color: #333;

    .avatar-info {
        text-align: center;
        font-weight: 600;

        img {
            height 80px;
            width 80px;
            border-radius: 50%;
            transform: none;

            &:hover {
                transform: rotate(666turn);
                transition-delay: 1s;
                transition-property: all;
                transition-duration: 59s;
                transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
            }
        }
    }

    .data-info {
        display: flex;
        padding: 0.7rem 0;
        text-align: center;

        .data-info-item {
            cursor: pointer;
            flex: 1;

            .data-info-item-data {
                font-size: 1rem;
                font-weight: 600;
            }
        }
    }

    .add-bookmark {
        cursor: pointer;
        background-color: #333;
        color: #fff;
        line-height: 2rem;
        text-align: center;
        font-size: 14px;
        transition: all 0.3s ease;

        i {
            position: relative;
            top: 1px;
        }

        &:hover {
            background: #3eaf7c;
        }
    }

    .social-info {
        padding: 1rem 1.5rem;

        i {
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 26px;
            margin-right: 10px;
            color: #333;

            &:hover {
                color: #3eaf7c;
            }
        }
    }
}
</style>