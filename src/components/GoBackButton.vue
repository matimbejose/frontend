<template>
<div>
    <button @click="goBack(length)" class="btn btn-default mr-2 btn-xs"><i class="fas fa-arrow-circle-left"></i> Voltar</button>
</div>
</template>

<script>

export default { 
  name: "GoBackButton",
  props: ['length'],
  methods: {
    goBack(length) {
        this.$router.go(length)
    },

  }
}


</script>

<style>

</style>