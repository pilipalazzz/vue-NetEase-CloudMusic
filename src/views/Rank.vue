<template>
  <div class="rank">
    <van-nav-bar
      title="排行榜"
      @click-left="goBack"
    >
      <template #left >
          <van-icon name="arrow-left" size="24" color="black"/>
      </template>
    </van-nav-bar>
    <bg></bg>
    <div class="content">
      <div class="item" v-for="(item,index) in rankData" :key="index" >
        <img :src="item.coverImgUrl" @click="goRankDetail(item)">
        <span class="desc">{{item.name}}</span>
        <span class="time">{{item.updateFrequency}}</span>
      </div>
    
     
    </div>
  </div>
</template>

<script>
import bg from "../components/bg.vue"
  export default {
    name:"Rank",
    data(){
      return {
        rankData:[]
      }
    },
    created(){
      this.getRankData();
    },
    methods:{
      //返回上一级
      goBack(){
        this.$router.go(-1)
      },
      //获取排行榜数据
      getRankData(){
        this.axios({
          method:"GET",
          url:"/toplist"
        }).then(result => {
          let data = [];
          for(let i = 0; i < 12; i++){
            data.push(result.data.list[i])
          }
          this.rankData = data
        })
      },
      // 跳转到排行榜详情
      goRankDetail(e){
        
        this.$router.push({name:"rankDetail",query:{id:e.id}})
      },
      
    },
    components:{
      bg
    }
  }
</script>

<style lang="less" scoped>
  .rank{
    /deep/.van-nav-bar__title{
      font-weight: bold;
    } 
    .content{
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      transform: translateY(-20px);
      background-color: #fff;
      padding: 20px 20px;
      display: flex;
      flex-wrap: wrap;
      .item{
        width: calc(100% / 3);
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
        position: relative;
        img{
          width: 80px;
          height: 80px;
          border-radius: 10px;
        }
        .desc{
          margin-top: 5px;
          font-size: 14px;

        }
        .time{
          position: absolute;
          left: 20px;
          top: 60px;
          color: #fff;
        }
      }
    }
  }
</style>



