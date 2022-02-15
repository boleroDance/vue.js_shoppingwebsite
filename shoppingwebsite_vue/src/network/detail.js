
import {request} from './request'
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

// 将服务器返回数据封装在一个类中，之后创建类对象，之后面向对象开发
export class GoodsInfo {
  // 通过构造器定义变量来存储数据
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title,
    this.desc = itemInfo.desc,
    this.newPrice = itemInfo.price,
    this.oldPrice = itemInfo.oldPrice,
    this.discount = itemInfo.discountDesc,
    this.columns = columns,
    this.services = services,
    this.realPrice = itemInfo.lowNowPrice
  }
}
