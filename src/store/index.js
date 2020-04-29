import vue from 'vue'
import vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
//安装插件
vue.use(vuex)
const state ={
    cartlist:[]
}
const store = new vuex.Store({
    state,
    mutations,
    actions ,
    getters
})
//挂载vue实例上
export default store