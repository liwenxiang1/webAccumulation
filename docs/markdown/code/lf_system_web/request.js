import axios from 'axios'
import router from '@/router/routers'
import { Notification } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import Config from '@/settings'
import Cookies from 'js-cookie'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/', // api 的 base_url
  timeout: Config.timeout, // 请求超时时间
  loading:true
})

// request拦截器
service.interceptors.request.use(
  config => {
    if(config.loading)document.getElementById('loading_panel').style.display = 'block'
    if (getToken()) {
      config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    if (store.getters.access_token) {
      config.headers.common['authorization'] = store.state.access_token
    }
    if (store.getters.refresh_token) {
      config.headers.common['authorization'] = config.headers.common['authorization'] + ';' + store.state.refresh_token
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // Do something with request error
    document.getElementById('loading_panel').style.display = 'none'
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    if(response.config.loading)document.getElementById('loading_panel').style.display = 'none'
    const code = response.status
    if (code < 200 || code > 300) {
      Notification.error({
        title: response.message
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    document.getElementById('loading_panel').style.display = 'none'
    let code = 0
    try {
      code = error.response.data.status
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        Notification.error({
          title: '网络请求超时',
          duration: 5000
        })
        return Promise.reject(error)
      }
    }
    if (code) {
      if (code === 401) {
        const userInfo = JSON.parse(store.getters.userInfo)
        store.dispatch('LogOut', userInfo.id).then(() => {
          // 用户登录界面提示
          Cookies.set('point', 401)
          location.reload()
        })
      } else if (code === 403) {
        router.push({ path: '/401' })
      } else {
        const errorMsg = error.response.data.message
        if (errorMsg !== undefined) {
          Notification.error({
            title: errorMsg,
            duration: 5000
          })
        }
      }
    } else {
      Notification.error({
        // title: '接口请求失败',
        title: '服务器繁忙，请稍后再试!',
        duration: 5000
      })
    }
    return Promise.reject(error)
  }
)
export default service
