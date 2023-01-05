<template>
  <div id="app">
    <!-- <Main/> -->
    <!-- <Login/> -->
    <!-- <Register/> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Main from './views/Home/main.vue'
import Login from './views/login/login.vue'
import Register from './views/register/register.vue'

export default {
  name: 'App',
  components: {
    Main,
    Login,
    Register
  }
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
}
body{
    margin: 0;
  }
</style>
