<template>
  <div class="songList">
    <!-- 歌单
    <music-list></music-list> -->
    {{currentTIme}}
    {{text}}
  </div>
</template>

<script>
import musicList from "../components/musicList.vue"
  export default {
    name:"SongList",
    data(){
      return {
        songWord:[],
      }
    },
    created(){
      this.getSongWord();
      
    },
    computed:{
      currentTIme(){
        let time = this.$store.state.currentTime;
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
      text(){
        let timer = setInterval(() => {
          let time = this.$store.state.currentTime;
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
          for(let i = 0; i < this.songWord.length; i++){
            let sss = this.songWord[i].substring(1,6)
            if(formatTime == sss){
              return this.songWord[i].substring(11)
            }
          }
        },1000)
          
        // return this.songWord
      }
    },
    methods:{
      getSongWord(){
        this.axios({
          method:"GET",
          url:"/lyric",
          params:{
            id : 1803349526
          }
        }).then(result => {
          this.songWord = result.data.lrc.lyric.split("\n")
          let a = this.songWord.splice(0,this.songWord.length-1)
          this.songWord = a
          
          // 
        })
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
      setSongWord(){
        
      }
    },
    components:{
      musicList,
    }
  }
</script>

<style lang="less" scoped>

</style>