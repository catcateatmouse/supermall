<template>
<div id="home">
 <navbar class="home-nav">
   <div slot="center">购物车</div>
 </navbar>
 
 <sscroll class="content" 
 ref="scroll" 
 :probetype="3" 
 @scroll="scroll" 
 :pull-up-load="true"
  @pullingUp="pullingUp">
   <homeswiper :banners="banners"></homeswiper>
 <recommendview :recommends="recommends"></recommendview>
 <featureview></featureview>
 <tabcontrol :titles="titles" class="tabcontrol" @tabclick="tabclick"></tabcontrol>
 <goodslist :goods="showgoods"></goodslist>
 
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
    banners:null,
    recommends:null,
    currenttype:'pop',
    titles:['流行','新款','精选'],
    goods:{
      'pop':{page:0,list:[]},
      'new':{page:0,list:[]},
      'sell':{page:0,list:[]},
    },
    isshow:false
  }
},
computed:{
  showgoods(){
    return this.goods[this.currenttype].list
  }
},
created(){
  
  this.gethomemultidata(),
  this.gethomegoods('pop'),
   this.gethomegoods('new'),
    this.gethomegoods('sell')
},
mounted(){
 
this.$bus.$on('itemimgload',()=>{this.$refs.scroll.refresh();
  })
},
methods:{
  pullingUp(){this.gethomegoods(this.currenttype);
  this.$refs.scroll.finishPullUp()
  },
  scroll(position){
if(-position.y>1000){this.isshow=true}else{this.isshow=false}
 },
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
console.log(this.goods[type].page);

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
  position: fixed;
  left: 0;
  right: 0;
  top:0;
  z-index:9;
  
}
.tabcontrol{
  /* position: sticky; */
  top: 44px;
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
</style>