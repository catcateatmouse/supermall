<template>
<div>
  <Swiper>
   <SwiperItem v-for="(item,index) in banners" :key ="index"><a :href="item.link">
     <img :src="item.image" alt="" @load="imgeload"></a>
     </SwiperItem>
 </Swiper>
 </div>
</template>

<script>
import {Swiper, SwiperItem} from "../../../components/common/swiper"

export default {
name:"homeswiper",
data(){
    return{
    isload:false
    }
},
methods:{
    
    imgeload(){if(!this.isload){
        this.$emit('swiperimgeload');
        this.isload = true;

    }
    }
},
props:{
    banners:{
        type:Array,
        default(){
            return[]
        }
    },
   
},
components:{
    Swiper,
    SwiperItem
}
}
</script>

<style>

</style>