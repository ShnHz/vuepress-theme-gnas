/**
 * 扩展 VuePress 应用
 */
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'
import './iconfont/iconfont.css'
import './styles/font.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/element-variables.styl'

import dataMixin from '@theme/mixins/data'
import dateMixin from '@theme/mixins/date'

export default ({
    Vue,
}) => {
    Vue.use(VueHighlightJS)
    Vue.use(ElementUI);

    Vue.mixin(dataMixin)
    Vue.mixin(dateMixin)
}