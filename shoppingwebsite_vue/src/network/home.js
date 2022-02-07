// 封装所有对首页数据的请求
import {request} from './request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeTabData(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  }) 
}