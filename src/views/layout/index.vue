 <template>
<div class="app-wrapper" :class="{'hide-silder': isCollapse}">
  <sidebar class="sidebar-container" :isCollapse="isCollapse"></sidebar>
  <div class="main-container">
    <navbar @listenToChange="changeCollapse" :breadcrumb="breadcrumb"></navbar>
    <admin-content class="app-main"></admin-content>
  </div>
</div>
</template>

<script>
import { generateBreadcumb } from '@/utils/tool.js'
import Navbar from './navbar.vue'
import Sidebar from './sidebar.vue'
import AdminContent from './content'
export default {
  components: {Navbar, Sidebar, AdminContent},
  data () {
    return {
      isCollapse: false,
      breadcrumb: []
    }
  },
  created () {
    const menuList = this.$store.getters.menuList
    const url = this.$route.fullPath
    this.breadcrumb = generateBreadcumb(menuList, url)
  },
  methods: {
    changeCollapse (data) {
      this.isCollapse = data
    },
    changeTitle () {
      const menuList = this.$store.getters.menuList
      const url = this.$route.fullPath
      this.breadcrumb = generateBreadcumb(menuList, url)
      // console.log(this.breadcrumb)
    }
  },
  watch: {
    '$route': 'changeTitle'
  }
}
</script>

<style lang="stylus" scoped>
.app-wrapper{
  position: relative;
  height: 100%;
  width: 100%;
  &:after {
    content: '';
    height: 0;
    display: block;
    overflow: hidden;
    clear: both;
    visibility: hidden;
  }
  &.hide-silder {
    .sidebar-container{
      width:64px;
      overflow: inherit;
    }
    .main-container {
      margin-left: 64px;
    }
  }
  .sidebar-container {
    transition: width 0.18s ease-out;
    // width: 180px;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow-y: auto;
    &::-webkit-scrollbar {display:none}
    &:not(.el-menu--collapse) {
      width: 200px;
    }
  }
  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s ease-out;
    margin-left: 200px;
    .app-main{
      padding 20px
    }
  }
}
</style>
