<template lang="pug">
  div.container
    div.box
      div.left
        div.left-head
          img(src="../../../static/logo.png")
          p 登录账号
        el-form.left-body(
          :model="form"
          :rules="rules"
          ref="form"
          status-icon)
          el-form-item(prop="username")
            el-input(
              :autofocus="true"
              type="text"
              v-model.trim="form.username"
              placeholder="请输入账号"
              @keyup.enter.native="handleSubmit")
              i.fa.fa-user(slot="prefix" style="margin-left: 5px;")
          el-form-item(prop="password")
            el-input(
              type="password"
              v-model.trim="form.password"
              placeholder="请输入密码"
              @keyup.enter.native="handleSubmit")
              i.fa.fa-key.fa-fw(slot="prefix" style="margin-left: 5px;")
          el-checkbox(v-model="checked")  记住账号
          el-button(type="primary" :loading="isLoading" @click.native="handleSubmit") 登录
      div.right
        div.overlay
        div.content-text
          h3 {{adminName}}
          p 创意改变生活
</template>

<script>
import 'static/fonts/font-awesome.css'
import {login} from '@/api'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      checked: false,
      adminName: '',
      isLoading: false,
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.adminName = this.$store.getters.adminName
  },
  methods: {
    handleSubmit () {
      // 加载loading
      this.loading = true
      // 验证表单
      this.$refs.form.validate(valid => {
        if (valid) {
          // this.store({ uid: 1, token: 12345678}) })
          // this.$router.push({ path: '/' })
          this.postData().then(res => {
            // 存储数据
            this.storeToken(res.data.res.token)
            // // ui状态变化
            this.loading = false
            this.$notify({
              title: '登录成功',
              message: '欢迎登陆',
              type: 'success'
            })
            return this.$store.dispatch('storeUserRelation')
          }).then(() => {
            // 路由跳转
            this.$router.push({ name: '仪表盘' })
          }).catch(err => {
            this.$message.error(err)
            this.loading = false
          })
        } else {
          this.$message.error('请按照规格填写账号，密码')
        }
      })
    },
    postData () {
      return login(this.form)
    },
    storeToken (token) {
      if (this.checked) {
        localStorage.setItem('token', token)
      } else {
        sessionStorage.setItem('token', token)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.container {
  width: 100%;
  height: 100vh;
  position relative;
}
.box {
  &:before {
    display: inline-block;
    content: ' ';
    vertical-align: middle;
    height: 100%;
  }
  position: absolute;
  top: 15%;
  left: 15%;
  box-shadow: 1px 2px 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 70%;
  height: 450px;
  margin: 0 auto;
  background-color: #fff;
  .left {
    float: left;
    width: 42%;
    height: 100%;
    padding: 50px 20px;
    box-sizing: border-box;
    .left-head {
      text-align: center;
      p {
        margin-top: 5px;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 300;
      }
    }
    .left-body {
      padding: 0 20px;
      .el-form-item__label {
        padding: 0;
        // margin-top: 10px;
      }
      .el-form-item {
        margin-top: 30px;
      }
      .el-input {
        // margin-left: 10px;
      }
      .el-checkbox {
        margin-left: 5px;
        margin-bottom: 5px;
      }
      .el-button {
        width: 100%;
        margin-top: 20px;
      }
    }
  }
  .right {
    &:before {
      content: ' ';
      vertical-align: middle;
      height: 100%;
    }
    position relative
    float: right;
    width: 58%;
    height: 100%;
    // line-height: 450px;
    background: url(../../../static/login-bg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    .overlay {
      position: absolute;
      top: 0;
      display: block;
      width: 100%;
      height: 100%;
      background: rgba(#1E90FF, 0.75);
    }
    .content-text {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      padding: 0 30px;
      color: #fff;
      h3 {
        margin-top: 0;
        margin-bottom: 5px;
        font-size: 26px;
        font-weight: 300;
      }
      p {
        margin: 0;
        font-size: 16px;
        font-weight: 300;
      }
    }
  }
}
</style>
