<template>
  <!-- table begin  -->
  <table id="loans_view_table" class="table table-sm table-hover">
    <thead>
      <tr>
        <th>REF</th>
        <th>Cliente</th>
        <th>Data</th>
        <th>Montante</th>
        <th>Status</th>
        <th>Acção</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="loan in loans" :key="loan.id">
        <td>{{ loan.code }}</td>
        <td>{{ loan.customer }}</td>
        <td>{{ formatDate(loan.created_at) }}</td>
        <td>{{ loan.amount }}</td>
        <td>
          <small
            class="badge badge-warning"
            v-if="loan.status === 'requested'"
            >{{ "SOLICITADO" }}</small
          >
          <small
            class="badge badge-success"
            v-if="loan.status === 'approved'"
            >{{ "APROVADO" }}</small
          >
          <small
            class="badge badge-danger"
            v-if="loan.status === 'disapproved'"
            >{{ "DESAPROVADO" }}</small
          >
          <small
            class="badge badge-success"
            v-if="loan.status === 'disbursed'"
            >{{ "DESEMBOLSADO" }}</small
          >
          <small
            class="badge badge-warning"
            v-if="loan.status === 'refunded'"
            >{{ "REEMBOOLSADO" }}</small
          >
          <small
            class="badge badge-warning"
            v-if="loan.status === 'restructured'"
            >{{ "RESTRUTURADO" }}</small
          >
          <small class="badge badge-danger" v-if="loan.status === 'canceled'">{{
            "ABATIDO"
          }}</small>
          <small class="badge badge-danger" v-if="loan.status === 'finished'">{{
            "FINALIZADO"
          }}</small>
        </td>
        <td v-if="auths.includes(auth_types.LOAN_VIEW)">
          <router-link
            :to="`/loans/show/${loan.id}`"
            class="btn btn-info btn-xs"
          >
            <i class="fas fa-eye"></i> Ver / Gerenciar
          </router-link>
          <!-- <a v-show="loan.status == 'requested'" :href="`/loans/${loan.id}/edit`" class="btn btn-success btn-xs" ><i class="glyphicon glyphicon-eye-open"></i> Editar</a> -->
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import $ from "jquery";
import "../../../../assets/css/style.css";
import "datatables.net-bs4/js/dataTables.bootstrap4.min";
import "datatables.net-buttons-bs4/js/buttons.bootstrap4.min";
import jsZip from "jszip";
import "pdfmake/build/vfs_fonts";
import "pdfmake/build/pdfmake.min";
import "datatables.net-buttons/js/buttons.print.min";
import "datatables.net-buttons/js/buttons.flash.min";
import "datatables.net-buttons/js/buttons.html5.min";
import "datatables.net-responsive-bs4";
import token from "../../../users/store";
import Axios from "axios";
import moment from "moment-timezone";
import { authorities, baseApiUrl } from "../../../../global";

window.JSZip = jsZip;

Axios.defaults.baseURL = baseApiUrl;

export default {
  name: "Loans",
  data() {
    return {
      managers: [],
      loading: false,
      loans: [],
      created_at: JSON.stringify(new Date()).split("T")[0].replace('"', ""),
      options: {
        format: "YYYY-MM-DD",
        useCurrent: false,
      },
      overlay: false,
      checkedLoans: [],
      checkAll: false,
      thereIsChecked: true,
      auth_types: authorities,
      auths: token.state.authorities,
    };
  },
  watch: {
    checkedLoans: function () {
      this.thereIsChecked = this.checkedLoans.length <= 0 ? true : false;
    },
  },
  methods: {
    showAlert(msg, type) {
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        title: msg,
        icon: type,
      });
    },
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    check() {
      this.checkedLoans = [];
      if (!this.checkAll) {
        for (let i in this.loans) {
          this.checkedLoans.push(this.loans[i].id);
        }
      }
    },
    getLoans(id) {
      Axios.get(`/managers/loans/${id}`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.loans = response.data.loans;
        })
        .catch((error) => {
          this.showAlert("Erro de processamento", "error");
        });
    },
    viewLoan(id, loan) {
      this.$store.dispatch("setLoanShowingId", id);
      this.$store.dispatch("setLoanActionPerform", false);
      this.$router.replace(`/loans/view`);
      this.$store.dispatch("setLoanInfo", { ...loan });
    },
  },
  mounted() {
    $(document).ready(function () {
      var table = $("#loans_view_table").DataTable({
        //dom: 'Bfrtip',
        paging: true,
        info: true,
        ordering: true,
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