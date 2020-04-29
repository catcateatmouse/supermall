<template>
  <div>
      <navbar>
          <div slot="left" class="back" @click="backclick">
              <img src="../../../assets/img/common/back.svg" alt="">
          </div>
        <div slot="center" class="title" >
            <div  v-for="(item,index) in title" :key = index class="titleitem" 
            @click="titleclick(index)"
            :class="{active:index === currentindex}">
                {{item}}
            </div>
        </div>
      </navbar>
  </div>
</template>

<script>
import navbar from '../../../components/common/navbar/navbar'

export default {
    data(){
        return{
            title:['商品','参数','评论','推荐'],
            currentindex: 0
        }
    },
    methods:{
        titleclick(index){
            this.currentindex = index;
            this.$emit('titleclick',index)
        },
        backclick(){
            this.$router.back();
            // this.currentindex = 0
        }
    },
components:{
navbar
}
}
</script>

<style>
.title{
    display: flex;
    font-size:13px;
}
.titleitem{
    flex: 1;
}
.active{
    color: red;
}
.back{
    margin-top: 7px;
}
</style>