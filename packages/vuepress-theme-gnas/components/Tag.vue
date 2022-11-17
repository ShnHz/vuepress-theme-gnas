<template>
    <span class="gnas-tag" :class="`gnas-tag-${type} gnas-tag--${effect}`">
        <i :class="icon" v-if="icon" />
        <slot>
        </slot>
    </span>
</template>
<script>
export default {
    props: {
        type: {
            type: [Number, String],
            default: ''
        },
        effect: {
            type: String,
            default: 'default'
            // default plain
        },
        icon: {
            type: String,
            default: ''
        }
    },
}
</script>
<style lang="stylus">
.gnas-tag {
    --color: #3eaf7c;
    &.gnas-tag-top,&.gnas-tag-git{
        --color : #171D20;
    }
    &.gnas-tag-tool{
        --color : #e47e2a;
    }
    &.gnas-tag-algorithm{
        --color : #b0202c;
    }
    &.gnas-tag-applets{
        --color : #20B041;
    }
    &.gnas-tag-vuepress{
        --color : #8E44AD;
    }
    &.gnas-tag-music,&.gnas-tag-movie{
        --color : #E6A23C;
    }
    &.gnas-tag-anecdote{
        --color : #185a9d;
    }

    display: inline-block;
    height: 20px;
    line-height:17px;
    padding: 0 5px;
    margin-right: 4px;

    font-size: 12px;
    border: 1px solid #000;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    vertical-align:middle

    color:#fff;
    background-color: var(--color);
    border-color: var(--color);

    &.gnas-tag--plain {
        background-color: white;
        border-color:var(--color);
        color: var(--color);
    }

    i{
        margin-right 0px
        font-size 12px
    }

    &:last-child {
        margin-right: 0;
    }
   
}
</style>
