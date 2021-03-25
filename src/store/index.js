import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 音乐路径
    musicSrc:"",
    // 是否播放
    isPlay:{a: false},
    // 音频元素
    audioElement:null,
    //当前播放时间
    currentTime:0,
    //音频总时长
    totalTime : 0,
    //喜欢的音乐
    like:[],
    // 用户id
    userId:"",
    //播放队列
    playList:[
      
    ]
  },
  mutations: {
    // 修改路径
    setMusicSrc(state,src){
      state.musicSrc = src
    },
    // 播放/暂停
    togglePlay(state,bool){
      state.isPlay.a = bool
    },
    //获取音频元素
    initAudio(state,audio){
      state.audioElement = audio
    },
    // 修改当前播放时间
    changeTime(state,time){
      state.currentTime = time;
    },
    //获取音乐总时长
    getMusicTime(state,time){
      state.totalTime = time
    },
    // 设置userId
    setUserId(state,userId){
      state.userId = userId;
    },
    pushLike(state,id){
      state.like.push(id)
    },
    pushLike1(state,arr){
      state.like = arr
    },
    //增加到播放队列
    addPlayList(state,item){
      state.playList.push(item)
    }
  },
  actions: {
    togglePlay({commit}, bool) {
      commit('togglePlay', bool)
    }
  },
  modules: {
  }
})
