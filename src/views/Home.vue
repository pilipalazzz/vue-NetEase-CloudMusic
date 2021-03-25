<template>
  <div class="home">
    <!-- 顶部 -->
    <div class="navBar">
      <van-nav-bar
        title="Time Music"
      >
        <template #left >
          <div class="rightPng" @click="quit">
            <img :src='isLogin ? leftImg.login : leftImg.quit' class="auto-img" alt="">
          </div>
        </template> 
        <template #right>
          <div class="rightPng">
            <img src="../assets/image/mkf.png" class="auto-img" alt="">
          </div>
        </template> 
      </van-nav-bar>
    </div>

    <div class="contentBox">
      <!-- 轮播 -->
      <div class="swipeBox">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item  v-for="(item,index) in bannerImg" :key="index" >
            <img :src="item.pic" class="auto-img">
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- 局部导航 -->
    <div class="navList">
      <div class="navItem" v-for="(item,index) in navListData" :key="index" @click="go(item.name)">
        <img :src="item.src" >
        <span>{{item.title}}</span>
      </div>
    </div>

    <div class="songList-box">
      <div class="subTitle">
        <div class="_title">推荐歌单</div>
      </div>
      <!-- 推荐歌单列表 -->
      <div class="songList">
          <div class="songItem" v-for="(item,index) in songListData" :key="index">
            <img :src="item.picUrl">
            <span>{{item.name}}</span>
            <div class="playCount">
              <van-icon name="play" size="12" color="#fff"/>
              <div class="count">{{item.playCount}}万</div>
            </div>
          </div>
      </div>
    </div>
    <!-- 新歌速递 -->
    <div class="newSong-box">
      <div class="subTitle">
        <div class="_title">新歌速递</div>
      </div>
      <div class="newSong-content">
        <music-list
        v-for="(item,index) in newSongData"
        @click="goPlay(item)"
        :key="index" 
        :name="item.name" 
        :number="index+1" 
        :singerName="item.singer"
        @add="addPlayList(item)"
        >
        </music-list>
      </div>
    </div>





    <!-- 左侧弹出框 -->
    <van-popup v-model="isShow" position="left">
      <div class="leftContent">
        <div class="bgImg"></div>
      </div>
    </van-popup>
    
    
  </div>
</template>

<script>
import "../assets/less/Home.less"
import musicList from '../components/musicList.vue'
export default {
  name: 'Home',
  data(){
    return {
      musicData:[],
      //轮播图数据
      bannerImg:[],
      // 侧边弹出层是否展开
      isShow: false,
      // 局部导航默认激活下标
      active:0,
      //局部导航数据
      navListData:[
        {
          src:require('../assets/image/mrtj.png'),
          title:"每日推荐",
          name:"EveryDay"
        },
        {
          src:require("../assets/image/gs.png"),
          title:"歌手",
          name:"Singer"
        },
        {
          src:require("../assets/image/phb.png"),
          title:"排行榜",
          name:"Rank"
        },
        {
          src:require("../assets/image/ss.png"),
          title:"搜索",
          name:"SearchMusic"
        },

      ],
      //推荐歌单数据
      songListData:[],
      //新歌速递数据
      newSongData:[],
      
      isLogin:false,
      leftImg:{
        login:require("../assets/image/tc.png"),
        quit:require("../assets/image/dl.png")
      }
    }
  },
  created(){
    this.getBannerImg();
    this.getSongList();
    this.getNewSong();
    this.isLogin = this.$cookies.isKey("MUSIC_U")
    
  },
  
  methods:{
    //获取轮播图
    getBannerImg(){
      this.axios({
        method:"GET",
        url:"/banner",
        params:{
          type:2
        }
      }).then(result => {
        this.bannerImg = result.data.banners
      })
    },
    // 左侧弹出
    changeShow(){
      this.isShow = true
    },
    // 获取推荐歌单
    getSongList(){
      this.axios({
        method:"GET",
        url:"/personalized",
        params:{
          limit:3
        }
      }).then(result => {
        this.songListData = result.data.result
        for(let i = 0; i < result.data.result.length; i++){
          let count = parseInt(result.data.result[i].playCount/10000)
          this.songListData[i].playCount = count
        }
      })
    },
    // 获取新歌速递
    getNewSong(){
      this.axios({
        withCredentials: true,//跨域
        method:"GET",
        url:"/top/song",
        params:{
          type:7
        }
      }).then(result => {
        for(let i = 0; i < 20; i++){
          this.newSongData.push(result.data.data[i])
        }
        let singer = "";
        
        for(let i = 0; i < this.newSongData.length; i++){
          let numbers = this.newSongData[i].album.artists.length;
          numbers = numbers > 3 ? 3 : numbers;
          for(let j = 0; j < numbers; j++){
            singer += `${this.newSongData[i].album.artists[j].name} / `
          }
          singer = singer.substring(0,singer.length-2)
          this.newSongData[i].singer = singer
          singer = ""
        }
        
      })
    },
    goPlay(e){
      localStorage.setItem('musicId', e.id);
      this.$store.commit("getMusicTime",e.duration)
      this.$router.push({name:"My",query:{id:e.id}})
      let src = `https://music.163.com/song/media/outer/url?id=${e.id}.mp3`
      this.$store.commit("setMusicSrc",src)
    },
    go(name){
      this.$router.push({name})
    },
    quit(){
      if(this.isLogin){
        this.$dialog.confirm({
          title:"退出登录",
          message:"是否确认退出登录?",
          confirmButtonColor: "#0C34BA",
        }).then(() => {

            this.$toast.loading({
              message: "正在退出...",
              forbidClick: true,
              duration: 0,
            });

            setTimeout(() => {
              this.$toast.clear();
              this.axios({
                method:"GET",
                url:"/logout"
              }).then(result => {
                
                this.$cookies.remove("MUSIC_U");
                this.$router.push({name:"Login"})
                
              }) 
            },800)
        })
      }else{
        this.$toast.loading({
          message: "正在跳转登录...",
          forbidClick: true,
          duration: 0,
        });
        setTimeout(() => {
          this.$toast.clear();
          this.$router.push({name:"Login"})
        },800)
      }
      
    },
    addPlayList(item){
      let arr = [];
      for(let i = 0; i < this.$store.state.playList.length; i++){
        arr.push(this.$store.state.playList[i].id)
      }
      if(arr.indexOf(item.id) == -1){
        let obj = {
          name:item.name,
          singerName:item.singer,
          id:item.id
        };
        this.$store.commit("addPlayList",obj)
        this.$toast("成功加入队列")
      }else{
        this.$toast("已在播放列表中")
      }
    }
    
  },
  components: {
    musicList
  }
}
</script>
<style lang="less" scoped>

</style>
