import { apiConfig, requests } from '@/api/index.js'

// 获取菜单列表
export function getMenuList () {
  return requests({
    url: apiConfig.type.sys + '/menu/list',
    method: 'GET'
  })
}
