<template>
  <div class="iconmenu">
    <quick-menu :menu-count="4" :icon-class="icons" :menu-url-list="list" :position="position"></quick-menu>
  </div>
</template>
<script>
import quickMenu from "vue-quick-menu";
export default {
  name: "iconmenu",
  data() {
    return {
      count: 4,
      icons: ["fa fa-home", "fa fa-comment", "fa fa-code", "fa fa-envelope"],
      list: [
        { isLink: true, url: "/" },
        { isLink: false },
        { isLink: false },
        { isLink: false }
      ],
      position: "top-left"
    };
  },
  components: { quickMenu }
};
</script>
<style scoped>
.iconmenu {
}
</style>


