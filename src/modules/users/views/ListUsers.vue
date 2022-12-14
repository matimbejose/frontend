<template>
  <div class="elevation-1 sidebar-light-primary pl-3 pt-3 transparent">
    <div class="clearfix">
      <span class="text-uppercase float-left">utilizadores</span>
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
                  <i class="fas fa-users"></i
                  ><small> Lista de Utilizadores</small>
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
                  v-if="auths.includes(auth_types.USER_CREATE)"
                  class="d-flex justify-content-end"
                >
                  <router-link
                    :to="{ name: 'adduser' }"
                    class="btn btn-success mr-1 btn-xs"
                    ><i class="fas fa-plus-circle"></i> ADICIONAR</router-link
                  >
                </div>

                <!-- table begin  -->
                <table id="users" class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Nome de utilizador</th>
                      <th>Cargos</th>
                      <th>Acções</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.id">
                      <td>{{ user.first_name + " " + user.surname }}</td>
                      <td>{{ user.username }}</td>
                      <td>
                        <span v-for="role in user.roles" :key="role.id">{{
                          role.name
                        }}</span>
                      </td>
                      <td>
                        <!--<button class="btn btn-info mr-1 btn-xs"><i class="fas fa-eye"></i> Ver</button> -->
                        <button
                          v-if="auths.includes(auth_types.USER_CREATE)"
                          @click="editUser(`${user.id}`)"
                          class="btn btn-success mr-1 btn-xs"
                        >
                          <i class="fas fa-pen"></i> Editar
                        </button>
                        <button
                          v-if="auths.includes(auth_types.USER_DELETE)"
                          @click="deleteUser(user.id)"
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
import Axios from "axios";
import GoBackButton from "../../../components/GoBackButton.vue";
import { authorities, baseApiUrl } from "../../../global";

window.JSZip = jsZip;

Axios.defaults.baseURL = baseApiUrl;

export default {
  components: {
    GoBackButton,
  },
  name: "ListUsers",
  data() {
    return {
      users: [],
      loading: false,
      auth_types: authorities,
      auths: store.state.authorities,
    };
  },
  methods: {
    getUsers() {
      this.loading = true;
      Axios.get("/users", {
        headers: { Authorization: `Bearer ${store.state.token}` },
      })
        .then((response) => {
          this.users = response.data.users;
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
    deleteUser(id) {
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
              headers: { Authorization: `Bearer ${store.state.token}` },
            })
              .then((response) => {
                this.getUsers();
                this.$swal.fire("Eliminado!", response.data.success, "success");
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },

    editUser(id) {
      this.$store.dispatch("setUserEditingId", id);
      this.$store.dispatch("setUserActionPerform", false);
      this.$router.replace(`/user/edit`);
    },
  },
  mounted() {
    this.getUsers();
    $(document).ready(function () {
      $("#users").DataTable({
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
            className: "dt-buttons-style",
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