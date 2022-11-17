<template>
    <div class="tag-info-wrap">
        <Tag :key="`tag-${index}-${item.type}`"
            v-for="(item, index) in $tagList" :type="item.type">
            {{ item.name }}
        </Tag>
    </div>
</template>
<script>
import Tag from '@theme/components/Tag'

export default {
    components: {
        Tag,
    },
    data() {
        return {

        }
    },
}
</script>
<style lang="stylus">
.tag-info-wrap {
    width 100% 
    line-height 1.8
    padding: 1rem 1.2rem;
    margin-top:20px;
    border-radius: 8px;
    background: #fff;

    .gnas-tag{
        cursor pointer
    }
}
</style>