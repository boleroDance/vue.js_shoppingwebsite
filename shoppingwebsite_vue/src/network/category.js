import { request } from './request'

// 获取分类的所有数据
export function getCategory() {
  return request({
    url: "/category"
  })
}

// 获取子分类的所有数据
export function getSubcategory(maitKey) {
  return request({
    url: "/subcategory",
    params: {
      maitKey
    }
  })
}

// 获取每个子分类里的商品信息
export function getCategoryDetail(miniWallKey, type) {
  return request({
    url: "/subcategory/detail",
    params: {
      miniWallKey,
      type
    }
  })
}