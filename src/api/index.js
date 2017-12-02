import axios from 'axios'
import store from '../store/index.js'
import router from '../router/index.js'
import { Message, MessageBox } from 'element-ui'

axios.defaults.timeout = 5000

axios.defaults.headers.post['Content-Type'] = 'charset=UTF-8'
// http://192.168.3.225:8080
const apiConfig = {
  baseURL: 'http://lock.peanut-hang.cn/family-lock',
  type: {
    manager: '/manager',
    api: '/api',
    sys: '/sys',
    crm: '/crm'
  },
  version: '/v1.0'
}

// 不带token请求
const requestsNoToken = axios.create({
  baseURL: apiConfig.baseURL
})

// 带token实例请求
const requests = axios.create({
  baseURL: apiConfig.baseURL
})

// requestsNoToken 拦截器
requestsNoToken.interceptors.response.use(function (res) {
  if (Number.parseInt(res.data.status) !== 0) {
    Message({
      message: res.data.msg,
      type: 'error',
      showClose: true
    })
  } else {
    return res
  }
}, function (err) {
  Message({
    message: '发生错误，请重新请求或重新登录',
    type: 'error',
    showClose: true
  })
  return Promise.reject(err)
})

// request 拦截器
requests.interceptors.request.use(config => {
  let token = localStorage.getItem('token') || sessionStorage.getItem('token')
  config.headers['token'] = token
  return config
}, error => {
  Promise.reject(error)
})

// response 拦截器
requests.interceptors.response.use(function (res) {
  if (Number.parseInt(res.data.status) === -1001) {
    MessageBox.alert(res.data.msg, '提示', {
      confirmButtonText: '确定',
      callback: action => {
        store.dispatch('logout').then(() => {
          router.push({ name: 'login' })
        })
      }
    })
  } else if (Number.parseInt(res.data.status) === 0) {
    return res.data
  } else {
    Message({
      message: res.data.msg,
      type: 'error',
      showClose: true
    })
    throw new Error(res.data.msg)
  }
}, function (err) {
  Message({
    message: '发生错误，请重新请求或重新登录',
    type: 'error',
    showClose: true
  })
  return Promise.reject(err)
})

export {apiConfig, requestsNoToken, requests}

// 登录接口
export function login (data) {
  return requestsNoToken({
    url: apiConfig.type.sys + '/login',
    method: 'POST',
    data: data
  })
}

export function realPromise (perm, promise) {
  return new Promise(resolve => {
    store.dispatch('handlePermission', perm).then(res => {
      if (!res) {
        Message({ message: '没有权限访问该接口，权限为' + perm, type: 'error', showClose: true })
        throw new Error('没有权限访问该接口，权限为' + perm)
      }
      return promise
    }).then(res => {
      resolve(res)
    })
  })
}
