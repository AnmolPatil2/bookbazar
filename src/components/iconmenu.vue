<template>
  <div class="iconmenu">
    <quick-menu
      :menu-count="3"
      :icon-class="icons"
      :menu-url-list="list"
      :position="position"
      :backgroundColor="backgroundColor"
      :color="color"
    ></quick-menu>
  </div>
</template>
<script>
import quickMenu from "vue-quick-menu";
export default {
  name: "iconmenu",
  mounted() {
    var client = $(".iconmenu").css("content");
    if (client === '"desktop"') {
      // do smth.
      this.position = "top-left";
    } else {
      // do smth. else
      this.position = "top-right";
    }
  },
  data() {
    return {
      count: 4,
      icons: ["fa fa-home", "fa fa-search", "fa fa-code", "fa fa-envelope"],
      list: [
        { isLink: true, url: "/" },
        { isLink: true, url: "/searchresults" },
        { isLink: false },
        { isLink: false }
      ],
      position: "top-left",
      backgroundColor: " #2e9cca",
      color: "#123c69"
    };
  },
  components: { quickMenu }
};
</script>
<style scoped>
.iconmenu {
}
@media (min-width: 768px) {
  .iconmenu {
    content: "desktop";
  }
}
@media (max-width: 767px) {
  .iconmenu {
    content: "mobile";
  }
}
</style>


