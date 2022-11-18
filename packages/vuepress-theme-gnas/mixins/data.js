export default {
    computed: {
        $blogList() {
            let list = this.$site.pages.filter(item => {
                return item.regularPath.includes(this.$site.themeConfig.blogBase)
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
                this.$tagList.forEach(_item => {
                    if (_item.type == item) return _item
                });

                return {
                    "name": item,
                    "type": item
                }
            })
        },
        $blogFromTag(type){
            return type == 'all' ? this.$blogList : this.$blogList.filter(item =>{
                return item.frontmatter.config.tag.includes(type) || false
            })
        }
    }
}