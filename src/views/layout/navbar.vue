<template>
  <div class="container">
    <div class="fl-l">
      <img src="../../assets/open.png" alt="" @click="changeCollapse" :class="[ 'hamburger', {'is-active': isFold}]">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in breadcrumb" :key="item.title" :to="{ path: item.url }">
          {{item.title}}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ lastBreadcrumb }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown class="avatar" @command="handleCommand">
      <span class="el-dropdown-link">
        <img class="avatarImg" :src="avatarUrl" alt="">
        <span class="avatarName">{{userInfo.username}}</span>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="myinfo">个人信息</el-dropdown-item>
        <el-dropdown-item command="logout" divided>登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  props: ['breadcrumb', 'isCollapse'],
  data () {
    return {
      breadcrumbList: [],
      isFold: this.isCollapse,
      userInfo: null,
      avatarUrl: null,
      lastBreadcrumbList: {
        'index': '列表',
        'edit': '编辑',
        'add': '添加'
      },
      lastBreadcrumb: '当前'
    }
  },
  created () {
    this.userInfo = this.$store.getters.userInfo
    this.handleLastBreadcrumb(this.$route.fullPath)
    this.showAvatarUrl()
  },
  methods: {
    changeCollapse () {
      this.$emit('listenToChange', !this.isFold)
      this.isFold = !this.isFold
    },
    handleCommand (command) {
      if (command === 'logout') {
        this.$store.dispatch('logout').then(() => {
          return this.$store.dispatch('resetAsyncRoutes')
        }).then(() => {
          location.reload()
        })
      } else if (command === 'myinfo') {
        // var id = sessionStorage.getItem('UID')
        // this.$router.push({ name: '人员详情', params: {id: id} })
        this.$message({
          message: '此模块暂未开发完成',
          type: 'info'
        })
      } else {
        this.$message({
          message: '此模块暂未开发完成',
          type: 'info'
        })
      }
    },
    handleLastBreadcrumb (path) {
      for (let key in this.lastBreadcrumbList) {
        if (path.includes(key)) {
          this.lastBreadcrumb = this.lastBreadcrumbList[key]
          break
        }
      }
    },
    showAvatarUrl () {
      var uname = this.userInfo.username
      var name = uname.charAt(0)
      var fontSize = 22.5
      var fontWeight = '300'
      var canvas = document.createElement('canvas')
      canvas.width = 45
      canvas.height = 45
      var context = canvas.getContext('2d')
      context.fillStyle = '#545c64'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.fillStyle = '#fff'
      context.font = fontWeight + ' ' + fontSize + 'px sans-serif'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText(name, fontSize, fontSize)
      this.avatarUrl = canvas.toDataURL('image/png')
    }
  },
  watch: {
    '$route' (to, from) {
      this.handleLastBreadcrumb(to.fullPath)
    }
  }
}
</script>

<style lang="stylus" scoped>
.container{
  height: 60px;
  line-height: 60px;
  background: #eef1f6;
  img {
    width: 25px;
    height: 25px;
    vertical-align: middle;
    margin-left: 18px;
  }
}
.hamburger{
  transition: .38s;
  cursor: pointer;
  &.is-active{
    transform: rotate(90deg);
  }
}
.el-breadcrumb {
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  font-size: 14px;
  margin-top: 1px;
}
.fl-l{
  float: left;
}
.avatar{
  height: 50px;
  cursor: pointer;
  float: right;
  margin-right: 40px;
  .avatarImg{
    width: 45px;
    height: 45px;
    border-radius:50%;
    vertical-align: middle;
  }
  .avatarName{
    margin-left: 5px;
    font-size: 14px;
  }
}
</style>
