<template>
    <div class="tag-wrap">
        <div :style="{ 'backgroundImage': $page.frontmatter.backgroundImage ? `url(${$page.frontmatter.backgroundImage})` : backgroundImage }"
            class="bg-wrap">
        </div>
        <main>
            <div class="tag-list-wrap">
                <Tag :key="`tag-${index}-${item.type}`"
                    v-for="(item, index) in [{ type: 'all', name: '全部' }, ...$tagList]" :type="item.type"
                    @click="tagClick" :effect="activeTag == item.type ? 'default' : 'plain'">
                    {{ item.name }}
                </Tag>
            </div>
            <BlogList :data="$blogFromTag(activeTag)" />
        </main>
    </div>
</template>
<script>
import BlogList from '@theme/components/home/BlogList'
import Tag from '@theme/components/Tag'

export default {
    components: {
        BlogList,
        Tag,
    },
    data() {
        return {
            backgroundImage: 'url(' + require('../svg/bg.svg') + ')',
        }
    },
    computed: {
        activeTag() {
            return this.$route.query.type || 'all'
        }
    },
    mounted() {
    },
    methods: {
        tagClick(type, effect) {
            this.$router.push({
                path: this.$route.path,
                query: {
                    type: type
                }
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
.tag-wrap {
    min-height: 100vh;
    margin-top:$navbarHeight;
    .bg-wrap{
        width 100vw;
        height 100vh;
        position fixed;
        top:0;
        left:0;

        background: transparent center center / cover no-repeat;
    }
    main{
        width 740px;
        position:relative;
        margin: 0 auto;
        padding: 30px 24px;
        .tag-list-wrap{
            width 100%
            padding: 1rem 1.2rem;
            border-radius: 8px;
            background: #fff;
            .gnas-tag{
                cursor pointer
            }
        }
        .blog-list-wrap{
            width 100%   
            margin-top 20px
        }
    }
}

@media (max-width: $MQMobile) {
        .tag-wrap {
            main{
                width: 100%;
            }
        }
    }
</style>