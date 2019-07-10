<template>
  <div id="app">
    <Header />
    <router-view name="content"></router-view>
    <Links />
    <Footer />
  </div>
</template>

<script>
import Header from "./views/layout/Header.vue";
import Links from "./components/Links.vue";
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
  margin: 0px;
}

</style>
