<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" :ischeck="isSelectAll" @click.native="allcheck"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计:¥{{totalPrice}} </span>
    <span class="buy-product">去计算({{checklength}})</span>
  </div>
</template>

<script>
  import CheckButton from '../../../components/content/checkbutton/checkbutton'

	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    data(){
      return{
      all:true
      }
    },
    
    computed: {
		  totalPrice() {
        const cartlist = this.$store.getters.cartlist;
        return cartlist.filter(item => {
          return item.check})
        .reduce((preValue, item) => {
          return preValue + item.count * item.newPrice.substr(1)}, 0)
        .toFixed(2)
      },
      alllength(){
        return this.$store.getters.cartlist.length
      },
      checklength(){
        return this.$store.getters.cartlist.filter(item =>{ return item.check }).length
      },
      isSelectAll() {
        if(this.$store.getters.cartlist.length ===0 ){return false}
        for(let item of this.$store.getters.cartlist){
          if(!item.check){
            return false
          }
        }
        return true
        // return this.$store.getters.cartList.find(item => item.checked === false) === undefined;
      }
    },
    //  mounted(){
    //   this.$bus.$on('haveflase',()=>{console.log('不全');
    //   this.all = false
    //   }),
    //   this.$bus.$on('alltrue',()=>{console.log('完全');
    //   this.all = true
    //   })
    // },
    methods: {

      allcheck(){
        if(this.isSelectAll){
          this.$store.getters.cartlist.forEach(item => item.check=false)
        }else{
          this.$store.getters.cartlist.forEach(item => item.check=true)
        }
      //   let aa =false;
      //   let bb = this.$store.getters.cartlist;
      //   for(let item of bb){
      //     if (item.check == false){ aa = true}
      //   } 
      //   this.all = aa;
      //   let nocheck = this.$store.getters.cartlist.filter(item =>{ return item.check == false });
      //   if(this.all){
        
      //  for( let item of nocheck){
      //    item.check = true
      //  }
      //  }else{
      //     for( let item of this.$store.getters.cartlist){
      //    item.check = false
      //  }
      //  }
      },
      checkBtnClick: function () {
        // 1.判断是否有未选中的按钮
        let isSelectAll = this.$store.getters.cartList.find(item => !item.checked);

        // 2.有未选中的内容, 则全部选中
        if (isSelectAll) {
          this.$store.state.cartList.forEach(item => {
            item.checked = true;
          });
        } else {
          this.$store.state.cartList.forEach(item => {
            item.checked = false;
          });
        }
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
