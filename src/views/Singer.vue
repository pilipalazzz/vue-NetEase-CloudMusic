<template>
  <div class="singer">
    <van-nav-bar
      title="歌手分类"
      @click-left="goBack"
    >
      <template #left >
          <van-icon name="arrow-left" size="24" color="black"/>
      </template>
    </van-nav-bar>
    <!-- 分类盒子 -->
    <div class="navBarBox">
      <!-- 语言 -->
      <div class="language">
        <div :class="{active : LangIndex == index}" v-for="(item,index) in languageData" :key="index">
          <span @click="toggleLang(item,index)">{{item.title}}</span>
        </div>
      </div>
      <!-- 性别 -->
      <div class="sex">
        <div v-for="(item,index) in sexData" :key="index" :class="{active : sexIndex == index}">
          <span @click="toggleSex(item,index)">{{item.title}}</span>
        </div>
      </div>
    </div>
    <!-- 分类盒子结束 -->

    <div class="hot">热门歌手</div>
    <div class="content">
      <singer-list 
      v-for="(item,index) in singerData" 
      :key="index" 
      :singerName="item.name" 
      :img="item.picUrl"
      @click="goSingerDetail(item)"
      ></singer-list>
    </div>
  </div>
</template>

<script>
  import "../assets/less/Singer.less"
  import singerList from "../components/singerList.vue"
  export default {
    name:"Singer",
    data(){
      return {
        languageData:[
          {
            title:"华语",
            area:7
          },
          {
            title:"欧美",
            area:96
          },
          {
            title:"日本",
            area:8
          },
          {
            title:"韩国",
            area:16
          },
          {
            title:"其他",
            area:0
          }
        ],
        sexData:[
          {
            title:"男",
            type:1
          },
          {
            title:"女",
            type:2

          },
          {
            title:"乐队/组合",
            type:3

          },
        ],
        //默认语言激活下标
        LangIndex:0,
        //默认歌手性别激活下标
        sexIndex:0,
        //获取歌手性别参数
        type:1,
        //获取歌手语言参数
        area:7,
        //歌手数据
        singerData:[]
      }
    },
    created(){
      this.getSingerData();
    },
    methods:{
      //返回上一级
      goBack(){
        this.$router.go(-1)
      },
      //获取歌手数据
      getSingerData(){
        this.axios({
          method:"GET",
          url:"/artist/list",
          params:{
            type:this.type,
            area:this.area
          }
        }).then(result => {
          let singer = []
          for(let i = 0; i < 15; i++){
            singer.push(result.data.artists[i])
          }
          this.singerData = singer
        })
      },
      //切换语言
      toggleLang(item,index){
        if(this.LangIndex == index){
          return false
        }
        this.LangIndex = index
        this.area = item.area
        this.getSingerData()
      },
      //切换性别
      toggleSex(item,index){
        if(this.sexIndex == index){
          return false
        }
        this.sexIndex = index
        this.type = item.type
        this.getSingerData()
      },
      goSingerDetail(item){
        this.$router.push({name:"SingerDetail",query:{id:item.id}})
      }
    },
    components:{
      singerList
    }
  }
</script>

<style lang="less" scoped>
</style>