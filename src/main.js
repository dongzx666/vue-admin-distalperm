// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'normalize.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import VueBus from 'vue-bus'
import 'element-ui/lib/theme-chalk/index.css'
import {Cascader, Tree, Carousel, CarouselItem, Notification, Popover, Autocomplete, RadioButton, Tooltip, Upload, Switch, Card, Progress, CheckboxGroup, Checkbox, Dialog, Loading, DatePicker, TimePicker, RadioGroup, Radio, Tabs, TabPane, Badge, Option, Select, MessageBox, Pagination, Tag, Dropdown, DropdownMenu, DropdownItem, Table, TableColumn, Message, Input, Form, FormItem, Button, Menu, Submenu, MenuItem, MenuItemGroup, Row, Col, Breadcrumb, BreadcrumbItem} from 'element-ui'
Vue.use(VueBus)
Vue.use(Cascader)
Vue.use(Tree)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Popover)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tag)
Vue.use(Pagination)
Vue.use(Option)
Vue.use(Select)
Vue.use(Badge)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Loading.directive)
Vue.use(Dialog)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Progress)
Vue.use(Card)
Vue.use(Switch)
Vue.use(Upload)
Vue.use(Tooltip)
Vue.use(Autocomplete)
Vue.prototype.$loading = Loading.service
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
// Vue.prototype.$ELEMENT = { size: 'small' }

Vue.config.productionTip = false

const whiteList = ['/login', '/404', '/401']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
    if (whiteList.includes(to.path)) {
      if (to.path === '/login') {
        next(false)
        NProgress.done()
        Message({
          message: '您已经登录',
          type: 'warning',
          duration: 2000
        })
      } else {
        next()
      }
    } else {
      if (!store.getters.menuList) {
        store.dispatch('storeUserRelation').then(() => {
          next()
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(transition => {
  NProgress.done()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  render: h => h(App)
})
