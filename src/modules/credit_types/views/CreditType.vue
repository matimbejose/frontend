<template>
  <div class="elevation-1 sidebar-light-primary pl-3 pt-3 transparent">
    <div class="clearfix">
      <span class="text-uppercase float-left">Tipos de créditos</span>
      <div class="float-right mb-2">
        <GoBackButton :length="-1" />
      </div>
    </div>

    <hr class="pt-0 pb-1 mt-0 mb-1" />

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="d-flex justify-content-center">
          <div class="col-10">
            <div class="card">
              <div class="card-header pl-3 pt-2 pb-2">
                <h3 class="card-title">
                  <i class="fas fa-coins"></i>
                  <small>
                    Tipos de créditos
                    <span class="right ml-2 badge badge-success"
                      >Total registrados: {{ credit_types.length }}</span
                    >
                    <a href="#" @click="getCreditTypes()"
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
                  v-if="auths.includes(auth_types.CREDIT_TYPE_CREATE)"
                  class="d-flex justify-content-end"
                >
                  <button
                    data-toggle="modal"
                    data-target="#createNewCreditType"
                    class="btn btn-success mr-1 btn-xs"
                  >
                    <i class="fas fa-plus-circle"></i> ADICIONAR
                  </button>
                </div>

                <!-- table begin  -->
                <table id="credit_types" class="table table-sm table-font">
                  <thead>
                    <tr class="text-uppercase font-weight-normal">
                      <th>Código</th>
                      <th>Nome</th>
                      <th>Taxa</th>
                      <th
                        v-if="
                          auths.includes(auth_types.CREDIT_TYPE_DELETE) ||
                          auths.includes(auth_types.CREDIT_TYPE_EDIT)
                        "
                      >
                        Acções
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="credit_type in credit_types"
                      :key="credit_type.id"
                    >
                      <td>{{ credit_type.code }}</td>
                      <td>{{ credit_type.name }}</td>
                      <td>{{ credit_type.tax }}</td>

                      <td>
                        <button
                          v-if="auths.includes(auth_types.CREDIT_TYPE_EDIT)"
                          @click="editCreditType(credit_type.id)"
                          data-toggle="modal"
                          data-target="#createNewCreditType"
                          class="btn btn-success mr-1 btn-xs"
                        >
                          <i class="fas fa-pen"></i> Editar
                        </button>
                        <button
                          v-if="auths.includes(auth_types.CREDIT_TYPE_DELETE)"
                          @click="deleteCreditType(credit_type.id)"
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
      <Form ref="creditType" @reloadCreditTypes="getCreditTypes()" />
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
import Form from "./components/Form.vue";
import { authorities, baseApiUrl } from "../../../global";

window.JSZip = jsZip;

Axios.defaults.baseURL = baseApiUrl;

export default {
  components: {
    GoBackButton,
    Form,
  },
  name: "CreditType",
  data() {
    return {
      credit_types: [],
      loading: false,
      auth_types: authorities,
      auths: token.state.authorities,
    };
  },
  methods: {
    getCreditTypes() {
      this.loading = true;
      Axios.get("/credit_types", {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.credit_types = response.data.credit_types;
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
    deleteCustomer(id) {
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
            Axios.delete(`/credit_types/${id}`, {
              headers: { Authorization: `Bearer ${token.state.token}` },
            })
              .then((response) => {
                this.getCreditTypes();
                this.$swal.fire("Eliminado!", response.data.success, "success");
              })
              .catch((error) => {
                this.showAlert(error.response.data.error, "error");
              });
          }
        });
    },

    editCreditType(id) {
      this.$store.dispatch("setCreditTypeEditingId", id);
      this.$store.dispatch("setCreditTypeActionPerform", false);
      Axios.get(`/credit_types/${id}`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.loading = false;
          this.$refs.creditType.setFormData(response.data);
        })
        .catch((error) => {
          console.log("Processing...");
        });
    },
  },
  mounted() {
    this.getCreditTypes();
    $(document).ready(function () {
      var table = $("#credit_types").DataTable({
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
      table
        .buttons()
        .container()
        .appendTo("#credit_types_wrapper .col-md-6:eq(0)");
    });
  },
};
</script>

<style scoped>
</style>