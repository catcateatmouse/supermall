<template>
  <div class="wrapper" ref="wrapper">
      <div class="content"><slot> </slot></div>
     
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
    })

    if (this.probetype==2||this.probetype==3){
    this.scroll.on('scroll',(position)=>{this.$emit('scroll',position);
    })
    }
     if (this.pullUpLoad == true){
    this.scroll.on('pullingUp',()=>{this.$emit('pullingUp');
    })
    }
   
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
   },
   getscrolly(){
      return this.scroll ? this.scroll.y :0
     
      
   }
}

}
</script>

<style >

</style>