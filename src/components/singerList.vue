<template>
  <div class="singerList">
    <div class="box" @click="click">
      <div class="img fl">
        <img :src="img" class="auto-img">
      </div>
      <div class="name fl">{{singerName}}</div>
      <div class="attention fr">
        <van-icon name="plus" />
        <span>关注</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:"singerList",
    props:{
      singerName:{
        type : String
      },
      img:{
        type : String
      }
    },
    methods:{
      click(){
        this.$emit("click")
      }
    }
  }
</script>

<style lang="less" scoped>
.singerList{
  margin-bottom: 20px;
  .box{
    height: 50px;
    .img{
      width: 50px;
      height: 50px;
      background-color: skyblue;
      border-radius: 50%;
      overflow: hidden;
    }
    .name{
      line-height: 50px;
      font-size: 14px;
      margin-left: 15px;
    }
    .attention{
      line-height: 16px;
      border: 1px solid #fe5457;
      padding: 4px 10px;
      margin-top: 12px;
      color: #fe5457;
      border-radius: 16px;
      span{
        margin-left: 5px;
        vertical-align: middle;
      }
    }
    /deep/.van-icon{
      vertical-align: middle;
    }
  }
}
</style>