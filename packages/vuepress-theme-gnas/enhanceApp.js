/**
 * 扩展 VuePress 应用
 */
import pageComponents from '@internal/page-components'

import './iconfont/iconfont.css'
import './styles/font.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/element-variables.styl'

import VueViewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'


import dataMixin from '@theme/mixins/data'
import dateMixin from '@theme/mixins/date'

export default ({
    Vue,
}) => {
    Vue.use(ElementUI);
    Vue.use(VueViewer);

    Vue.mixin(dataMixin)
    Vue.mixin(dateMixin)

    for (const [name, component] of Object.entries(pageComponents)) {
        Vue.component(name, component)
    }
}