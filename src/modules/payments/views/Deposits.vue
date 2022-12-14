<template>
  <div class="elevation-1 sidebar-light-primary pl-3 pt-3 transparent">
    <div class="clearfix">
      <span class="text-uppercase float-left">Depósitos</span>
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
                    Lançamentos contábeis:
                    <span class="right ml-2 badge badge-success"
                      >Total registrados: {{ payments.length }}</span
                    >
                    <a href="#" @click="reloadDeposits()"
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
                    data-target="#createNewDeposit"
                    class="btn btn-success mr-1 btn-xs text-uppercase"
                  >
                    <i class="fas fa-plus-circle"></i> novo Lançamento
                  </button>
                </div>

                <!-- table begin  -->
                <table id="deposits" class="table table-sm table-font">
                  <thead>
                    <tr class="text-uppercase font-weight-normal">
                      <th>Código</th>
                      <!-- <th>Conta</th> -->
                      <th>Data</th>
                      <th>Montante</th>
                      <th>Acções</th>
                    </tr>
                  </thead>
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
      <Form
        :accounts="accounts"
        ref="Payment"
        @reloadDeposits="reloadDeposits()"
      />
      <ShowDeposit ref="showPayment" />
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
import token from "../../users/store";
import Axios from "axios";
import GoBackButton from "../../../components/GoBackButton.vue";
import Form from "./components/DepositForm.vue";
import ShowDeposit from "./components/ShowDeposit.vue";
import { baseApiUrl } from "../../../global";
import moment from "moment";

window.JSZip = jsZip;

Axios.defaults.baseURL = baseApiUrl;

export default {
  components: {
    GoBackButton,
    Form,
    ShowDeposit,
  },
  name: "Deposits",
  data() {
    return {
      payments: [],
      loading: false,
      accounts: [],
      current_page: 1,
      current_filtered: [],
      table: null,
    };
  },
  methods: {
    formatData(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    reloadDeposits() {
      this.table.ajax.reload();
    },
    showDeposits() {
      let self = this;
      $(document).ready(function () {
        self.table = $("#deposits").DataTable({
          processing: true,
          serverSide: true,
          paging: true,
          info: true,
          ordering: true,
          searching: true,
          ajax: {
            headers: { Authorization: `Bearer ${token.state.token}` },
            url: `${baseApiUrl}/journals`,
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
        self.table
          .buttons()
          .container()
          .appendTo("#deposits_wrapper .col-md-6:eq(0)");

        $("#deposits").on("page.dt", function (e) {
          const info = self.table.page.info();
          self.current_page = info.page;
        });

        $("#deposits tbody").on("click", "button", function (e) {
          let id_and_type = e.target.id.split("-");
          if (id_and_type[0] === "delete") {
            self.deletePayment(id_and_type[1]);
          } else if (id_and_type[0] === "edit") {
            self.editPayment(id_and_type[1]);
          } else if (id_and_type[0] === "view") {
            console.log(true);
            self.showDeposit(id_and_type[1]);
          }
        });
      });
    },
    showAlert(msg, type) {
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        title: msg,
        icon: "error",
      });
    },
    deletePayment(id) {
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
            Axios.delete(`/journals/${id}`, {
              headers: { Authorization: `Bearer ${token.state.token}` },
            })
              .then((response) => {
                this.getPayments();
                this.$swal.fire("Eliminado!", response.data.success, "success");
              })
              .catch((error) => {
                this.showAlert(error.response.data.error, "error");
              });
          }
        });
    },
    showDeposit(id) {
      Axios.get(`/journals/${id}`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.loading = false;
          this.$refs.showPayment.setFormData(response.data);
        })
        .catch((error) => {
          console.log("Processing...");
        });
    },
    editPayment(id) {
      this.$store.dispatch("setPaymentEditingId", id);
      this.$store.dispatch("setPaymentActionPerform", false);
      Axios.get(`/journals/${id}`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.loading = false;
          this.$refs.Payment.setFormData(response.data);
        })
        .catch((error) => {
          console.log("Processing...");
        });
    },
  },
  mounted() {
    this.showDeposits();
  },
};
</script>

<style scoped>
</style>