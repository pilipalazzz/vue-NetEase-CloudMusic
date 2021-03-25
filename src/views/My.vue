<template>
  <div class="my">
    <!-- 顶部歌曲信息 -->
    <div class="navBar">
      <div class="icon" @click="goBack">
        <van-icon name="arrow-left" size="24"/>
      </div>
      <div class="title">{{songData.name}}</div>
      <div class="name">{{songData.singer}}</div>
    </div>
    <!-- 图片 -->
    <div class="imgBox">
      <div class="img" :style="{animationPlayState: isPlay ? 'running' : 'paused'}">
        <img :src="singerImg" class="auto-img">
      </div>
    </div>
    <!-- 进度条 -->
    <div class="bar" ref="bar">
      <div class="progressBar" @click="getRatio" ref="progressBar">
        <div class="progress" ref="progress" :style="{width: progressBar}"></div>
      </div>
      <div class="currentTime">{{formatTime1(currentTime)}}</div>
      <div class="time">{{formatTime(totalTime)}}</div>
    </div>
    <!-- 功能区 -->
    <div class="contorl">
      <!-- 循环 -->
      <div class="circulation">
        <div @click="changeShow">
          <van-icon name="bars" size="30"/>
        </div> 
      </div>
      <!-- 上一首 -->
      <div class="last">
        <div class="lastBtn" @click="toggleId(false)">
          <img class="auto-img" src="../assets/image/icon_rqx1tyi0lxe/x1.png" alt="">
        </div>
      </div>
      <!-- 播放按钮 -->
      <div class="playBtn" @click="toggle">
        <div>
          <van-icon :name="!isPlay ? 'play-circle' : 'pause-circle'" size="45" />
        </div>

      </div>
      <!-- 下一首 -->
      <div class="next">
        <div class="rightBtn" @click="toggleId(true)">
          <img class="auto-img" src="../assets/image/icon_rqx1tyi0lxe/x2.png" alt="">
        </div>
      </div>
      <!-- 喜欢 -->
      <div class="like">
        <div @click="changerLike">
          <van-icon name="like" size="28" :color="isLike ? '#fa7674' : '#ccc'"/>
        </div>
      </div>
    </div>

    <van-popup v-model="isShow" position="bottom">
      <div class="list-content">
        <div class="ss">
          <div class="playList">播放列表</div>
          <music-list
          v-for="(item,index) in playList"
          :key="index"
          :name="item.name"
          :singerName="item.singerName"
          @click="play(item)"
          :number="index+1"
          >
          </music-list>
          
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import "../assets/less/My.less"
import musicList from "../components/musicList.vue"
  export default {
    name:"My",
    data(){
      return {
        //音乐路径
        musicSrc:"",
        //音乐id
        musicId:"",
        //歌手图片
        singerImg:"",

        songData:[],

        localMusicId:null,

        isLike:false,

        songWord:"",

        isShow:false,
        //播放列表
        playList:[

        ],
        //正在播放的歌曲id
        playingId:null
      }
    },
    computed:{
      //音频元素
      audioElement(){
        return this.$store.state.audioElement
      },
      //获取当前播放时间
      currentTime(){
        return this.$store.state.currentTime
      },
      //播放状态
      isPlay () {
         return  this.$store.state.isPlay.a;
      },
      //歌曲总时长
      totalTime() {
        return this.$store.state.totalTime;
      },
      userId(){
        return this.$store.state.userId;
      },
      //进度条进度
      progressBar(){
        let totalTime = this.totalTime / 1000
        let ratio = (this.currentTime / totalTime) * 100 + "%"
        return ratio;
      },
      like(){
        return this.$store.state.like
      }
      
      
    },
    created(){
      // 截取歌曲id
      this.musicId = this.$route.query.id;
    
      this.localMusicId = localStorage.getItem("musicId");
      //获取歌曲详细信息
      this.getSongDetail()
      this.end()
      this.searchLike();
      this.getSongWord();
      this.playList = this.$store.state.playList
    },
    methods:{
      getSrc(){
        this.axios({
          method:"GET",
          url:"/song/url",
          params:{
            id:this.musicId
              
          }
        }).then(result => {
          
        }).catch(err => {
          
        })
      },
      //获取歌曲详情
      getSongDetail(){
        let ids = this.musicId;
        ids = ids == undefined ? this.localMusicId : this.musicId
        this.axios({
          method:"GET",
          url:"/song/detail",
          params:{
            ids:ids
          }
        }).then(result => {
          // 
          this.songData = result.data.songs[0]
          this.singerImg = result.data.songs[0].al.picUrl
          let singer = "";
          for(let i = 0; i < result.data.songs[0].ar.length; i++){
            singer += `${result.data.songs[0].ar[i].name} / `
          }
          singer = singer.substring(0,singer.length-2)
          this.songData.singer = singer

        })
      },
      //切换开关状态
      toggle(){
        
        this.$store.dispatch('togglePlay', !this.isPlay).then(() => {
          if (!this.isPlay) {
            this.audioElement.pause();
          } else {
            this.audioElement.play();
          }
       })

      },
      //返回上一级
      goBack(){
        this.$router.push({name:"Home"})
      },
      //格式化时间秒
      formatTime(time){
        time = ~~(time/1000);
        let formatTime;
        if(time < 10){
          formatTime = `00:0${time}`
        }else if(time < 60){
          formatTime = `00:${time}`
        }else{
          let m = ~~(time / 60);
          if(m < 10){
            m = '0' + m;
          }
          let s = time % 60;
          if(s < 10){
            s = "0" + s
          }
          formatTime = `${m}:${s}`
        }
        return formatTime
      },
      //格式化时间毫秒
      formatTime1(time){
        time = ~~time;
        let formatTime;
        if(time < 10){
          formatTime = `00:0${time}`
        }else if(time < 60){
          formatTime = `00:${time}`
        }else{
          let m = ~~(time / 60);
          if(m < 10){
            m = '0' + m;
          }
          let s = time % 60;
          if(s < 10){
            s = "0" + s
          }
          formatTime = `${m}:${s}`
        }
        return formatTime
      },
      //添加喜欢
      changerLike(){
        let isLogin = this.$cookies.isKey("MUSIC_U")
        if(isLogin == false){
          this.$toast("请先登录");
          this.$router.push({name:"Login"})
          this.$store.commit("togglePlay",false)
          this.audioElement.pause();
          return false
        }
        this.isLike = !this.isLike 
        if(this.isLike){
          if(this.musicId != undefined && this.isLike){
            this.$store.commit("pushLike",this.musicId)
            this.$toast("收藏成功")
          }
        }else{
          for(let i = 0 ; i < this.like.length; i++){
            let j = this.like.indexOf(this.musicId)
            
            if(j != -1){
              this.like.splice(j,1)
              this.$store.commit("pushLike1",this.like)
              this.$toast("已取消收藏")
            }
          }
        }
        
        
      },
      //检测喜欢
      searchLike(){
        for(let i = 0; i < this.like.length; i++){
          let j = this.like.indexOf(this.musicId)
          if(j != -1){
            this.isLike = true
          }else{
            this.isLike = false
          }
        }
      },
      //点击改变进度条
      getRatio(ev){
        let totalWidth = this.$refs.progressBar.offsetWidth;
        
        let totalX = this.$refs.bar.offsetLeft;
        let mouseX = ev.clientX;
        let ratio = (mouseX - totalX) / totalWidth;
        
        this.audioElement.currentTime = ratio * (this.totalTime/1000)
      },
      // 播放结束
      end(){
        this.audioElement.onended = () => {
          
          this.$store.commit("togglePlay",false)
        }
      },
      //获取歌词
      getSongWord(){
        let id = this.musicId;
        id = id == undefined ? this.localMusicId : this.musicId
        this.axios({
          method:"GET",
          url:"/lyric",
          params:{
            id : id
          }
        }).then(result => {
          // 
          this.songWord = result.data.lrc.lyric.split("\n")
          let a = this.songWord.splice(0,this.songWord.length-1)
          this.songWord = a

        })
      },
      changeShow(){
        this.isShow = true
      },
      play(item){
        let src = `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`
        this.$store.commit("setMusicSrc",src)
        this.playingId = item.id
        this.axios({
          method:"GET",
          url:"/song/detail",
          params:{
            ids:item.id
          }
        }).then(result => {
          
          this.$store.commit("getMusicTime",result.data.songs[0].dt)
          this.songData = result.data.songs[0]
          this.singerImg = result.data.songs[0].al.picUrl
          let singer = "";
          for(let i = 0; i < result.data.songs[0].ar.length; i++){
            singer += `${result.data.songs[0].ar[i].name} / `
          }
          singer = singer.substring(0,singer.length-2)
          this.songData.singer = singer

        })
      },
      toggleId(bool){
        if(this.playList.length != 0){
          let arr = [];
          for(let i = 0; i < this.$store.state.playList.length; i++){
            arr.push(this.$store.state.playList[i].id)
          }
          let i = arr.indexOf(this.playingId)
        
          if(bool == true){
            i = i == this.playList.length-1 ? 0 : i
            this.play(this.playList[i+1])
          }else{
            i = i == 0 ? this.playList.length-1 : i
            this.play(this.playList[i-1])
          }
        }else{
          this.$toast("请先添加歌曲")
        }
        // 
      }
    },
    components:{
      musicList
    }
    
  }
</script>

<style lang="less" scoped>

</style>