<template>
  <div class="elevation-1 sidebar-light-primary pl-3 pt-3 transparent">
    <div class="clearfix">
      <span class="text-uppercase float-left">Recebimentos</span>
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
                    Reembolsos
                    <span class="right ml-2 badge badge-success"
                      >Total registrados: {{ payments.length }}</span
                    >
                    <a href="#" @click="getPayments()"
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
                    data-target="#createNewPayment"
                    class="btn btn-success mr-1 btn-xs"
                  >
                    <i class="fas fa-plus-circle"></i> NOVO REEMBOOLSO
                  </button>
                </div>

                <!-- table begin  -->
                <table
                  id="payments"
                  class="table table-sm table-font"
                  style="width: 100%"
                >
                  <thead>
                    <tr class="text-uppercase font-weight-normal">
                      <th>REF</th>
                      <th>Membro</th>
                      <th>Data</th>
                      <th>Método</th>
                      <th>Montante pago</th>
                      <th>Acções</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="payment in payments" :key="payment.id">
                      <td>{{ payment.ref_payment }}</td>
                      <td>{{ payment.customer }}</td>
                      <td>{{ formatData(payment.created_at) }}</td>
                      <td>
                        <small
                          class="badge badge-danger p-1"
                          v-if="payment.method === 'mpesa'"
                          >{{ "M-pesa" }}</small
                        >
                        <small
                          class="badge badge-success p-1"
                          v-if="payment.method === 'cheque'"
                          >{{ "Cheque" }}</small
                        >
                        <small
                          class="badge badge-success p-1"
                          v-if="payment.method === 'cash'"
                          >{{ "Cash" }}</small
                        >
                        <small
                          class="badge badge-success p-1"
                          v-if="payment.method === 'bank_transfer'"
                          >{{ "Transferência bancária" }}</small
                        >
                      </td>
                      <td>{{ numberFormat(payment.amount) }}</td>

                      <td>
                        <button
                          @click="showBill(payment.id)"
                          data-toggle="modal"
                          data-target="#createShowBill"
                          class="btn btn-outline-info mr-1 btn-xs"
                        >
                          <i class="fas fa-file"></i>
                          Recibo
                        </button>
                        <!-- <button
                          @click="editCreditType(`${payment.id}`)"
                          data-toggle="modal"
                          data-target="#createNewCreditType"
                          class="btn btn-outline-success mr-1 btn-xs"
                        >
                          <i class="fas fa-pen"></i>
                        </button>
                        <button
                          @click="deleteCreditType(payment.id)"
                          class="btn btn-outline-danger mr-1 btn-xs"
                        >
                          <i class="fas fa-trash"></i>
                        </button> -->
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
      <Form
        :accounts="accounts"
        ref="Payment"
        @reloadPayments="getPayments()"
      />
      <Bill ref="bill" />
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
import Bill from "./components/Bill.vue";
import { baseApiUrl } from "../../../global";
import moment from "moment";

window.JSZip = jsZip;

Axios.defaults.baseURL = baseApiUrl;

export default {
  components: {
    GoBackButton,
    Form,
    Bill,
  },
  name: "CreditType",
  data() {
    return {
      payments: [],
      loading: false,
      accounts: [],
    };
  },
  methods: {
    formatData(date) {
      return moment(date).format("YYYY-MM-DD");
    },
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
    showBill(id) {
      this.$refs.bill.getBillInfo(id);
    },
    getPayments() {
      this.loading = true;
      Axios.get("/customer_deposits", {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.payments = response.data.payments;
          this.accounts = response.data.accounts;
          this.loading = false;
          $(".odd").html("");
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
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
            Axios.delete(`/loans_payments/${id}`, {
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

    editPayment(id) {
      this.$store.dispatch("setPaymentEditingId", id);
      this.$store.dispatch("setPaymentActionPerform", false);
      Axios.get(`/loans_payments/${id}`, {
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
    this.getPayments();
    $(document).ready(function () {
      var table = $("#payments").DataTable({
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
      table.buttons().container().appendTo("#payments_wrapper .col-md-6:eq(0)");
    });
  },
};
</script>

<style scoped>
</style>