<template>
    <ul class="blog-list-wrap">
        <BlogItem v-for="(item,index) in $blogList" :key="`blog-item-${index}`" :data="item" />
    </ul>
</template>
<script>
import BlogItem from '@theme/components/home/BlogItem'

export default {
    components: {
        BlogItem
    },
}
</script>
<style lang="stylus">
.blog-list-wrap{
    width 100%
}
</style>