<template>
  <div>
<swiper class="swipercontent">
    <swiperItem v-for="(item, index) in topimages" :key =index> <img :src="item" alt=""> </swiperItem>
</swiper>
  </div>
</template>

<script>

import {Swiper, SwiperItem} from '../../../components/common/swiper'
export default {
    props:{
    topimages:{
        type:Array,
        default(){
            return[]}
        }   
    },
components:{
    Swiper, SwiperItem
}
}
</script>

<style>
.swipercontent{
    height: 300px;
    overflow: hidden;
}
</style>