<template>
  <li class="nav-header pt-0 pb-0"><small>{{ text.toUpperCase() }}</small> </li>
</template>

<script>
export default {
    props: ['text'],
    name: 'Label',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
