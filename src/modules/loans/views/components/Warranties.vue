<template>
  <div class="col-12">
       <table id="unit-table" class="table table-sm table-hover">
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Descrição</th>
                  <th>Valor da compra</th>
                  <th>Valor actual</th>
                  <th>Ano de compra</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="warranty in warranties" :key="warranty.id">
                  <td>{{warranty.code}}</td>
                  <td>{{ warranty.description }}</td>
                  <td>{{ numberFormat(warranty.cost) }}</td>
                  <td>{{ numberFormat(warranty.value) }}</td>
                  <td>{{ warranty.acquisition_date }}</td>                
                </tr>
              </tbody>
            </table>
  </div>
</template>

<script>
export default {
  name: "Warranties",
  props: ["warranties"],
  emits: ['remove-warranty'],
  data() {
    return {
      errorsValidation: {},
    };
  },
  methods: {
    numberFormat(num) {
      if (!isNaN(num)) {
        let number = parseFloat(num);
        return number
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$& ")
          .replace(".", ",");
      } else {
        return 0.0;
      }
    },
    removeWarranty(i) {
      this.$swal.fire({
        title: 'Tem certeza?',
        text: "Não vai poder reverter esta acção!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
            this.$emit('remove-warranty', i)
            this.$swal.fire('Eliminado!', 'Garantia removida da lista!', 'success')

        }
      })
    },
  },
};
</script>
<style >

</style>
