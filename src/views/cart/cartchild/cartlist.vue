<template>
  <div class="cartlist">
   

   <cartlistitem
        v-for="(item,index) in cartlist" :key=index
        :cartlistitem="item"
      >
      </cartlistitem>
     
  </div>
</template>

<script>
 import cartlistitem from './cartlistitem'
import {mapGetters} from 'vuex'

export default {
name: "Cartlist",
components: {
  cartlistitem
},
computed: {
    ...mapGetters(['cartlist']),
   
}
}
</script>

<style scoped>
 
</style>