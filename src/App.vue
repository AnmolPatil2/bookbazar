<template>
  <div class="grey lighten-4 min-height=100%" id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  components: {}
};
</script>

<style lang="scss">
#app {
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 1000px !important;
  // text-align: center;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>