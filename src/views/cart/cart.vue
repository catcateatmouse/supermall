<template>
  <div id="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{cartlength}})</div></nav-bar>
    <!-- <cart-list class="cart-list" :cart-list="cartList"></cart-list> -->
    <!-- <bottom-bar></bottom-bar> -->
    <scroll class="content" ref="scroll">
    <cartlist>
    </cartlist>
    </scroll>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/navbar'
  import {mapGetters} from 'vuex'
  import cartlist from './cartchild/cartlist'
  import scroll from '../../components/common/scroll/scroll'
  import BottomBar from './cartchild/BottomBar'
  // import CartList from './childComps/CartList'
  // import BottomBar from './childComps/BottomBar'

	export default {
		name: "Cart",
    components: {
      NavBar,
      cartlist,
      scroll,
      BottomBar
      // CartList,
      // BottomBar
    },
     activated(){
       this.$refs.scroll.refresh()
        
    },
   
    computed: {
		 ...mapGetters(['cartlength','cartlist'])
      
    }
	}
</script>

<style scoped>
 #cart{
   height: 100vh;
 }
  /* #cart { 
    /*position: relative;
    height: 100vh;
  } */
 
.content{
  height: calc(100vh - 44px - 49px - 44px);
  overflow: hidden;
}
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
/* 
  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  } */
</style>
