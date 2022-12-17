<template>
    <div class="friend-wrap">
        <div :style="{ 'backgroundImage': $page.frontmatter.backgroundImage ? `url(${$page.frontmatter.backgroundImage})` : backgroundImage }"
            class="bg-wrap">
        </div>
        <main>
            <div class="rule-card" v-html="$page.frontmatter.header || defaultRuleText"></div>
            <div class="friend-card-wrap-box">
                <div class="friend-card-wrap">
                    <div :key="item.href + item.icon" @click="localhref(item.href)" class="friend-card"
                        v-for="item in $page.frontmatter.friendLink || []">
                        <div>
                            <el-image lazy :src="item.icon">
                                <template #error>
                                    <div class="image-error-slot">
                                        <i class="el-icon-picture-outline"></i>
                                    </div>
                                </template>
                                <template #placeholder>
                                    <div class="image-error-slot">
                                        <i class="el-icon-picture-outline"></i>
                                    </div>
                                </template>
                            </el-image>
                            <div>
                                <a>{{ item.name }}</a>
                                <p>{{ item.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="valine-wrap">
                <Valine v-if="$site.themeConfig.valine.enable" />
            </div>
        </main>
    </div>
</template>
<script>
import Valine from '@theme/components/Valine.vue'

export default {
    components: {
        Valine
    },
    props: {
        bannerImg: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            backgroundImage: 'url(' + require('../svg/bg.svg') + ')',
        }
    },
    computed: {
        defaultRuleText(){
            return `
                <p style="font-size:20px;margin-bottom:30px">友链，申请规则</p>
                <p>
                    <b>header.md</b>内可以配置<b>header</b>字段，传入html代码
                </p>
                <p>
                    如果要和本站交换友链，请按照以下格式发送到
                    <a href="mailto:xxxxxxx@qq.com">xxxxxxx@qq.com</a>，或在下方留言区留言
                </p>
            `
        }
    },
    mounted() {
    },
    methods: {
        localhref(url) {
            window.open(url)
        },
    }
}
</script>
<style lang="stylus" scoped>
.friend-wrap {
    min-height: 100vh;
    margin-top: $navbarHeight;
    .bg-wrap{
        z-index 0;
        width 100vw;
        height 100vh;
        position fixed;
        top:0;
        left:0;

        background: transparent center center / cover no-repeat;
    }
    main {
        width: 740px;
        min-height: 1000px;
        margin: 0 auto;
        padding: 12px;

        .rule-card,
        >.valine-wrap {
            position: relative;
            padding: 12px;

            border-radius: 8px;
            box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.05);
            background-color: #fff;

            ::v-deep .valine-wrap {
                margin: 0;
                padding 0
            }
        }

        .rule-card {
            overflow: hidden;
            font-size: 0.875rem;
            color: rgba(0, 0, 0, 0.87);

            ::v-deep {
                >div {
                    margin-top: 20px;
                    padding: 10px;
                    line-height: 3;
                    border-radius: 5px;
                    border: 1px dashed #bbb;
                }
            }
        }

        .friend-card-wrap-box {
            z-index 1
            min-height: 100px;
            position relative;
            margin: 12px 0;
            border-radius: 5px;
            overflow: hidden;
        }

        .friend-card-wrap {
            display: flex;
            flex-wrap: wrap;
            flex: 1 1 auto;
            margin-right: -12px;
            margin-left: -12px;
            margin-top: -12px;

            .friend-card {
                cursor: pointer;
                flex: 0 0 50%;
                max-width: 50%;
                width: 100%;
                padding: 12px 12px 0;

                &:nth-child(2n) {
                    padding-left: 6px;
                }

                &:nth-child(2n + 1) {
                    padding-right: 6px;
                }

                &:hover {
                    >div {
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                    }
                }

                >div {
                    display: flex;
                    border-radius: 8px;
                    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.05);
                    background-color: #fff;
                    color: rgba(0, 0, 0, 0.87);
                    padding: 12px;
                    transition: 0.5s box-shadow ease;

                    ::v-deep .el-image {
                        flex: none;
                        width: 60px;
                        height: 60px;
                        border-radius: 5px;
                        margin-right: 20px;

                        .image-error-slot {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 100%;
                            height: 100%;
                            background: #f5f7fa;
                            color: #909399;
                        }
                    }

                    div {
                        flex: 1;
                        line-height: 2;

                        a {
                            font-size: 15px;
                        }

                        p {
                            height: 44px;
                            font-size: 13px;
                            color: rgba(0, 0, 0, 0.6);
                        }
                    }
                }
            }
        }
    }
}

@media (max-width: $MQMobile) {
    .friend-wrap {
        main {
            width: 100%;
            min-height: 800px;

            .friend-card {
                flex: 0 0 100% !important;
                max-width: 100% !important;
            }
        }
    }
}
</style>