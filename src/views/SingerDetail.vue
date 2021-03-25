<template>
  <div class="singerDetail">
    <div class="bg" :style="{backgroundImage: `url(${singerImg})`}">
      <div class="navBox">
        <van-nav-bar
        @click-left="goBack"
        >
          <template #left >
              <van-icon name="arrow-left" size="30" color="#fff"/>
          </template>
        </van-nav-bar>
      </div>
      <div class="singerBox">
        <div>
          <div class="_name">{{singerName}}</div>
          <div class="guanzhu">
            <div class="attention">
              <van-icon name="plus" />
              <span>关注</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-item" v-for="(item,index) in singerMusic" :key="index">
        <music-list
        :name="item.name"
        :singerName="item.al.name"
        :number="index+1"
        @click="goPlay(item)"
        @add="addPlayList(item)"
        >
        </music-list>
      </div>
    </div>
  </div>
</template>

<script>
  import musicList from "../components/musicList.vue"
  export default {
    name:"SingerDetail",
    data(){
      return {
        //歌手id
        singerId:"",
        //歌手音乐
        singerMusic:[],
        //歌手背景图
        singerImg:"",
        //歌手姓名
        singerName:""
      }
    },
    created(){
      let id = this.$route.query.id;
      this.singerId = id
      this.getSingerInfo();
    },
    methods:{
      //获取歌手单曲信息
      getSingerInfo(){
        this.axios({
          method:"GET",
          url:"/artists",
          params:{
            id:this.singerId
          }
        }).then(result => {
          for(let i = 0; i < 10; i++){
            this.singerMusic.push(result.data.hotSongs[i])
          }
          this.singerImg = result.data.artist.img1v1Url
          this.singerName = result.data.artist.name
        })
      },
      //返回上一级
      goBack(){
        this.$router.go(-1)
      },
      //跳转播放页
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
      musicList
    }
  }
</script>

<style lang="less" scoped>
.singerDetail{
  .bg{
    position: relative;
    border-top: 1px solid transparent;
    .navBox{
      margin-top: 30px;
    }
    /deep/.van-nav-bar__title{
      font-weight: bold;
    }
    /deep/.van-nav-bar{
      background-color: transparent;
    }
    /deep/[class*=van-hairline]::after{
      display: none;
    }
    height: 375px;
    background-size: contain;
    background-repeat: no-repeat;
    .singerBox{
      width: 100%;
      padding: 0 20px;
      position: absolute;
      left: 0;
      bottom: -30px;
      z-index: 99;
      &>div{
        height: 120px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 15px;
        padding: 20px;
        ._name{
          font-size: 22px;
          text-align: center;
        }
        .guanzhu{
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }
        .attention{
          line-height: 16px;
          padding: 7px 20px;
          background-color: #fe5042;
          margin-top: 12px;
          color: #fff;
          border-radius: 18px;
          span{
            margin-left: 5px;
            vertical-align: middle;
          }
        }
        /deep/.van-icon{
          vertical-align: middle;
        }
      }
    }
  }
  .content{
    transform: translateY(-50px);
    background-color: #fff;
    padding: 100px 20px 0;
    .content-item{
      margin-bottom: 10px;
    }
  }
}
</style>