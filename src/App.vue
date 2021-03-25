<template>
  <div id="app">
    <audio :src="src" ref="audio" @canplay="setPlay" @timeupdate="listenAudioChange"></audio>
    <router-view/>
  </div>
</template>

<script>
export default {
  name:"App",

  computed: {
    src() {
      return this.$store.state.musicSrc;
    },
    //音频元素
    audioElement(){
      return this.$store.state.audioElement
    },
  },
  created(){
    this.$nextTick(() => {
      this.changeAudio(this.$refs.audio)

    })
    
  },
  methods:{
    // 修改audio元素,保存在公共数据中
    changeAudio(audio){
      this.$store.commit("initAudio",audio)
    },
    listenAudioChange(){
      let currentTime = this.audioElement.currentTime
      
      this.changeTime( currentTime )
    },
    // 修改当前播放时间
    changeTime(time){
      this.$store.commit("changeTime",time)
    },
    //获取歌曲总时长
    setPlay(){
     
      this.audioElement.play();

      this.$store.commit("togglePlay", true)
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.clearfix::after{
  content: "";
  display: block;
  clear: both;
  height: 0;
  line-height: 0;
  visibility: hidden;
}
.auto-img{
  width: 100%;
  height: 100%;
  display: block;
}
</style>
