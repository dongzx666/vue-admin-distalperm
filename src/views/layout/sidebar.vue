<template>
  <el-menu mode="vertical" :default-active="$route.fullPath"  background-color="#545c64" text-color="#fff"  class="el-menu" router :collapse="isCollapse" :unique-opened="true">
    <p class="menu-title" v-if="isCollapse"></p>
    <p class="menu-title" v-else>{{adminName}}</p>
    <template v-for="item in menuList">
      <template v-if="item.type">
        <el-menu-item  :index="item.url" :key="item.name">
          <i :class="item.icon" v-if="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
      <el-submenu :index="item.name" v-if="!item.type" :key="item.name">
        <template slot="title">
          <i :class="item.icon" v-if="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <template v-for="child in item.childMenus">
          <el-menu-item :index="child.url" :key="child.name">
            <i :class="child.icon" v-if="child.icon"></i>
            <span slot="title">{{child.name}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
import 'static/fonts/font-awesome.css'
export default {
  props: ['isCollapse'],
  data () {
    return {
      menuList: null,
      adminName: ''
    }
  },
  created () {
    this.adminName = '后台管理'
    this.menuList = this.$store.getters.menuList
  }
}
</script>

<style lang="stylus" scoped>
.el-submenu .el-menu-item{
  min-width: 100px;
}
.menu-title{
  text-align: center;
  font-size: 18px;
  color: #fff;
  margin-top: 20px;
  margin-bottom: 10px;
}
i {
  color: #fff;
}
</style>
