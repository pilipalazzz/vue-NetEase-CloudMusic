<template>
  <div class="searchDetail">
    <van-search 
    v-model="value" 
    :placeholder="value"
    shape="round"
    >
      <template #left>
        <van-icon name="arrow-left" size="24" @click="goBack"/>
      </template>
    </van-search>
    <bg></bg>
    <div class="content">
      <div class="item" v-for="(item,index) in searchData" :key="index">
        <div class="left" @click="goPlay(item)">
          <div class="name">{{item.name}}</div>
          <div class="singer">
            <div class="label">SQ</div>
            {{item.singer}}
          </div>
          <div class="desc">{{item.alias[0]}}</div>
        </div>
        <div class="right">
            <img class="auto-img" src="../assets/image/tianjia.png" @click="addPlayList(item)">
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
  import bg from "../components/bg"
  import musicList from "../components/musicList"
  export default {
    name:"SearchDetail",
    data(){
      return{
        value:"",
        //搜索结果
        searchData:[]
      }
    },
    created(){
      let value = this.$route.query.value
      this.value = value
      this.getSearchData();
    },
    methods:{
      //返回上一级
      goBack(){
        this.$router.go(-1)
      },
      getSearchData(){
        this.axios({
          method:"GET",
          url:"/search",
          params:{
            keywords:this.value,
            limit:20,
            type:1
          }
        }).then(result => {
          this.searchData = result.data.result.songs
          let singer = "";
          for(let i = 0 ; i < this.searchData.length; i++){
            for(let j = 0; j < this.searchData[i].artists.length; j++){
              singer += `${this.searchData[i].artists[j].name} / `
            }
            singer = singer.substring(0,singer.length-2)
            this.searchData[i].singer = singer
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
.searchDetail{
  .van-search__content{
    flex: 85%;
  }
  .van-icon{
    flex: 15%;
  }
  .content{
    padding: 20px;
    .item{
      display: flex;
      padding: 8px 0;
      border-bottom: 1px solid #dbdbdb;
      &:nth-child(1){
        border-top:1px solid #dbdbdb;
      }
      .left{
        flex: 90%;
        .name{
          font-size: 16px;
          width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .singer{
          position: relative;
          margin: 3px 0;
          width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-left: 30px ;
          .label{
          border: 1px solid #dfb8b9;
          color: #da4f48;
          text-indent: 0;
          line-height: 15px;
          padding: 0px 2px ;
          border-radius: 3px;
          position: absolute;
          left: 0px;
          top: 0px;
        }
        }
      }
      .right{
        flex: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 24px;
          height: 24px;
        }
        
      }
    }
  }
}
</style>