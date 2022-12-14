<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("destroyToken").then((response) => {
      this.$router.replace({ name: "login" });
      // window.location.href = "login";
    });
  },
};
</script>

