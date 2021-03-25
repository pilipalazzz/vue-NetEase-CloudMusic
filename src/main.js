import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false


import { 
  Button,
  NavBar,
  Toast,
  Popup,
  Form,
  Field,
  Icon,
  Swipe, 
  SwipeItem,
  Tab, 
  Tabs,
  Tabbar, 
  TabbarItem,
  Search,
  Progress,
  Dialog
} from 'vant'

Vue
  .use(Button)
  .use(NavBar)
  .use(Toast)
  .use(Popup)
  .use(Form)
  .use(Field)
  .use(Icon)
  .use(Swipe)
  .use(SwipeItem)
  .use(Tab)
  .use(Tabs)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Search)
  .use(Progress)
  .use(Dialog)

//导入rem适配文件
import 'lib-flexible/flexible'
import 'vant/lib/button/style';

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// //配置请求基础路径
axios.defaults.baseURL = 'http://localhost:3000'


// 导入axios
import axios from 'axios'
//导入vue-axios
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
