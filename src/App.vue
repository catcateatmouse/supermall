<template>
  <div id="app">
<keep-alive exclude="detail">
    <router-view>
    </router-view>
     </keep-alive> 
   <MainTabBar>
   </MainTabBar>

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import MainTabBar from 'components/content/tabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
