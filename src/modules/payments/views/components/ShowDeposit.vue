<template>
  <!-- End table Units -->

  <!--Begin Form modal used for create and edit -->

  <div
    class="modal fade"
    tabindex="-1"
    style="overflow: hidden"
    role="dialog"
    id="showPayment"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="card">
          <div class="card-header pl-2 pt-1 pb-2">
            <h3 class="card-title">
              <i class="fa fas fa-coins mr-2"></i>
              <small>Contabilidade</small>
            </h3>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Conta</th>
                  <th>Operação</th>
                  <th>Montante</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in accounts" :key="index">
                  <td>{{ cleanUUID(data.uuid) + "-" + data.name }}</td>
                  <td>{{ data.type == "debit" ? "Débito" : "Crédito" }}</td>
                  <td>{{ data.amount }}</td>
                </tr>
              </tbody>
            </table>

            <hr />

            <!-- table begin -->
          </div>
          <!-- /.card-body -->
          <!-- /.card-footer -->
          <div class="card-footer">
            <div class="d-flex justify-content-end">
              <button data-dismiss="modal" class="btn btn-danger mr-1 btn-sm">
                <i class="fas fa-times-circle"></i> Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- End form modal -->
</template>

<script>
import "select2";

export default {
  name: "ShowDeposit",
  data() {
    return {
      accounts: [],
    };
  },
  methods: {
    cleanUUID(uuid) {
      return uuid.split(".").join("");
    },
    setFormData(newData) {
      return (this.accounts = { ...newData });
    },
  },
  mounted() {},
};
</script>