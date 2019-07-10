import request from '@/plugin/axios'

const LOGIN_URI = '/auth/login'
const CURRENT_USER_INFO_URI = '/auth/info'

export const accountApi = {
  // 用户登录
  login (data) {
    return request({
      url: LOGIN_URI,
      method: 'post',
      data
    })
  },
  // 获取当前用户信息
  getCurrentUserInfo() {
    return request({
      url: CURRENT_USER_INFO_URI,
      method: 'get'
    })
  }
}