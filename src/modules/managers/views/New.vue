<template>
  <div class="elevation-1 sidebar-light-primary p-3">
      <p class="text-uppercase"> add clientes </p><hr>
 
  </div>
</template>

<script>
import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-dt'
import 'datatables.net-bs4'
import 'datatables.net-buttons'
import 'datatables.net-buttons-bs4'



export default { 

}

// $('#example2').DataTable( {
//     dom: 'Bfrtip',
//     buttons: [
//         'copy', 'excel', 'pdf'
//     ]
// } );

 $(function () {

    $('#example2').DataTable({
      "paging": true,
      "lengthChange": false,
      "searching": false,
      "ordering": true,
      "info": true,
      "autoWidth": false,
      "responsive": true,
    });
  });
</script>

<style>

</style>