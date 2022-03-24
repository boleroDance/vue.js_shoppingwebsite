import axios from 'axios'
import store from '../store'

const reques = axios.create({
  baseURL: 'http://39.98.123.211/api',
  timeout: 5000
})

reques.interceptors.request.use(config => {
  //判断登录是否存在token
  if(store.state.token) {
    config.headers.token = store.state.token
  }
  return config
})

reques.interceptors.response.use(res => {
  return res.data
}, err => {
  console.log(err)
})

export default reques
