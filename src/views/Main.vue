<template>
    <div class="main">
        <!-- 二级路由 -->
        <router-view></router-view>
        <div class="fff">
          <van-tabbar v-model="activeName" inactive-color="#646566" active-color="#f76f6f" route>
            <van-tabbar-item replace :to="item.path" v-for="(item,index) in tabbarData" :key="index">
              <span>{{item.title}}</span>
              <template #icon="props">
              <img :src="props.active ? item.activeImg  : item.inactiveImg" />
              </template>
            </van-tabbar-item>
          </van-tabbar>
        </div>
    </div>
</template>

<script>
    export default {
        name:"Main",
        data() {
            return {
                activeName:"Home",
                tabbarData:[
                    {
                        title:"发现",
                        name:"Home",
                        path:"/home",
                        activeImg:require("../assets/image/fx-active.png"),
                        inactiveImg:require("../assets/image/fx.png"),
                    },
                    // {
                    //     title:"歌单",
                    //     name:"SongList",
                    //     path:"/songList",
                    //     activeImg:require("../assets/image/gd-active.png"),
                    //     inactiveImg:require("../assets/image/gd.png"),
                    // },
                    {
                        title:"我的",
                        name:"My",
                        path:"/my",
                        activeImg:require("../assets/image/wd-active.png"),
                        inactiveImg:require("../assets/image/wd.png"),
                    },
                ]
            }
        }
    }
</script>

<style lang="less" scoped>
.main{
  .fff{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>