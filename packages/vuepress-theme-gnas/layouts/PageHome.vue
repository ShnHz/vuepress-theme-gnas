<template>
    <div class="home-wrap">
        <!-- banner -->
        <div :style="{ 'background-image': `url(${bannerImg})` }" class="banner-wrap">
        </div>

        <!-- title -->
        <div class="title-wrap">
            <img alt :src="$site.themeConfig.home.titleLogo"
                v-if="$site.themeConfig.home && $site.themeConfig.home.titleLogo" />

            <div>
                <h1>{{ $site.themeConfig.home.title || $site.title }}</h1>
                <p>{{ $site.themeConfig.home.description || $site.description }}</p>
            </div>
        </div>


        <main>
            <BlogList :data="blogList" />

            <aside>
                <AuthorInfo v-if="$site.themeConfig.home.authorConfig.enable" />
                <LoveInfo v-if="$site.themeConfig.home.loveConfig.enable" />
                <CarouselInfo v-if="$site.themeConfig.home.carouselConfig.enable" />
                <TagInfo v-if="$site.themeConfig.home.tagConfig.enable" />
            </aside>
        </main>
    </div>
</template>
<script>
import BlogList from '@theme/components/home/BlogList'
import AuthorInfo from '@theme/components/home/AuthorInfo'
import LoveInfo from '@theme/components/home/LoveInfo'
import CarouselInfo from '@theme/components/home/CarouselInfo'
import TagInfo from '@theme/components/home/TagInfo'

export default {
    components: {
        BlogList,
        AuthorInfo,
        LoveInfo,
        CarouselInfo,
        TagInfo
    },
    props: {
        bannerImg: {
            type: String,
            default: ''
        },
    },
    data() {
        return {

        }
    },
    computed: {
        blogList() {
            let topList = this.$blogList.filter(item => {
                return item.frontmatter.config && item.frontmatter.config.top
            }).sort((a, b) => {
                return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
            })
            let otherList = this.$blogList.filter(item => {
                return !(item.frontmatter.config && item.frontmatter.config.top)
            }).sort((a, b) => {
                return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
            })
            return [...topList, ...otherList]
        }
    },
    mounted() {
    }
}
</script>
<style lang="stylus" scoped>
.home-wrap {
    min-height: 100vh;

    .banner-wrap {
        width: 100%;
        height: 600px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title-wrap {
        width: 100%;
        height: 600px;
        position: absolute;
        top: 0;
        left: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        >div {
            color: #fff;
            text-align: center;
            letter-spacing: 5px;
            text-indent: 5px;

            h1 {
                font-size: 2rem;
            }

            p {
                margin-top: 30px;
                font-size: 1.2rem;
            }
        }

        img {
            width: 7rem;
            margin-right: 40px;
            border-radius: 50%;
        }
    }

    main{
        display:flex;
        width 1200px;
        position:relative;
        margin: 0 auto;
        padding: 30px 24px;
        .blog-list-wrap{
            width calc(75% - 15px)    
        }
        aside{
            width: 25%;
            margin-left: 15px;
        }
    }
}

@media (max-width: $MQMobile) {
        .home-wrap {
            .title-wrap{
                img{
                    display:none;
                }
            }
            main{
                width: 100%;
                flex-direction: column;
                .blog-list-wrap{
                    width 100%
                }
                aside{
                    order: -1;
                    width 100%;
                    margin-left 0
                    margin-bottom :20px;
                }
            }
        }
    }
</style>