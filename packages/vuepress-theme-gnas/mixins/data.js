export default {
    computed: {
        $blogList() {
            let list = this.$site.pages.filter(item => {
                return item.regularPath.includes(this.$site.themeConfig.blogBase)
            })


            return list
        },
        $tagList() {
            return [{
                "name": "test",
                "type": "test"
            }, {
                "name": "vue",
                "type": "vue"
            }, {
                "name": "css",
                "type": "css"
            }, {
                "name": "javascript",
                "type": "js"
            }, {
                "name": "小程序",
                "type": "applets"
            }, {
                "name": "vuepress",
                "type": "vuepress"
            }, {
                "name": "转",
                "type": "info"
            }, {
                "name": "music",
                "type": "music",
                "icon": "gnas-i gnas-i-musicnote"
            }, {
                "name": "奇闻异事",
                "type": "anecdote"
            }, {
                "name": "movie",
                "type": "movie",
            }, {
                "name": "git",
                "type": "git"
            }, {
                "name": "工具",
                "type": "tool"
            }, {
                "name": "算法",
                "type": "algorithm"
            }]
        }
    },
    methods: {
        $tagFormat(tags) {
            return tags.map(item => {
                this.$tagList.forEach(_item => {
                    if (_item.type == item) return _item
                });

                return {
                    "name": item,
                    "type": item
                }
            })
        }
    }
}