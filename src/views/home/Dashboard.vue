<template>
  <div>
      <h6>Dashboard</h6>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import { baseApiUri } from '@/global'
import token from '../../modules/users/store/index'


export default {
  name: 'Dashboard',
  data: function() {
      return {
          
      }
  },
  computed: mapState(['isTruth']),
  mounted() {
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
