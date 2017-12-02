/*
* @Author: deacyn
* @Date:   2017-09-16 20:39:31
* @Last Modified by:   deacyn
* @Last Modified time: 2017-09-19 18:54:22
*/
import {getMenuList} from '@/api/sys/menu'
const user = {
  state: {
    userInfo: null,
    menuList: null,
    permissions: null,
    adminName: 'CRM后台管理'
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_UID: (state, UID) => {
      state.UID = UID
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_MENULIST: (state, menuList) => {
      state.menuList = menuList
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_ADMINNAME: (state, adminName) => {
      state.adminName = adminName
    }
  },
  actions: {
    storeUserRelation ({ commit }) {
      return new Promise((resolve, reject) => {
        getMenuList().then(res => {
          const {menuList, userInfo, permissions} = res
          commit('SET_MENULIST', menuList)
          commit('SET_PERMISSIONS', permissions)
          commit('SET_USERINFO', userInfo)
          resolve()
        })
      })
    },
    logout ({commit}) {
      return new Promise(resolve => {
        commit('SET_MENULIST', '')
        commit('SET_PERMISSIONS', '')
        commit('SET_USERINFO', '')
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
        resolve()
      })
    },
    handlePermission (context, permission) {
      return new Promise(resolve => {
        let permissionArr = permission.split(',')
        const permissions = context.state.permissions
        permissionArr = permissionArr.filter(item => {
          return !permissions.includes(item)
        })
        if (!permissionArr.length) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    },
    handleAdminName (context) {
      return new Promise(resolve => {
        const adminName = context.state.userInfo.sysDeptPO.aliasName
        context.commit('SET_ADMINNAME', adminName)
        resolve()
      })
    }
  }
}

export default user
