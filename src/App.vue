<template>
  <div id="app">
    <div
      v-if="loggedIn"
      class="wrapper"
      style="background-color: rgba(0, 0, 0, 0.2)"
    >
      <Header />
      <Menu />
      <Content />
      <Footer />
    </div>
    <div v-if="!loggedIn">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./views/template/header/Header";
import Menu from "./views/template/menu/Menu";
import Content from "./views/template/Content";
import Footer from "./views/template/footer/Footer";

export default {
  name: "App",
  components: {
    Header,
    Menu,
    Content,
    Footer,
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
};
</script>

<style>
#app {
  font-size: 12px !important;
}
</style>
