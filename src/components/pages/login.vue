<!-- 登录页面 -->
<template>
  <div class='loginBox'>
      <div class='header'>
        <div class="inner">
          <div class="logo">
            <img src="../../assets/img/logo.png"/>
            <span>预付费管理系统</span>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="container">
          <div class="box">
              <div class="margin loginInput">
                  <h4 class="margin">欢迎登录预付费管理系统</h4>
                  <el-form :rules="rules" ref="formInline" :model="formInline" class="margin myForm">
                    <el-form-item class="loginInline" prop="user">
                      <el-input v-model="formInline.user"></el-input>
                    </el-form-item>
                    <el-form-item class="loginInline" prop="password">
                      <el-input v-model="formInline.password"></el-input>
                    </el-form-item>
                    <el-form-item class="loginInline">
                      <el-col :span="12">
                        <el-form-item label="记住用户名">
                          <el-switch v-model="single"></el-switch>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <a href="">忘记密码？</a>
                      </el-col>
                    </el-form-item>
                    <el-form-item class="loginInline">
                      <el-button type="primary" @click="handleSubmit('formInline')" style="width:100%;">登录</el-button>
                    </el-form-item>
                  </el-form>
              </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    components: {
    },
    data () {
      return {
          formInline: {
              user: '18111111111',
              password: '123456',
          },
          single:'',
          rules: {
              user: [
                  { required: true, message: '请输入用户名！', trigger: 'blur' },
                  {type:'string',pattern: /^[a-zA-Z0-9_-]{4,20}$/, message: '用户名格式不正确！', trigger: 'blur'}
              ],
              password: [
                  { required: true, message: '请输入密码！', trigger: 'blur' },
                  { type: 'string', min: 6, max:20,message: '密码长度在6~20位之间！', trigger: 'blur' }
              ]
          }
      };
    },
    methods: {
        ...mapActions(['myLogin']),
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                  this.myLogin(this.formInline);
                } else {
                    this.$message.info('请正确输入用户名和密码！');
                }
            })
        }
    },
    mounted() {

    },
  }
</script>

<style lang='scss' scoped>
/*@import url()*/
  .loginBox{
    width:100%;
    height:100%;
    min-width:1000px;
    position: relative;
    left: 0;
    top: 0;
    background: url('~../../assets/img/login_bottom.png') #1890FF repeat-x left bottom;
    overflow:hidden;
    background-size:100% 184px;
    .header{
      @include wh(100%,50px);
      background:#001529;
      .inner{
        max-width:1000px;
        margin:0 auto;
        height:100%;
        .logo{
          height:100%;
          display:flex;
          align-items:center;
          font-size:18px;
          color:#fff;
          img{
            @include wh(35px,24px);
            margin-right:10px;
          }
        }
      }
    }
    .main{
      // height: calc(100vh - 50px); 
      position: absolute;
      left: 0;
      top: 0;
      right:0;
      bottom:0;
      .container{
        @include wh(1200px,100%);
        .box{
          position:absolute;
          right:19%;
          top:24.65%;
          @include wh(22%,500px);
          background: #FFFFFF;
          box-shadow: 0px 2px 4px 0px #2B85D7;
          border-radius: 12px;
          .loginInput{
            padding:100px 0;
            h4{
              @include wh(300px,36px);
              text-align:center;
              @include ftc(24px,36px,#1890FF);
              font-weight: 600;
              margin-bottom:20px;
            }
          }
        }
      }
    }
    .myForm{
      width:70%;
    }
    .loginInline{
      margin-top:20px;
    }
    .checkUserBox{
      width:100%;
      @include fj(space-between)
    }
  }
</style>