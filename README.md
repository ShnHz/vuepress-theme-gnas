## Introduce

This theme refers to [vuepress-theme-gnas1.x](https://github.com/vuepress-gnas/vuepress-theme-gnas-1.x)

1. This is a Vuepress theme, which is designed to add blog categories, tag walls, comments and other functions required;
2. The theme is minimalist, modified according to the default theme of Vuepress, and the official theme configuration is still applicable;
3. Demo：[野宁新之助](https://www.sanghangning.cn) 

## Quick start

**npm**

```bash
npm install vuepress-theme-gnas
```

**yarn**

```bash
yarn add vuepress-theme-gnas
```

## License
[MIT](https://github.com/gnasluan/vuepress-theme-gnas/blob/master/LICENSE)

## config.js

```js
module.exports = {
    theme:'vuepress-theme-gnas',
    themeConfig:{
        // 平滑滚动锚点
        smoothScroll: true,
        // 主题模式配置
        themeMode: {
            enable: true,
            // light/dark
            default: 'light'
        },
        // 锁定页面默认密码，请使用MD5，4位数MD5加密后的密码
        password: '81dc9bdb52d04dc20036dbd8313ed055',
        // 首屏加载页面
        firstLoading: true,
        // 首屏加载页面延时
        firstLoadingDuration: 0,
        // blog文章所在位置
        blogBase: '/views/blog',
        // blogItem配置
        blogItemCofig: {
            // 日期格式化
            dateFormat: 'MM dd,yyyy',
        },
        // 全站访问量统计
        globalAccess: true,
        // 评论系统 文档：https://valine.js.org/，支持valine所有配置
        valine: {
            enable: true,
            appId: 'xxx',
            appKey: 'xxx',
        },
        // 加入公益404计划，默认为true
        notFoundPagePublicWelfare: false,
        // 音乐播放器
        music: {
            enable: true,
            // 自动播放
            autoplay: false,
            list: [{
                    name: 'Fine乐团_没有人不比我快乐',
                    href: '/music/Fine乐团_没有人不比我快乐.mp3'
                }
            ]
        },

        logo: '/img/logo.png',
        // 主页配置项
        home: {
            // 主页logo（位于博客名称左侧）
            titleLogo: '/img/titleLogo.gif',
            // 博客名称
            title: '说说我的生活',
            // 博客简介
            description: 'Think twice before you do.',
            // 背景图片列表
            bannerList: [
                '/img/bg1.jpg',
                '/img/bg2.jpg',
                '/img/bg3.jpg',
            ],
            // 作者模块配置
            authorConfig: {
                enable: true,
                // 头像
                avatar: '/img/avatar.jpg',
                // “是否加入书签”按钮
                bookmark: true,
                // github地址
                github: 'https://github.com/ShnHz',
                // qq号
                qq: 123456789,
                // 微信号
                wx: '123456789',
                // 邮箱地址
                email: '123456789@qq.com',
                // 支付宝打赏二维码
                alipay: '/img/alipay_ercode.jpg'
            },
            // 爱情模块配置
            loveConfig: {
                enable: true,
                // 男孩头像
                boy: '/img/boy.jpg',
                // 女孩头像
                girl: '/img/girl.jpg',
                // 恋爱日期
                startDay: '2022/01/01'
            },
            // 幻灯片模块配置
            carouselConfig: {
                enable: true,
                // 幻灯片列表
                list: [{
                        title: '日记',
                        content: '做一个热爱生活的人，把生活记录下来。',
                        bg: '/img/carousel1.jpg',
                    },
                    {
                        title: '学习',
                        content: '阶段性学习！！',
                        bg: '/img/carousel2.jpg',
                    },
                ]
            },
            // 标签模块配置
            tagConfig: {
                enable: true,
            }
        },
        // 备案号
        record: '浙ICP备00000000号-0',
        // 备案号跳转地址
        recordLink: 'http://beian.miit.gov.cn/',
        // 作者
        author: '野宁新之助',
        // 项目开始时间
        startYear: '2022',
        // 导航栏配置
        nav: [{
                text: '首页',
                link: '/',
            },
            {
                text: '归档',
                link: '/views/Archives',
            },
            {
                text: '标签',
                link: '/views/Tag'
            },
            {
                text: '笔记',
                link: '/views/Notes'
            },
            {
                text: '友链',
                link: '/views/Friend'
            },
            {
                text: 'GitHub',
                link: 'https://github.com/ShnHz/vuepress-theme-gnas'
            }
        ],
        // 侧边栏配置
        sidebar: [
            '/views/notes/Web',
            '/views/notes/Test3',
            '/views/notes/Test4',
            {
                title: 'Group 1',
                collapsable: false,
                path: '/views/notes/TestGroup',
                children: [
                    '/views/notes/Test1',
                    '/views/notes/Test2',
                    {
                        title: '测试下拉',
                        collapsable: true,
                        children: [
                            '/views/notes/Test3',
                            '/views/notes/Test4',
                        ]
                    },
                ]
            }
        ],
        // 重写默认显示的侧边栏深度
        sidebarDepth: 0,
        activeHeaderLinks: false,
        // 文档更新时间：每个文件git最后提交的时间
        lastUpdated: 'Last Updated',
        // 博客分类（标签）
        tagList: [{
            "name": "Test",
            "type": "test"
        }],

        live2d: {
            // live2d配置 
            // https://github.com/JoeyBling/vuepress-plugin-helper-live2d
        }
    }
}
```