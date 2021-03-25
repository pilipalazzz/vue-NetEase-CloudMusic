<template>
  <div class="musicList">
    <div class="left" @click="_click">
      <div class="title">{{name}}</div>
      <div class="singer">
        <span>{{singerName}}</span>
        <div class="label">SQ</div>
      </div>
      <div class="number">{{number}}</div>
    </div>
    <div class="right">
      <div class="icon-video">
        <div @click="add">
          <van-icon name="play-circle-o" size="24"/>
        </div>
      </div>
      <div class="icon-right">
        <img src="../assets/image/gengduo.png" >
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:"musicList",
    props:{
      name:{
        type:String,
      },
      singerName:{
        type:String,
      },
      number:{
        type:Number,
      },
    },
    methods:{
      _click(){
        this.$emit("click")
      },
      add(){
        this.$emit("add")
      }
    }
  }
</script>

<style lang="less" scoped>
  .musicList{
    margin-bottom: 5px;
    width: 100%;
    height: 50px;
    display: flex;
    .left{
      position: relative;
      flex: 80%;
      padding-left:35px ;
      .title{
        font-size: 16px;
        margin-top: 3px;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .singer{
        margin-top: 5px;
        font-size: 12px;
        color: #757575;
        position: relative;
        text-indent: 30px;
        &>span{
          display: block;
          width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .label{
          border: 1px solid #dfb8b9;
          color: #da4f48;
          text-indent: 0;
          line-height: 15px;
          padding: 0px 2px ;
          border-radius: 3px;
          position: absolute;
          left: 0px;
          top: 0px;
        }
      }
      .number{
        position: absolute;
        left: 0px;
        top: 15px;
        font-size: 18px;
      }
    }
    .right{
      flex: 20%;
      display: flex;
      .icon-video{
        flex: 1;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
      }
      .icon-right{
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        img{
          width: 24px;
          height: 24px;
        }
      }
    }
    
  }
</style>