<template>
  <div class="searchMusic">
    <van-search 
    v-model="value" 
    :placeholder="searchDefault.showKeyword"
    shape="round"
    show-action
    action-text='取消'
    @cancel="goBack"
    @search="goDetail"
    >
    </van-search>
    <!-- <bg></bg> -->
    <div class="notice-box">
      <div class="notice">热搜榜</div>
    </div>
    <div class="searchHot">
      <div class="item" v-for="(item,index) in searchHotData" :key="index" @click="toDetail(item)">
        <div class="num">{{index+1}}</div>
        <span>{{item.first}}</span>
      </div>
      
    </div>
  </div>
</template>

<script>
  import bg from "../components/bg"
  export default {
    name:"SearchMusic",
    data(){
      return {
        value:"",
        // 热门搜索数据
        searchHotData:[],
        //默认搜索数据
        searchDefault:[]
      }
    },
    created(){
      this.getSearchHot()
      this.getSearchDefault()
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      //获取热门搜索
      getSearchHot(){
        this.axios({
          method:"GET",
          url:"/search/hot"
        }).then(result => {
          this.searchHotData = result.data.result.hots
        })
      },
      //获取默认搜索关键词
      getSearchDefault(){
        this.axios({
          method:"GET",
          url:"/search/default"
        }).then(result => {
          this.searchDefault = result.data.data
        })
      },
      //跳转搜索详情
      goDetail(){
        if(this.value == ""){
          this.value = this.searchDefault.realkeyword
        }
        this.$router.push({name:"SearchDetail",query:{value:this.value}})
      },
      //跳转搜索详情
      toDetail(item){
        
        this.$router.push({name:"SearchDetail",query:{value:item.first}})
      }
    },
    components:{
      bg
    }
  }
</script>

<style lang="less" scoped>
  .searchMusic{
    .van-search__content{
      flex: 85%;
    }
    .van-search__action{
      flex: 15%;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }
    .notice-box{
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      .notice{
        border-bottom: 1px solid #dbdbdb;
      }
    }
    .searchHot{
      display: flex;
      padding: 0 20px;
      font-size: 14px;
      flex-wrap: wrap;
      .item{
        width: calc(100% / 2);
        height: 30px;
        line-height: 30px;
        display: flex;
        .num{
          flex: 15%;
          font-size: 16px;
          color: #999;
        }
        span{
          flex: 85%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>