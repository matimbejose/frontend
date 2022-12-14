<template>
  <div
    class="content-wrapper pt-2 pl-3 pr-3"
    style="
      min-height: 90vh;
      margin-left: 250px;
      background-color: rgba(0, 0, 0, 0.2);
    "
  >
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Content",
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
