<template>
    <div class="archives-wrap">
        <main>
            <ul v-for="(value, key) in list" :key="`archives-blog-ul-${key}`">
                <li class="lead">
                    <span class="date-wrap">{{ value[0] }}</span>
                </li>
                <li v-for="(item, index) in value[1]" :key="`archives-blog-item-${key}-${index}`">
                    <span class="date-wrap">{{ mixin_getDate(item.frontmatter.date, 'dd') }}
                        <span class="time-wrap">{{ mixin_getDate(item.frontmatter.date, 'hh:mm:ss') }}</span>
                    </span>
                    <span class="title-wrap">
                        <router-link :to="item.regularPath">
                            {{ item.title }}
                        </router-link>
                    </span>
                </li>
            </ul>
        </main>
    </div>
</template>
<script>

export default {
    components: {
    },
    data() {
        return {

        }
    },
    computed: {
        list() {
            let list = this.$blogList.sort((a, b) => {
                return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
            })

            let map = new Map()

            list.forEach(item => {
                let timeFrom = item.frontmatter.date ? this.mixin_getDate(item.frontmatter.date, 'yyyy年MM月') : 'Other'
                if (!map.has(timeFrom)) {
                    map.set(timeFrom, [item])
                } else {
                    map.set(timeFrom, [...map.get(timeFrom), item])
                }
            })

            return [
                ...Array.from(map).filter(item => {
                    return item[0] != 'Other'
                }),
                ...Array.from(map).filter(item => {
                    return item[0] == 'Other'
                }),
            ]
        }
    },
    mounted() {
    },
    methods: {

    }
}
</script>
<style lang="stylus" scoped>
.archives-wrap {
    min-height: 100vh;
    margin-top:$navbarHeight;
    main{
        width 1200px;
        margin 0 auto;
        padding: 30px 0;

        ul{
            margin-bottom 1rem
            &:first-child{
                li:first-child::after{
                    display none
                }
            }
            li{
                
                display flex
                align-items center
                height 50px;
                position relative
                font-size: 1.1rem;
       
                .date-wrap{
                    font-size: 90%;
                    .time-wrap{
                        color:#6c757d;
                        opacity 0.6
                    }
                }
                .title-wrap{
                    flex:1
                    margin-left: 7rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    a:hover{
                        text-decoration:underline;
                    }
                }

                &:nth-child(even){
                    background-color: #fff
                    background-image: linear-gradient(to left, #fff, #fbfbfb, #fbfbfb, #fbfbfb, #fff);
                }
                &::before{
                    content: "";
                    display: block;
                    position:absolute;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                    width: 8px;
                    height: 8px;
                    left: 9rem;
                    margin-top 4px;
                    background-color: #c2c6cc;
                    box-shadow: 0 0 3px 0 #c2c6cc;
                    z-index: 2;
                }
                &::after{
                    content: "";
                    display: block;
                    width: 4px;
                    height: 50px;
                    position: absolute;
                    left: 9rem;
                    top:-25px;
                    margin-left 2px
                    background-color: rgba(0,0,0,0.075);
                    z-index: 1;
                }
                &.lead{
                    align-items start
                    &::before{
                        width: 12px;
                        height: 12px;
                        margin-left -2px;
                        margin-top 14px
                        background-color: #ffffff;
                        border: 3px solid #c2c6cc;
                    }
                    &::after{
                        top:-36px
                    }
                    .date-wrap{
                        font-size: 1.4rem;
                    }
                }
            }
        }
    }
}

@media (max-width: $MQMobile) {
    .archives-wrap {
        main{
            width 100%
            padding 30px 24px
            ul{
                width 100%
                .title-wrap{
                }
            }
        }
    }
}
</style>