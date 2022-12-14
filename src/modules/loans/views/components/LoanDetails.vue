<template>
  <div class="col-5">
    <div class="card">
      <div class="card-header pl-3 pt-2 pb-2 m-0">
        <h3 class="card-title text-uppercase">
          <small>Dados do Empréstimo </small>
        </h3>
        <div class="float-right">
          <a href="#"><i class="fas ml-3 fa-sync-alt"></i></a>
        </div>
        <div class="float-right">
          <span data-card-widget="collapse" title="Collapse">
            <i class="fas fa-minus"></i>
          </span>
        </div>
      </div>
      <!-- /.card-header -->
      <div
        :class="
          loading
            ? 'card-body overlay-wrapper pb-0 mt-0'
            : 'card-body pb-0 mt-0'
        "
      >
        <div v-if="loading" class="overlay">
          <i class="fas fa-3x fas fa-circle-notch text-grey fa-spin"></i>
        </div>
        <table role="button" class="table table-hover table-font">
          <thead>
            <tr>
              <th class="p-1 font-weight-bold">CLIENTE</th>
              <th class="p-1 text-right"><i class="fas fa-users text-primary fa-lg"></i></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-1 text-uppercase">{{ customer.text }}</td>
              <td class="p-1"></td>
            </tr>
          </tbody>

          <thead>
            <tr>
              <th class="p-1 font-weight-bold">GESTOR</th>
              <th class="p-1 text-right">
                <i class="fas fa-user-tie text-primary fa-lg"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-1">{{ manager.text }}</td>
              <td class="p-1"></td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th class="p-1 font-weight-bold">GARANTIAS</th>
              <th class="p-1 text-right"><i class="fas fa-couch text-primary fa-lg"></i></th>
            </tr>
          </thead>
          <tbody>
            <tr class="p-0"
              v-for="(warranty, index) in warranties"
              :key="warranty.description"
            >
              <td class="pl-1">{{ warranty.description }}</td>
              <td class="text-right pr-1">
                <button
                  @click="removeWarranty(index)"
                  class="btn btn-outline-danger btn-xs"
                >
                  <i class="fa fa-fw fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- /.card -->
  </div>
</template>

<script>
export default {
  name: "LoanDetails",
  props: ["customer", "manager", "warranties", "loading"],
  emits: ['remove-warranty'],
  data() {
    return {
      errorsValidation: {},
    };
  },
  methods: {
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
