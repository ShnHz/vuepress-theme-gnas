<template>
    <li class="blog-item-wrap">
        <router-link :to="data.regularPath" class="article-title">{{ data.title }}</router-link>
        <p class="article-date">{{ mixin_getDate(data.frontmatter && data.frontmatter.date,
                $site.themeConfig.blogItemCofig &&
                $site.themeConfig.blogItemCofig.dateFormat || 'yyyy.MM.dd')
        }}</p>

        <p class="article-summary" v-if="data.frontmatter && data.frontmatter.summary">{{ data.frontmatter.summary }}
        </p>

        <p>
            <Tag v-if="data.frontmatter && data.frontmatter.config && data.frontmatter.config.top" type="top"
                icon="gnas-i gnas-i-pushpin-fill">
                置顶
            </Tag>
            <Tag :key="`tag-${index}-${item.type}`"
                v-for="(item, index) in $tagFormat(data.frontmatter && data.frontmatter.config && data.frontmatter.config.tag || [])" :type="item.type">
                {{ item.name }}
            </Tag>
        </p>
    </li>
</template>
<script>
import Tag from '@theme/components/Tag'

export default {
    components: {
        Tag
    },
    props: {
        data: {
            type: Object,
        },
    },
}
</script>
<style lang="stylus">
.blog-item-wrap{
    width 100%
    padding: 1rem 1.2rem;
    border-radius: 8px;
    background: #fff;

    &:not(:first-child) {
        margin-top: 20px;
    }
    .article-title {
        font-size: 18px;
        color: rgba(0, 0, 0, 0.87);
        line-height: 1.5;
    }

    .article-date {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
    }

    .article-summary {
        padding: 16px 0 10px;
        color: rgba(0, 0, 0, 0.87);
        font-size: 14px;
        line-height: 1.375rem;
        font-weight: 400;
    }
}
</style>