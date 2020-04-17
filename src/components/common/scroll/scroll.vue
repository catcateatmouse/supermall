<template>
  <div class="wrapper" ref="wrapper">
      <div class="content"><slot> </slot></div>
      <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {

data(){
    return{
        scroll:null
    }
},
props:{
    probetype:{
        type:Number,
        default(){
            return 3
        }
    },
    pullUpLoad:{
        type:Boolean,
        default(){
            return false
        }
    }
},
mounted(){
    
    this.scroll = new BScroll(this.$refs.wrapper,{
       click:true,
       probeType:this.probetype,
       pullUpLoad:this.pullUpLoad
    }),
    
    console.log(this.scroll);
    this.scroll.on('scroll',(position)=>{this.$emit('scroll',position);
    }),
    this.scroll.on('pullingUp',()=>{this.$emit('pullingUp');
    })
   
   
},
methods:{
    refresh(){
       this.scroll&& this.scroll.refresh()
    },
   scrollto(x,y,time=300){
      this.scroll&& this.scroll.scrollTo(x,y,time)
   },
   finishPullUp(){
     this.scroll&&  this.scroll.finishPullUp()
   }
}

}
</script>

<style >

</style>