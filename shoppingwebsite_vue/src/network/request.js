import axios from 'axios'

export function request(config) {

  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

  // 请求拦截
  instance.interceptors.request.use(config => {
    // config 配置对象 对象里面有一个属性很重要 header请求头
    return config
  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  // 发送真正的网络请求,返回一个promise
  return instance(config)
}