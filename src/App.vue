<template>
  <div class id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  components: {}
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Patua+One|Rubik&display=swap");
#app {
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

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