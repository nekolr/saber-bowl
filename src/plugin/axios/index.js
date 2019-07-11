import axios from 'axios'
import { isPlainObject } from 'lodash'
import cookies from '@/utils/cookies'
import store from '@/store'
import qs from 'qs'
import { Message } from 'iview'
import i18n from '@/i18n'

const TOKEN_PREFIX = 'Bearer '
const LOGIN_URI = '/auth/login'

// 注销操作
function logout() {
    store.dispatch('account/logout')
}

// 显示错误
function errorLog(error) {
    Message.error(error.message)
}

// 创建一个 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_SERVER_URL,
    timeout: 60 * 1000,
    withCredentials: true
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 如果是登录请求，则不需要加上 Token
        if (config.url.substring(config.baseURL) !== LOGIN_URI) {
            // 在请求发送之前做一些处理
            const token = cookies.get('token')
            // 让每个请求携带 token-- ['Authorization'] 为自定义 key 请根据实际情况自行修改
            config.headers['Authorization'] = TOKEN_PREFIX + token
        }
        let defaults = {}
        if (config.method === 'get') {
            config.params = {
                ...config.params,
                ...{ '_t': new Date().getTime() }
            }
        }
        if (isPlainObject(config.params)) {
            config.params = {
                ...defaults,
                ...config.params
            }
        }
        if (isPlainObject(config.data)) {
            config.data = {
                ...defaults,
                ...config.data
            }
            if (/^application\/x-www-form-urlencoded/.test(config.headers['content-type'])) {
                config.data = qs.stringify(config.data)
            }
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        if (response.status === 401) {
            return Promise.reject(response.data)
        } else {
            return response.data
        }
    },
    error => {
        if (error && error.response) {
            if (error.response.status === 401) {
                logout()
                return
            } else {
                error.message = error.response.data.message
            }
        } else {
            error.message = i18n.t('networkError')
        }
        errorLog(error)
        return Promise.reject(error)
    }
)

export default service