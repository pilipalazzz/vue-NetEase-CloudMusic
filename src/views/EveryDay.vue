<template>
  <div class="everyDay">
    <van-nav-bar
      title="每日推荐"
      @click-left="goBack"
    >
      <template #left >
          <van-icon name="arrow-left" size="24" color="black"/>
      </template>
    </van-nav-bar>
    <bg></bg>
    <div class="content">
      <music-list
      v-for="(item,index) in musicData"
      :key="index"
      :name="item.name"
      :singerName="item.singer"
      :img="item.al.picUrl"
      @click="goPlay(item)"
      @add="addPlayList(item)"
      ></music-list>
    </div>
  </div>
</template>

<script>
import bg from "../components/bg.vue"
import musicList from "../components/musicList-img.vue"
  export default {
    name:"EveryDay",
    data(){
      return {
        musicData:[]
      }
    },
    created(){
      
      this.getMusic();
      this.login();
    },
    methods:{
      // 返回上一级
      goBack(){
        this.$router.go(-1)
      },
      //获取每日推荐歌曲
      getMusic(){
        this.axios({
          withCredentials: true,//跨域
          method:"GET",
          url:"/recommend/songs",
        }).then(result => {
          this.musicData = result.data.data.dailySongs
          let singer = "";
          for(let i = 0; i < this.musicData.length; i++){
            for(let j = 0; j < this.musicData[i].ar.length; j++){
              singer += `${this.musicData[i].ar[j].name} / `
            }
            singer = singer.substring(0,singer.length-2)
            this.musicData[i].singer = singer
            singer = ""
          }
        })
      },
      goPlay(e){
        localStorage.setItem('musicId', e.id);
        this.$store.commit("getMusicTime",e.dt)
        this.$router.push({name:"My",query:{id:e.id}})
        let src = `https://music.163.com/song/media/outer/url?id=${e.id}.mp3`
        this.$store.commit("setMusicSrc",src)
      },
      login(){
        let isLogin = this.$cookies.isKey("MUSIC_U")
        if(isLogin == false){
          this.$store.commit("togglePlay",false)
          this.$toast("请先登录");
          this.$router.push({name:"Login"})
          return false
        }
      },
      //添加到播放队列
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
    components:{
      bg,
      musicList
    }
  }
</script>

<style lang="less" scoped>
  .everyDay{
    /deep/.van-nav-bar__title{
      font-weight: bold;
    }
    .content{
      padding: 10px 20px;
      background-color: #fff;
      border-radius: 15px;
      transform: translateY(-30px);
    }
  }
</style>