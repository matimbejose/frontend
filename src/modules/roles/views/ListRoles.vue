<template>
  <div class="elevation-1 sidebar-light-primary pl-3 pt-3 transparent">
    <div class="clearfix">
      <span class="text-uppercase float-left">Cargos</span>
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

            <div class="card card-secondary">
              <div class="card-header pl-4 pt-1 pb-2">
                <h3 class="card-title">
                  <i class="fas fa-briefcase"></i
                  ><small> Lista de Cargos</small>
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
                  v-if="auths.includes(auth_types.ROLE_CREATE)"
                  class="d-flex justify-content-end"
                >
                  <router-link
                    :to="{ name: 'addrole' }"
                    class="btn btn-success mr-1 btn-xs"
                    ><i class="fas fa-plus-circle"></i> ADICIONAR</router-link
                  >
                </div>

                <!-- table begin  -->
                <table id="roles" class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Permissões</th>
                      <th
                        v-if="
                          auths.includes(auth_types.ROLE_CREATE) ||
                          auths.includes(auth_types.ROLE_EDIT)
                        "
                      >
                        Acções
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="role in roles" :key="role.id">
                      <td>{{ role.name }}</td>
                      <td>
                        <span
                          class="badge bg-secondary"
                          v-for="role in role.permissions"
                          :key="role.id"
                          >{{ role.name_to_show }}</span
                        >
                      </td>

                      <td>
                        <button
                          v-if="auths.includes(auth_types.ROLE_EDIT)"
                          @click="editRole(`${role.id}`)"
                          class="btn btn-success mr-1 btn-xs"
                        >
                          <i class="fas fa-pen"></i> Editar
                        </button>
                        <button
                          v-if="auths.includes(auth_types.ROLE_DELETE)"
                          @click="deleteRole(role.id)"
                          class="btn btn-danger mr-1 btn-xs"
                        >
                          <i class="fas fa-trash"></i> Apagar
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
import "datatables.net/js/jquery.dataTables";
import "datatables.net-buttons/js/dataTables.buttons.min";
import jsZip from "jszip";
import "pdfmake/build/vfs_fonts";
import "pdfmake/build/pdfmake.min";
import "datatables.net-buttons/js/buttons.print.min";
import "datatables.net-buttons/js/buttons.flash.min";
import "datatables.net-buttons/js/buttons.html5.min";
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
  name: "ListRoles",
  data() {
    return {
      roles: [],
      loading: false,
      auth_types: authorities,
      auths: token.state.authorities,
    };
  },
  methods: {
    getRoles() {
      this.loading = true;
      Axios.get("/roles", {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.roles = response.data.roles;
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
        type: "success",
        title: msg,
        icon: "error",
      });
    },
    deleteRole(id) {
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
            Axios.delete(`/roles/${id}`, {
              headers: { Authorization: `Bearer ${token.state.token}` },
            })
              .then((response) => {
                this.getRoles();
                this.$swal.fire("Eliminado!", response.data.success, "success");
              })
              .catch((error) => {
                this.showAlert(error.response.data.error, "error");
              });
          }
        });
    },

    editRole(id) {
      this.$store.dispatch("setRoleEditingId", id);
      this.$store.dispatch("setRoleActionPerform", false);
      this.$router.replace(`/roles/edit`);
    },
  },
  mounted() {
    this.getRoles();
    $(document).ready(function () {
      $("#roles").DataTable({
        paging: false,
        info: false,
        searching: false,
        dom: "Bfrtip",
        buttons: [
          {
            extend: "csv",
            text: '<i class="fas fa-file-csv"></i> Exportar CSV',
            className: "dt-buttons-style",
          },
          {
            extend: "excel",
            text: '<i class="fas fa-file-excel"></i> Exportar Excel',
            className: "dt-buttons-style",
          },
          {
            extend: "pdf",
            text: '<i class="fas fa-file-pdf"></i> Baixar PDF',
            className: "dt-buttons-style",
          },
          {
            extend: "print",
            text: '<i class="fas fa-print"></i> Imprimir',
            className: "dt-buttons-style ",
          },
        ],
        select: true,
      });
    });
  },
};
</script>

<style scoped>
table.dataTable td {
  padding: 4px;
}
table.dataTable th {
  padding: 4px;
}
.dt-buttons-style {
  font-size: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  background-color: #17a2b8;
  border-color: #17a2b8;
}
</style>