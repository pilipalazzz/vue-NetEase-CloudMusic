<template>
  <div class="register">
    <div class="navBar">
      <van-nav-bar
        title="注册"
        right-text="登录"
        left-arrow
        @click-left="goBack"
        @click-right="goLogin"
      />
    </div>
    <div class="content">
      <van-form>
            <van-field
              v-model="regInfo.phone"
              name="+86"
              label="+86"
              placeholder="请输入手机号"
            />
            <van-field
              v-model="regInfo.password"
              type="password"
              name="密码"
              label="密码"
              placeholder="请输入密码"
            />
            <van-field
              v-model="regInfo.nickName"
              type="text"
              name="昵称"
              label="昵称"
              placeholder="请输入昵称"
            />
          </van-form>
          <div class="code-box clearfix">
            <div class="code fl">
              <input class="codeIpt" v-model="regInfo.code" type="text" placeholder="验证码">
            </div>
            <div class="getCode fr">
              <van-button type="info" @click="GetCode" :disabled="isGetCode">{{regBtnText}}</van-button>
            </div>
          </div>
          <div class="regBtn">
            <van-button type="primary" :disabled="!isChecked" @click="register">注册</van-button>
          </div>
          <div class="agree">
            <input type="checkbox" v-model="isChecked"> 我已认真阅读并同意该用户协议
          </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/Register.less"
import {validForm} from '../assets/js/ValidForm'
  export default {
    name:"Register",
    data(){
      return {
        regInfo:{
          phone:"",
          code:"",
          password:"",
          nickName:""
        },
        isChecked:false,
        isGetCode:false,
        regBtnText:"获取验证码"
      }
    },
    methods:{
      // 跳转登录
      goLogin(){
        this.$router.push({name:"Login"})
      },
      // 返回上一级
      goBack(){
        this.$router.go(-1)
      },
      // 注册
      register(){
        let o = {
          phone:{
              value: this.regInfo.phone,
              reg:/^1[3-9]\d{9}$/,
              msg:"手机号格式有误"
          },
          password:{
              value: this.regInfo.password,
              reg:/^[a-zA-Z]\w{7,15}$/,
              msg:"密码格式有误"
          },
          nickName:{
              value: this.regInfo.nickName,
              reg:/^[\w\u4e00-\u9fa5]{2,8}$/,
              msg:"昵称格式有误"
          },
        }

        let isPass = validForm.valid(o)
        if(isPass){
          this.$toast.loading({
            message: "加载中...",
            forbidClick: true,
            duration: 0
          });
          //验证验证码
          this.axios({
            method:"GET",
            url:"/captcha/verify",
            params:{
              phone:this.regInfo.phone,
              captcha:this.regInfo.code
            }
          }).then(result => {
            this.$toast.clear();
            this.$toast("验证成功")
          }).catch(err => {
            this.$toast.clear();
            this.$toast("验证码有误")
          }).then(() => {
            this.axios({
              // withCredentials: true,//跨域
              method:"GET",
              url:"/register/cellphone",
              params:{
                captcha:this.regInfo.code,
                phone:this.regInfo.phone,
                password:this.regInfo.password,
                nickname:this.regInfo.nickName
              }
            }).then(result => {
              this.$toast("注册成功")
              this.$router.push("Login")
            })
          })
        }
      },
      //获取验证码
      GetCode(){
        if(this.regInfo.phone == ""){
          this.$toast("请输入手机号")
          return false
        }
        let o = {
          phone:{
              value: this.regInfo.phone,
              reg:/^1[3-9]\d{9}$/,
              msg:"手机号格式有误"
          },
        }
        let isPass = validForm.valid(o)
        if(isPass){
          this.axios({
            method:"GET",
            url:"/captcha/sent",
            params:{
              phone:this.regInfo.phone
            }
          }).then(result => {
            if(result.data.code == 200){
              clearInterval(timer)
              this.isGetCode = true
              let i = 10;
              let timer = setInterval(() => {
                this.regBtnText = `${i}秒后`
                i--
                if(i < 0){
                  this.isGetCode = false
                  this.regBtnText = "获取验证码"
                  clearInterval(timer)
                }
              },1000)
            }
          }).catch(err => {
            
            this.$toast("发送验证码超过限制，每个手机号一天只能发5条验证码")
          })
        }
        
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>