const getters = {
  adminName: state => state.user.adminName,
  userInfo: state => state.user.userInfo,
  menuList: state => state.user.menuList,
  permissions: state => state.user.permissions
}
export default getters
