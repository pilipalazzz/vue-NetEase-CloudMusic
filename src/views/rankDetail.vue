<template>
  <div class="rankDetail">
    <van-nav-bar
      :title="rankName"
      @click-left="goBack"
    >
      <template #left >
          <van-icon name="arrow-left" size="24" color="black"/>
      </template>
    </van-nav-bar>
    <bg></bg>
    <div class="content">
      <music-list
      v-for="(item,index) in rankData"
      :key="index"
      :name="item.name"
      :singerName="item.singer"
      :number="index+1"
      @click="goPlay(item)"
      @add="addPlayList(item)"
      >
      </music-list>
    </div>
  </div>
</template>

<script>
  import bg from "../components/bg"
  import musicList from "../components/musicList"
import MusicList from '../components/musicList.vue'
  export default {
    name:"RankDetail",
    data(){
      return {
        //排行榜id
        rankId:"",
        // 排行榜歌曲数据
        rankData:[],
        // 排行榜名字
        rankName:"",
      }
    },
    created(){
      //截取id
      let id = this.$route.query.id;
      this.rankId = id;
      this.getRankData()
    },
    methods:{
      //返回上一级
      goBack(){
        this.$router.go(-1)
      },
      //获取排行榜歌曲数据
      getRankData(){
        this.axios({
          method:"GET",
          url:"/playlist/detail",
          params:{
            id : this.rankId
          }
        }).then(result => {
          let data = [];
          for(let i = 0; i < 20; i++){
            data.push(result.data.playlist.tracks[i]);
          }
          this.rankName = result.data.playlist.name;
          this.rankData = data;
          let singer = "";
          for(let i = 0 ; i < this.rankData.length; i++){
            for(let j = 0; j < this.rankData[i].ar.length; j++){
              singer += `${this.rankData[i].ar[j].name} / `
            }
            singer = singer.substring(0,singer.length-2)
            this.rankData[i].singer = singer
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
  .rankDetail{
    /deep/.van-nav-bar__title{
      font-weight: bold;
    } 
    .content{
      padding: 20px;
      background-color: #fff;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      transform: translateY(-20px);
    }
  }
</style>