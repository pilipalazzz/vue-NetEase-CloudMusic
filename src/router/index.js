import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path:"/everyDay",
    name: 'EveryDay',
    component: () => import('../views/EveryDay.vue')
  },
  {
    path:"/rank",
    name: 'Rank',
    component: () => import('../views/Rank.vue')
  },
  {
    path:"/rankDetail",
    name: 'rankDetail',
    component: () => import('../views/rankDetail.vue')
  },
  {
    path:"/searchMusic",
    name: 'SearchMusic',
    component: () => import('../views/SearchMusic.vue')
  },
  {
    path:"/searchDetail",
    name: 'SearchDetail',
    component: () => import('../views/SearchDetail.vue')
  },
  {
    path:"/singer",
    name: 'Singer',
    component: () => import('../views/Singer.vue')
  },
  {
    path:"/singerDetail",
    name: 'SingerDetail',
    component: () => import('../views/SingerDetail.vue')
  },
  {
    path:"/main",
    name:"Main",
    component: () => import("../views/Main.vue"),
    children:[
      {
        path:"/home",
        name:"Home",
        component: () => import("../views/Home.vue")
      },
      {
        path:"/songList",
        name:"SongList",
        component: () => import("../views/SongList.vue")
      },
      {
        path:"/my",
        name:"My",
        component: () => import("../views/My.vue")
      }
    ]
  },
  
  
]

const router = new VueRouter({
  routes
})

export default router
