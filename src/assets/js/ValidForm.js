import Vue from 'vue'

//局部导入提示组件
import { Toast } from 'vant'
Vue.use(Toast)

class ValidForm {
  constructor(){}
  valid(obj){
    // 遍历对象
    for(let key in obj){
      // 如果验证不通过
      if(!obj[key].reg.test(obj[key].value)){
        // 打印错误信息
        Toast(obj[key].msg)
        return false
      }
    }
    return true
  }
}
//导出实例
export const validForm = new ValidForm();