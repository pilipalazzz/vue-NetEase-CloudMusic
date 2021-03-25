<template>
  <div class="login">
    <div class="logoBox">
      <div class="logo"></div>
      <span class="logo-txt">时光音乐</span>
    </div>
    <!-- 文字部分 -->
    <div class="titleBox">
      <div class="title">习惯听</div>
      <div class="subTit">一段声音抵抗孤独</div>
    </div>
    <!-- 登录注册按钮 -->
    <div class="btnBox">
      <button class="btn1" @click="show">登录</button>
      <button class="btn2" @click="goHome">立即体验</button>
    </div>
    <van-popup v-model="isShow" position="bottom">
      <div class="content">
        <div class="formBox">
          <van-form>
            <van-field
              v-model="userInfo.username"
              name="手机号"
              label="手机号"
              placeholder="请输入手机号"
            />
            <van-field
              v-model="userInfo.userpass"
              type="password"
              name="密码"
              label="密码"
              placeholder="请输入密码"
            />
          </van-form>

          <div class="rightNow clearfix">
            <span class="fr" @click="goRegister">没有账号?立即注册</span>
          </div>

          <div class="login-box">
            <button class="Login" @click="login">立即登录</button>
          </div>

        </div>
      </div>
    </van-popup>
  </div>
  
</template>

<script>
import "../assets/less/Login.less"
import {validForm} from "../assets/js/ValidForm.js"
  export default {
    name:"Login",
    data(){
      return {
        isShow:false,
        userInfo:{
          username:"",
          userpass:""
        }
      }
    },
    methods:{
      show(){
        this.isShow = true;
      },
      goRegister(){
        this.$router.push({name:"Register"})
      },
      login(){
        let o = {
          phone:{
              value: this.userInfo.username,
              reg:/^1[3-9]\d{9}$/,
              msg:"手机号格式有误"
          },
          password:{
              value: this.userInfo.userpass,
              reg:/^[a-zA-Z]\w{7,15}$/,
              msg:"密码格式有误"
          },
        }

        let isPass = validForm.valid(o)
        if(isPass){
          this.$toast.loading({
            message: "加载中...",
            forbidClick: true,
            duration: 0
          });
          this.axios({
            method:"GET",
            url:"/login/cellphone",
            params:{
              phone:this.userInfo.username,
              password:this.userInfo.userpass
            }
          }).then(result => {
            this.$toast.clear();
            
            if(result.data.code == 502){
              this.$toast(result.data.msg)
              return false
            }
            this.$toast("登录成功")
            //设置userId
            this.$store.commit("setUserId",result.data.account.id)
            let token = result.data.token
            this.$cookies.set("MUSIC_U",token)
            this.$store.commit("setUserId",result.data.account.id)
            this.userInfo.username = ""
            this.userInfo.userpass = ""
            this.$router.push({name:"Home"})
          }).then(() => {
            this.axios({
              method:"GET",
              url:"/user/account"
            }).then(res => {
              
            })
          })
        }
      },
      //立即体验
      goHome(){
        this.$router.push({name:"Home"})
      }
    }
  }
</script>

<style lang="less" scoped>
  
</style>