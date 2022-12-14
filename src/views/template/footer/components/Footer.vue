<template>
  <footer class="main-footer text-light border-0 transparent">
    <strong
      >Desenvolvido pela -
      <a class="text-light" :href="link">{{ developed_by }}</a
      >.</strong
    >

    <div class="float-right d-none d-sm-inline-block">
      <b>Versão</b> {{ version }}
    </div>
  </footer>
</template>

<script>
export default {
  props: ["developed_by", "version", "link"],
  name: "FooterComponent",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
