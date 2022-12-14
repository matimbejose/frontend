<template>
    <li class="nav-item">
        <router-link :to="'/'+link" class="nav-link text-light">
            <i :class="'fas fa-'+icon+' nav-icon'"></i>
            <p>{{ text }}</p>
        </router-link>
    </li>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MenuItem',
  props: ['text', 'icon', 'link'],
  computed: mapState(['isTruth'])

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
