<template>
  <div class="checkbutton" :class="{check:ischeck}">
      <img src="../../../assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script> 
export default {
name:"checkbutton",
props:{
    ischeck:{
        type:Boolean,
        default:false
    }
}
}
</script>

<style>
.checkbutton{
    
    border-radius: 50%;
    border:2px solid #aaa;
}
.check{
    background-color: red;
    border-color: red;
    
}
</style>