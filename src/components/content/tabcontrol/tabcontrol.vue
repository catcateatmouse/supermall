<template>
  <div class="tabcontrol">
      <div v-for="(item,index) in titles" :key="index" class="tabcontrol-item"
       :class="{active:index ===currentindex}" @click="tabitemclick(index)">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
props:{
    titles:{
        type:Array,
        default(){
            return[]
        }
    }
},
data(){
    return{
        currentindex:0
    }
},
methods:{
tabitemclick(index){
    this.currentindex =index;
    this.$emit('tabclick',index)
   
}
}
}
</script>

<style>
.tabcontrol{
    display: flex;
    text-align: center;
    background-color: white;
}
.tabcontrol-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
}
.active{
    /* color:var(--color-height-text) */
    color:red;

}
.active span{
 padding: 5px; 
    border-bottom: 3px solid red
}
</style>