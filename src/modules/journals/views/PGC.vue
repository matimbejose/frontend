<template>
  <div class="elevation-1 sidebar-light-primary pl-3 pt-3 transparent">
    <div class="clearfix">
      <span class="text-uppercase float-left">Contas</span>
      <div class="float-right mb-2">
        <GoBackButton :length="-1" />
      </div>
    </div>

    <hr class="pt-0 pb-1 mt-0 mb-1" />

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <!-- /.card -->

            <div class="card">
              <div class="card-header pl-3 pt-2 pb-2">
                <h3 class="card-title">
                  <i class="fas fa-users"></i>
                  <small>
                    Lista de Contas
                    <span class="right ml-2 badge badge-success"
                      >Total: {{ accounts.length }}</span
                    >
                    <a @click="reloadAccounts()"
                      ><i class="fas ml-3 fa-sync-alt"></i
                    ></a>
                  </small>
                </h3>
              </div>
              <!-- /.card-header -->
              <div :class="loading ? 'card-body overlay-wrapper' : 'card-body'">
                <div v-if="loading" class="overlay">
                  <i
                    class="fas fa-3x fas fa-circle-notch text-grey fa-spin"
                  ></i>
                </div>
                <div class="d-flex justify-content-end">
                  <button
                    data-toggle="modal"
                    data-target="#createNewAccount"
                    class="btn btn-success mr-1 btn-xs"
                  >
                    <i class="fas fa-plus-circle"></i> ADICIONAR
                  </button>
                </div>

                <!-- table begin  -->
                <table
                  id="table_account"
                  class="table table-sm"
                  style="width: 100%"
                >
                  <thead>
                    <tr class="text-uppercase">
                      <th>Código</th>
                      <th>Conta</th>
                      <th>Tipo</th>
                      <th class="text-center">Acções</th>
                    </tr>
                  </thead>
                  <!-- <tbody>
                    <tr v-for="account in accounts" :key="account.id">
                      <td>{{ account.ref_code }}</td>
                      <td>{{ account.name }}</td>
                      <td>{{ account.address }}</td>
                      <td class="text-center">
                        <button
                          @click="editAccount(`${account.id}`)"
                          class="btn btn-outline-success mr-1 btn-xs"
                        >
                          <i class="fas fa-pen"></i>
                        </button>
                        <button
                          @click="deleteAccount(account.id)"
                          class="btn btn-outline-danger mr-1 btn-xs"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody> -->
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <Form ref="accountsForm" @reloadAccounts="reloadAccounts()" />
    <!-- /.content -->
  </div>
</template>

<script>
import $ from "jquery";
import "../../../assets/css/style.css";
import "datatables.net-bs4/js/dataTables.bootstrap4.min";
import "datatables.net-buttons-bs4/js/buttons.bootstrap4.min";
import jsZip from "jszip";
import "pdfmake/build/vfs_fonts";
import "pdfmake/build/pdfmake.min";
import "datatables.net-buttons/js/buttons.print.min";
import "datatables.net-buttons/js/buttons.flash.min";
import "datatables.net-buttons/js/buttons.html5.min";
import "datatables.net-responsive-bs4";
import store from "../store";
import token from "../../users/store";
import Axios from "axios";
import GoBackButton from "../../../components/GoBackButton.vue";
import { baseApiUrl } from "../../../global";
import Form from "../components/AccountForm.vue";

window.JSZip = jsZip;
Axios.defaults.baseURL = baseApiUrl;

export default {
  components: {
    GoBackButton,
    Form,
  },
  name: "Listaccounts",
  data() {
    return {
      accounts: [],
      loading: false,
      accountList: [],
      class_id: "",
      current_page: 1,
      current_filtered: [],
      table: null,
    };
  },
  methods: {
    getAccounts() {
      this.loading = true;
      Axios.get("/accounts", {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.accounts = response.data.accounts;
          this.loading = false;
          $(".odd").html("");
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    editAccountData(id) {
      Axios.get(`/accounts/${id}`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.formData = { ...response.data };
          this.$refs.accountsForm.setFormData(this.formData);
        })
        .catch((error) => {
          this.showError(error.response);
        });
    },
    reloadAccounts() {
      this.table.ajax.reload();
    },
    showAccounts() {
      let self = this;
      $(document).ready(function () {
        self.table = $("#table_account").DataTable({
          processing: true,
          serverSide: true,
          ajax: {
            headers: { Authorization: `Bearer ${token.state.token}` },
            url: `${baseApiUrl}/accounts`,
            dataType: "json",
            data: (d) => {
              return {
                ...self.page_info,
                ...d,
                data: "",
                draw: d.draw,
                class_id: self.class_id,
                page: self.current_page,
              };
            },
          },
          drawCallback: function (settings) {
            self.current_filtered = settings.json;
          },
          // language: {
          //   url: "/pt.json",
          // },
        });

        $("#table_account").on("page.dt", function (e) {
          const info = self.table.page.info();
          self.current_page = info.page;
        });

        $("#table_account tbody").on("click", "button", function (e) {
          let id_and_type = e.target.id.split("-");
          if (id_and_type[0] === "delete") {
            self.deleteAccount(id_and_type[1]);
          } else if (id_and_type[0] === "edit") {
            self.editAccountData(id_and_type[1]);
          }
        });
      });
    },
    showAlert(msg) {
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        title: msg,
        icon: "error",
      });
    },
    deleteAccount(id) {
      this.$swal
        .fire({
          title: "Tem certeza?",
          text: "Não vai poder reverter esta acção!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, Eliminar!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            Axios.delete(`/accounts/${id}`, {
              headers: { Authorization: `Bearer ${token.state.token}` },
            })
              .then((response) => {
                this.reloadAccounts();
                this.$swal.fire("Eliminado!", response.data.success, "success");
              })
              .catch((error) => {
                this.showAlert(error.response.data.error, "error");
              });
          }
        });
    },

    editAccount(id) {
      this.$store.dispatch("setAccountEditingId", id);
      this.$store.dispatch("setAccountActionPerform", false);
      this.$router.replace(`/accounts/edit`);
    },
    viewAccount(id) {
      this.$store.dispatch("setAccountEditingId", id);
      this.$store.dispatch("setAccountActionPerform", false);
      this.$router.replace(`/accounts/view`);
    },
  },
  mounted() {
    this.showAccounts();
    $(document).ready(function () {
      var table = $("#accounts").DataTable({
        //dom: 'Bfrtip',
        paging: true,
        info: true,
        ordering: true,
        searching: true,
        buttons: [
          {
            extend: "csv",
            text: '<i class="fas fa-file-csv"></i> Exportar CSV',
            className: "btn-xs mb-2",
          },
          {
            extend: "excel",
            text: '<i class="fas fa-file-excel"></i> Exportar Excel',
            className: "btn-xs mb-2",
          },
          {
            extend: "pdf",
            text: '<i class="fas fa-file-pdf"></i> Baixar PDF',
            className: "btn-xs mb-2",
          },
          {
            extend: "print",
            text: '<i class="fas fa-print"></i> Imprimir',
            className: "btn-xs mb-2",
          },
        ],
        //lengthMenu: false,
        select: true,
      });
      table.buttons().container().appendTo("#accounts_wrapper .col-md-6:eq(0)");
    });
  },
};
</script>

<style scoped>
.table.dataTable {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 10px;
}
</style>