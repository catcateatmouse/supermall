<template>
  <div class="goods-list">
      <goodslistitem v-for="(item,index) in goods" :key=index :goodsitem="item" class="item"
       > </goodslistitem>
  </div>
</template>

<script>
import goodslistitem from './goodslistitem'
export default {
components:{
    goodslistitem
},
props:{
    goods:{
        type:Array,
        default(){
            return[]
        }
    }
},

methods:{

}
}
</script>

<style>
 .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: space-around;
  }

  .goods-list .item {
    width: 48%;
  }
</style>