<template>
  <div id="detail">
<detailchid class="nav-bar1" @titleclick="titleclick" ref="navbar" :probetype="3">
</detailchid>   
<Scroll class="content" ref="scroll" @scroll="contentscroll" >
<topswiper :topimages = "topimges"></topswiper>
<DetailBaseInfo :goods = "goods"></DetailBaseInfo>
<DetailShopInfo :shop = "shop"></DetailShopInfo>
<DetailGoodsInfo :detailInfo ="detailInfo" @imageLoad="imageLoad" ></DetailGoodsInfo>
<DetailParamInfo ref="params" :paramInfo ="paramInfo"></DetailParamInfo>
<DetailCommentInfo ref="comment" :commentInfo="commentInfo"></DetailCommentInfo>
<goodslist ref="recommend" :goods="recommends"></goodslist>
</Scroll>
<DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
<backtop v-show="isshow" @click.native="backclick"></backtop>

<!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailGoodsInfo from './childcomps/DetailGoodsInfo';
import Scroll from '../../components/common/scroll/scroll'
import DetailBaseInfo from './childcomps/DetailBaseInfo'
import detailchid from './childcomps/detailnavbar'
import {getdetail,Goods,Shop,GoodsParam,getrecommend} from '../../network/detail'
import topswiper from './childcomps/detailswiper'
import DetailShopInfo from './childcomps/DetailShopInfo'
import DetailParamInfo from './childcomps/DetailParamInfo'
import DetailCommentInfo from './childcomps/DetailCommentInfo'
import goodslist from '../../components/content/goods/goodslist'

import {itemListenerMixin} from '../../common/mixin'
import DetailBottomBar from './childcomps/DetailBottomBar'
import backtop from '../../components/content/backtop/backtop'
import {mapActions} from 'vuex'

// import toast from '../../components/common/toast/toast'

export default {
    name:'detail',
    components:{
        detailchid,
        topswiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        goodslist,
        DetailBottomBar,
        backtop,
        // toast
        
        
    },
    mixins:[itemListenerMixin],
data(){
    return {
    iid:null,
    topimges:[],
    goods:{},
    shop:{},
    detailInfo:{},
    paramInfo:{},
    commentInfo:{},
    recommends:[],
    themetopys:[],
    iindex:0,
     isshow:false,
    // message:'',
    // show:false

    }
},

created(){
    
    
  //获取数据
  this.iid =this.$route.params.iid
  getdetail(this.iid).then(res=>{
      //顶部轮播图数据
this.topimges = res.data.result.itemInfo.topImages

//获取baseinfo的数据
    const data = res.data.result;
   this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    // console.log(this.goods);
    //获取shop的数据
    this.shop = new Shop(data.shopInfo)
    // console.log(this.shop);
    //获取文字和图片
   
    this.detailInfo = data.detailInfo;
    // console.log( data.detailInfo); 
   //获取参数
    this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
    //获取评论
    if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {};
        }
     
  })
  getrecommend().then(res=>{
      this.recommends =res.data.data.list
       //渲染完组件的dom在执行下面的回调函数
    //    this.$nextTick(()=>{ 
    //    })
  })
  
},
mounted(){
   
},
destroyed(){
    this.$bus.$off('itemimgload',this.itemimglistener)
    
},
methods:{
    ...mapActions(['addCart']),
    addToCart(){
//         console.log('gg');
        // 1.创建对象
        const obj = {}
        // 2.对象信息 
        obj.iid = this.iid;
        obj.imgURL = this.topimges[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.newPrice;
        // 3.添加到Store中
        // this.$store.commit('addCart', obj)
        this.addCart(obj).then((res)=>{
            // this.show = true;
            // this.message =res;
            // setTimeout(()=>{this.show =false;this.message=''},2000)
         
            this.$Toast.show(res,2000)
            
        })
        // this.$store.dispatch('addCart', obj).then((res)=>{console.log(res);})
        // console.log(this.goods);
        // console.log(this.$store.state.cartlist);
    },
//添加购物车
    backclick(){
// console.log(this.$refs.scroll);
this.$refs.scroll.scrollto(0,0)

  },
    contentscroll(position){
      
    // this.scrolly = position.y
    //决定backtop是否要显示
if(-position.y>1000){this.isshow=true}else{this.isshow=false}
//决定tabcontrol是否吸顶
// console.log(position);
this.isfixed = -position.y>this.taboffsettop
 
    //    console.log(this.iindex);
       if(-position.y<8586 && -position.y>0){ this.$refs.navbar.currentindex=0}
        else if(-position.y<9482 && -position.y>8586) {this.$refs.navbar.currentindex=1}
        else if(-position.y<9698  && -position.y>9482) {this.$refs.navbar.currentindex=2}
        else if(-position.y && -position.y>9698) {this.$refs.navbar.currentindex=3}
    //    if(0<-position.y<8586){ this.$refs.navbar.currentindex=0}
    //     else if(8586<-position.y<9482) {this.$refs.navbar.currentindex=1}
    //     else if(9482<-position.y<9698) {this.$refs.navbar.currentindex=2}
    //     else if(9698<-position.y) {this.$refs.navbar.currentindex=3}
       
    },
    titleclick(index){
      
    this.$refs.scroll.scrollto(0,this.themetopys[index],100)
    
    },
   
    imageLoad(){
        // console.log('ok');
        this.$refs.scroll.refresh()
        // console.log(this.$refs.scroll.refresh);
        this.themetopys=[];
        this.themetopys.push(0);
   this.themetopys.push(-this.$refs.params.$el.offsetTop+44);
   this.themetopys.push(-this.$refs.comment.$el.offsetTop+44);
   this.themetopys.push(-this.$refs.recommend.$el.offsetTop+44);
    // console.log(this.themetopys);
    //加载完图片后确认的高度
    }
}
}

</script>

<style scoped>
#detail{
    position: relative;
    z-index: 9;
    background-color: white;
    height: 100vh;
}
.content{
    height:calc(100% - 44px - 49px)
}
.nav-bar1{
    position: relative;
    z-index: 9;
    background-color: white;
}
</style>