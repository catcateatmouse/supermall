<template>
  <div class="cartlistitem">
      <div class="item-selector">
      <checkbutton :ischeck="cartlistitem.check" @click.native="checkclick"></checkbutton>
    </div>
    <div class="item-img">
      <img :src="cartlistitem.imgURL" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{cartlistitem.title}}</div>
      <div class="item-desc">商品描述: {{cartlistitem.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{cartlistitem.newPrice}}</div>
        <div class="item-count right">x{{cartlistitem.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import checkbutton from '../../../components/content/checkbutton/checkbutton'
export default {
name:"cartlistitem",
props: {
      cartlistitem: {
        type: Object
      }
    },
components:{
checkbutton,
},
methods:{
    checkclick(){
      this.cartlistitem.check = !this.cartlistitem.check
        // for (let index in this.$store.getters.cartlist){
        //  if(this.$store.getters.cartlist[index].check == false)
        //  {this.$bus.$emit('haveflase');break}
        //  else if(index == this.$store.getters.cartlist.length - 1){this.$bus.$emit('alltrue');}
        // }
        
    }
}

}
</script>

<style>
.cartlistitem {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>