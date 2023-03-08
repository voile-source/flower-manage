<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  mounted() {
     if (localStorage.getItem('store')) {
        this.$store.replaceState(Object.assign({},this.$store.state, JSON.parse(localStorage.getItem('store'))))
      }
      // 在页面刷新时将store保存到localStorage里
      window.addEventListener('beforeunload', () => {
        if(this.$store.state.isLogin)localStorage.setItem('store', JSON.stringify(this.$store.state))
      })
  },
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #18191C;
    height: 100%;
  }
  html,body {
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
  }
</style>
