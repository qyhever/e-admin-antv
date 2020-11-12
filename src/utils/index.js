import { omit } from 'lodash'

/**
 * 生成随机字符串
 * @return {String} 字符串
 */
export const getRandomStr = () => {
  return new Date().getTime() + Math.random().toString(16).slice(2)
}

/**
 * 判断当前路由是否拥有权限
 * @param {Object} route 当前路由对象
 * @param {Array<string>} resourceCodes 当前用户拥有的所有权限 code list
 * @return {Boolean} 是否拥有权限
 */
export const hasPermission = (route, resourceCodes = []) => {
  if (route.meta && route.meta.permission && Array.isArray(route.meta.permission)) {
    return route.meta.permission.some(code => resourceCodes.includes(code))
  }
  return true
}

/**
 * 生成有权限的路由
 * @param {Array} routes 路由表
 * @param {Array<string>} resourceCodes 当前用户拥有的所有权限 code list
 * @return {Array} accessRoutes
 */
export const getAccessRoutes = (routes, resourceCodes) => {
  return routes.filter(item => {
    if (Array.isArray(item.children)) {
      item.children = getAccessRoutes(item.children, resourceCodes)
    }
    return hasPermission(item, resourceCodes)
  })
}

/**
 * 生成根据路由生成菜单
 * @param {Array} routes 路由表
 * @return {Array} menus
 */
export const getAccessMenus = (routes) => {
  return routes.map(item => {
    if (Array.isArray(item.children)) {
      item.children = getAccessMenus(item.children)
    }
    return omit(item, ['component'])
  })
}
