<template>
<div id="home">
 <navbar class="home-nav">
   <div slot="center">购物车</div>
 </navbar>
 <tabcontrol :titles="titles"
  class="tabcontrol"
  v-show="isfixed"
  @tabclick="tabclick" 
  ref="tabcontrol1"></tabcontrol>
 <sscroll class="content" 
 ref="scroll" 
 :probetype="3" 
 @scroll="scroll" 
 :pull-up-load="true"
  @pullingUp="pullingUp">
   <homeswiper :banners="banners" @swiperimgeload="swiperimgeload"></homeswiper>
 <recommendview :recommends="recommends"></recommendview>
 <featureview></featureview>
 <tabcontrol :titles="titles"
  
  @tabclick="tabclick" 
  ref="tabcontrol2"></tabcontrol>
 <goodslist :goods="showgoods"/>
 
 <ul>
   <li>ddd</li>
   <li>asd</li>
   <li>dd</li>
   <li>sad</li>
   <li>ss</li>
   <li>asd</li>
   </ul>
 </sscroll>
 <backtop @click.native="backclick" v-show="isshow"></backtop>
 </div>
</template>

<script>
 import navbar from '../../components/common/navbar/navbar'
 import {gethomegoods, gethomemultidata} from "../../network/home"
 import homeswiper from './childcomps/homeswiper'
 import recommendview from './childcomps/recommendview'
 import featureview from './childcomps/FeatureView'
 import tabcontrol from '../../components/content/tabcontrol/tabcontrol'
 import goodslist from '../../components/content/goods/goodslist'
 //调用封装好的滚动组件
 import sscroll from '../../components/common/scroll/scroll'
 import backtop from '../../components/content/backtop/backtop'
 
 import {itemListenerMixin} from '../../common/mixin'
export default {
name:"home",
components:{
  navbar,
  homeswiper,
  recommendview,
  featureview,
  tabcontrol,
  goodslist,
  sscroll,
  backtop
},

data(){
  return{
    scrolly:0,
    isfixed:false,
    taboffsettop: 0,
    banners:null,
    recommends:null,
    currenttype:'pop',
    titles:['流行','新款','精选'],
    goods:{
      'pop':{page:0,list:[]},
      'new':{page:0,list:[]},
      'sell':{page:0,list:[]},
    },
    isshow:false,
    
  }
},
computed:{
  showgoods(){
    return this.goods[this.currenttype].list
  }
  
},
activated(){
  this.$refs.scroll.refresh();
   this.$refs.scroll.scrollto(0,this.scrolly,0)
   
    },
deactivated(){
  this.scrolly = this.$refs.scroll.getscrolly()
this.$bus.$off('itemimgload',this.itemimglistener
  )

  },
created(){
  
  this.gethomemultidata(),
  this.gethomegoods('pop'),
   this.gethomegoods('new'),
    this.gethomegoods('sell')
},
mounted(){


},
mixins:[itemListenerMixin],
methods:{
  swiperimgeload(){   this.taboffsettop =  this.$refs.tabcontrol2.$el.offsetTop
  },
 //上啦加载更多
  pullingUp(){this.gethomegoods(this.currenttype);
  this.$refs.scroll.finishPullUp()
  },
  scroll(position){
    // this.scrolly = position.y
    //决定backtop是否要显示
if(-position.y>1000){this.isshow=true}else{this.isshow=false}
//决定tabcontrol是否吸顶
// console.log(position);
this.isfixed = -position.y>this.taboffsettop
 },
 //监听tab事件点击
  tabclick(index){
    // console.log(index);
    switch(index){
      case 0 :
        this.currenttype= 'pop'
        break
         case 1 :
        this.currenttype= 'new'
        break
         case 2 :
        this.currenttype= 'sell'
        break

    }
    this.$refs.tabcontrol2.currentindex =index;
    this.$refs.tabcontrol1.currentindex =index;
  },
  backclick(){
// console.log(this.$refs.scroll);
this.$refs.scroll.scrollto(0,0)

  },
  // 网络请求相关
   gethomemultidata(){
  gethomemultidata().then(res=>{
    this.banners = res.data.data.banner.list;
    this.recommends = res.data.data.recommend.list
  })},
  gethomegoods(type){
    let page = this.goods[type].page+1;
    gethomegoods(type,page).then(res =>{
// console.log(res.data);
this.goods[type].list.push(...res.data.data.list);
this.goods[type].page=this.goods[type].page + 1;
// console.log(this.goods[type].page);

 })
  }
//
}
}
</script>

<style scoped>
#home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: white;
  /* position: fixed;
  left: 0;
  right: 0;
  top:0;
  z-index:9; */
  
}
.tabcontrol{
  /* position: sticky; */
  position: relative;
  z-index: 9;
}
/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
.content{
  overflow: hidden;
  position:absolute;
  top:44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .fixed{
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
  
} */
</style>