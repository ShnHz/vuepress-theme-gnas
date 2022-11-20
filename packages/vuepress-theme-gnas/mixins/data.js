export default {
    computed: {
        $blogList() {
            let list = this.$site.pages.filter(item => {
                return item.regularPath.includes(this.$site.themeConfig.blogBase) && item.frontmatter.config.show != false
            })


            return list
        },
        $tagList() {
            return this.$site.themeConfig.tagList
        }
    },
    methods: {
        $tagFormat(tags) {
            return tags.map(item => {
                let list = this.$tagList.filter(_item => {
                    return _item.type == item
                });
                return list.length == 0 ? {
                    "name": item,
                    "type": item
                } : list[0]
            })
        },
        $blogFromTag(type) {
            return type == 'all' ? this.$blogList : this.$blogList.filter(item => {
                return item.frontmatter.config.tag.includes(type) || false
            })
        },
    }
}