<template>
    <div class="page-title-wrap">
        <div class="page-title">
            {{ $page.frontmatter.title || ($page.headers && $page.headers.length > 0 && $page.headers[0].title) ||
                    '标题未定义'
            }}
        </div>
        <div class="page-th-wrap">
            <span v-if="$page.frontmatter.date">
                <i class="gnas-i gnas-i-date" />
                {{ mixin_getDate($page.frontmatter.date,'yyyy-MM-dd hh:mm:ss') }}
            </span>
            <span
                v-if="$page.frontmatter.config && $page.frontmatter.config.tag && $page.frontmatter.config.tag.length > 0">
                <i class="gnas-i gnas-i-file" />
                {{ $tagFormat($page.frontmatter.config && $page.frontmatter.config.tag ||
                        []).map(item => item.name).join('，')
                }}
            </span>
            <span class="leancloud_comments" :id="valineId"
                v-if="$site.themeConfig.valine.enable && ($page.frontmatter.config && $page.frontmatter.config.valine)">
                <i class="gnas-i gnas-i-comment" />
                <i class="valine-comment-count" :data-xid="valineId"></i>
            </span>
            <span
                v-if="$site.themeConfig.valine.enable && ($page.frontmatter.config && $page.frontmatter.config.valine)"
                :id="valineId" class="leancloud_visitors">
                <i class="gnas-i gnas-i-eye" />
                <i class="leancloud-visitors-count"></i>
            </span>
        </div>

        <div class="page-summary" v-if="$page.frontmatter.summary">
            {{ $page.frontmatter.summary }}
        </div>
    </div>
</template>
<script>
export default {
    props: {

    },
    data() {
        return {
        }
    },
    computed: {
        valineId() {
            return this.$page.frontmatter.config && this.$page.frontmatter.config.valineId ? this.$page.frontmatter.config.valineId : this.$page.regularPath
        }
    }
}
</script>
<style lang="stylus" scoped>
.page-title-wrap{
    position relative
    margin-top:5.6rem;
    padding: 2rem 2.5rem 0rem;
    .page-title{
        position relative;
        margin-bottom: 1rem;
        font-weight:500;
        font-size: 1.875rem;
        line-height: 2.25rem;
        color:#2b3844;
    }
    .page-th-wrap {
        display flex
        align-items: center;
        flex-wrap:wrap;
        width: 100%;
        color: #2b3844;
        opacity .8
        font-size: 16px;
        span{
            margin-right: 1.25rem;
            i{
                margin-right: 0.375rem;
                font-size 16px;
            }
        }
        .leancloud_visitors {

            .shni {
                font-size: 20px;
            }

            .leancloud-visitors-count {
                font-style: normal;
            }
        }
        .leancloud_comments{
            .valine-comment-count{
                font-style: normal;
            }
        }
      
    }

    .page-summary{
        padding 2rem 0 2rem;
        color:#2b3844;
    }
}
</style>