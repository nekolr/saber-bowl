import i18n from '../i18n'
import axios from './axios'
import {
    Button, 
    ButtonGroup, 
    Input, 
    Poptip, 
    Card, 
    Form, 
    FormItem, 
    Dropdown, 
    DropdownMenu, 
    DropdownItem
} from 'iview'
import 'iview/dist/styles/iview.css'

export default {
    async install(Vue) {
        Vue.config.productionTip = false
        Vue.prototype.$serverUrl = process.env.VUE_APP_SERVER_URL || window.location.protocol + "//" + window.location.host
        Vue.prototype.$appVersion = process.env.VUE_APP_VERSION
        // axios 挂载全局
        Vue.prototype.$axios = axios

        // 全局注册
        Vue.use({
            i18n: (key, value) => i18n.t(key, value)
        })

        Vue.component('Button', Button)
        Vue.component('ButtonGroup', ButtonGroup)
        Vue.component('Input', Input)
        Vue.component('Poptip', Poptip)
        Vue.component('Card', Card)
        Vue.component('Form', Form)
        Vue.component('FormItem', FormItem)
        Vue.component('Dropdown', Dropdown)
        Vue.component('DropdownMenu', DropdownMenu)
        Vue.component('DropdownItem', DropdownItem)
    }
}