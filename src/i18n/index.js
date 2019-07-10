import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhCN from './zh-CN'
import enUS from './en-US'
import cookies from '@/utils/cookies'

Vue.use(VueI18n)

export const messages = {
  'zh-CN': {
    '_lang': '简体中文',
    ...zhCN
  },
  'en-US': {
    '_lang': 'English',
    ...enUS
  }
}

export default new VueI18n({
  locale: cookies.set('language') || 'zh-CN',
  messages
})
