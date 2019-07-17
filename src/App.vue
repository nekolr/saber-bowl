<template>
  <div id="app">
    <Header />
    <router-view name="content"></router-view>
    <Links />
    <!-- 只起到占位的作用 -->
    <div class="s-placeholder"></div>
    <Footer />
  </div>
</template>

<script>
import Header from "./views/layout/Header.vue";
import Links from "./components/Share.vue";
import Footer from "./views/layout/Footer.vue";

export default {
  name: "app",
  components: {
    Header,
    Links,
    Footer
  }
}
</script>

<style>
body {
  margin: 0px auto;
}

.s-placeholder {
  height: 42px;
}

</style>
