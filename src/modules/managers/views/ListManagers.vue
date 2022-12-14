<template>
  <div class="elevation-1 sidebar-light-primary pl-3 pt-3 transparent">
    <div class="clearfix">
      <span class="text-uppercase float-left">Gestores</span>
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
                    Lista de Gestores
                    <span class="right ml-2 badge badge-success"
                      >Total: {{ managers.length }}</span
                    >
                    <a href="#" @click="getManagers()"
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
                <div
                  v-if="auths.includes(auth_types.MANAGER_CREATE)"
                  class="d-flex justify-content-end"
                >
                  <router-link
                    to="/managers/new"
                    class="btn btn-success mr-1 btn-xs"
                    ><i class="fas fa-plus-circle"></i> ADICIONAR</router-link
                  >
                </div>

                <!-- table begin  -->
                <table id="managers" class="table table-sm" style="width: 100%">
                  <thead>
                    <tr class="text-uppercase">
                      <th>Código</th>
                      <th>Nome</th>
                      <th>Utilizador</th>
                      <th>Telefone</th>
                      <th class="text-center">Acções</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="manager in managers" :key="manager.id">
                      <td>{{ manager.ref_code }}</td>
                      <td>{{ manager.name }}</td>
                      <td>{{ manager.username }}</td>
                      <td>{{ manager.phone }}</td>

                      <td class="text-center">
                        <router-link
                          :to="'/managers/view/' + manager.id"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Ver"
                          v-if="auths.includes(auth_types.MANAGER_VIEW)"
                          class="btn btn-outline-info mr-1 btn-xs"
                        >
                          <i class="fas fa-eye"></i>
                        </router-link>
                        <button
                          @click="editManager(`${manager.id}`)"
                          v-if="auths.includes(auth_types.MANAGER_EDIT)"
                          class="btn btn-outline-success mr-1 btn-xs"
                        >
                          <i class="fas fa-pen"></i>
                        </button>
                        <button
                          @click="deleteManager(manager.id)"
                          v-if="auths.includes(auth_types.MANAGER_DELETE)"
                          class="btn btn-outline-danger mr-1 btn-xs"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
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
import { authorities, baseApiUrl } from "../../../global";

window.JSZip = jsZip;

Axios.defaults.baseURL = baseApiUrl;

export default {
  components: {
    GoBackButton,
  },
  name: "Listmanagers",
  data() {
    return {
      managers: [],
      loading: false,
      auth_types: authorities,
      auths: token.state.authorities,
    };
  },
  methods: {
    getManagers() {
      this.loading = true;
      Axios.get("/managers", {
        headers: { Authorization: `Bearer ${token.state.token}` },
        params: { source: "manager" },
      })
        .then((response) => {
          this.managers = response.data.users;
          this.loading = false;
          $(".odd").html("");
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
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
    deleteManager(id) {
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
            Axios.delete(`/users/${id}`, {
              headers: { Authorization: `Bearer ${token.state.token}` },
            })
              .then((response) => {
                this.getManagers();
                this.$swal.fire("Eliminado!", response.data.success, "success");
              })
              .catch((error) => {
                this.showAlert(error.response.data.error, "error");
              });
          }
        });
    },

    editManager(id) {
      this.$store.dispatch("setManagerEditingId", id);
      this.$store.dispatch("setManagerActionPerform", false);
      this.$router.replace(`/managers/edit`);
    },
    viewManager(id) {
      this.$store.dispatch("setManagerEditingId", id);
      this.$store.dispatch("setManagerActionPerform", false);
      this.$router.replace(`/managers/view`);
    },
  },
  mounted() {
    this.getManagers();
    $(document).ready(function () {
      var table = $("#managers").DataTable({
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
      table.buttons().container().appendTo("#managers_wrapper .col-md-6:eq(0)");
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