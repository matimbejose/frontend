<template>
  <div class="elevation-1 sidebar-light-primary pl-3 pt-3 transparent">
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card bg-gradient-info">
              <!-- /.card-header -->
              <div class="card-body">
                <div class="row pl-1 pr-1">
                  <div class="col-3">
                    <div class="form-group rounded-0">
                      <label class="font-weight-normal" for="test"
                        >Tipo de relatório: * <small class="text-danger"></small
                      ></label>
                      <select
                        class="form-control select-type rounded-0"
                        style="width: 100%"
                      >
                        <option selected disabled>Seleccione</option>
                        <option value="wallet">Carteira de crédito</option>
                        <option value="in_delay">Crédito em Mora</option>
                        <option value="active">Pagamentos correntes</option>
                      </select>
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="form-group rounded-0">
                      <label class="font-weight-normal" for="test"
                        >Por Gestor: * <small class="text-danger"></small
                      ></label>
                      <select
                        class="form-control select-manager rounded-0"
                        style="width: 100%"
                      ></select>
                    </div>
                  </div>

                  <div class="col-2">
                    <div class="form-group" style="position: relative">
                      <label class="font-weight-normal" for="test"
                        >De: * <small class="text-danger"></small
                      ></label>

                      <v-date-picker
                        v-model="formData.from"
                        :model-config="modelConfig"
                      >
                        <template v-slot="{ inputValue, inputEvents }">
                          <input
                            class="bg-white border px-2 py-1"
                            :value="inputValue"
                            v-on="inputEvents"
                          />
                        </template>
                      </v-date-picker>
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="form-group">
                      <label class="font-weight-normal" for="test"
                        >Para: * <small class="text-danger"></small
                      ></label>

                      <v-date-picker
                        v-model="formData.to"
                        :model-config="modelConfig"
                      >
                        <template v-slot="{ inputValue, inputEvents }">
                          <input
                            class="bg-white border px-2 py-1"
                            :value="inputValue"
                            v-on="inputEvents"
                          />
                        </template>
                      </v-date-picker>
                    </div>
                  </div>
                  <div class="col-2">
                    <button
                      style="margin-top: 25px"
                      @click="getLoans()"
                      class="btn btn-primary btn-sm btn-flat"
                    >
                      <i class="fa fa-filter"></i> Filtrar
                    </button>
                  </div>
                </div>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->

            <div class="card">
              <div class="card-header pl-3 pt-2 pb-2">
                <h3 class="card-title">
                  <i class="fas fa-hand-holding-usd"></i>
                  <small>
                    Empréstimos (MT)
                    <span class="right ml-2 badge badge-success"
                      >Total: {{ loans.length }}</span
                    >
                    <a href="#" @click="getLoans()"
                      ><i class="fas ml-3 fa-sync-alt"></i
                    ></a>
                  </small>
                </h3>
                <div
                  v-if="auths.includes(auth_types.LOAN_SIMULATE)"
                  class="float-right"
                ></div>
              </div>
              <!-- /.card-header -->
              <div :class="loading ? 'card-body overlay-wrapper' : 'card-body'">
                <div v-if="loading" class="overlay">
                  <i
                    class="fas fa-3x fas fa-circle-notch text-grey fa-spin"
                  ></i>
                </div>

                <!-- table begin  -->
                <table id="loans_table" class="table table-sm table-hover">
                  <thead>
                    <tr>
                      <th class="text-uppercase">REF</th>
                      <th class="text-uppercase">Cliente</th>
                      <th class="text-uppercase">Data</th>
                      <th class="text-uppercase">Desembolsado</th>
                      <th class="text-uppercase">Num. de Pres.</th>
                      <th class="text-uppercase">Por Reembolsar</th>
                      <th class="text-uppercase">Total pago</th>
                      <th class="text-uppercase">Saldo vigente</th>
                      <th class="text-uppercase">Acção</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="loan in loans" :key="loan.id">
                      <td>{{ loan.code }}</td>
                      <td>{{ loan.customer }}</td>
                      <td>{{ formatDate(loan.disbursed_at) }}</td>
                      <td>{{ numberFormat(loan.disbursed_amount) }}</td>
                      <td>
                        {{
                          `${paidInstallments(loan.loan_schedules)}/ ${
                            loan.total_installments
                          } `
                        }}
                      </td>
                      <td>
                        {{
                          numberFormat(
                            parseFloat(loan.total_fees) +
                              parseFloat(loan.disbursed_amount)
                          )
                        }}
                      </td>
                      <td>
                        {{ numberFormat(totalPaid(loan.loan_schedules)) }}
                      </td>
                      <td>
                        {{
                          numberFormat(
                            parseFloat(loan.total_fees) +
                              parseFloat(loan.disbursed_amount) -
                              totalPaid(loan.loan_schedules)
                          )
                        }}
                      </td>
                      <td v-if="auths.includes(auth_types.LOAN_VIEW)">
                        <router-link
                          :to="`/loans/show/${loan.id}`"
                          class="btn btn-info btn-xs"
                        >
                          <i class="fas fa-eye"></i>
                        </router-link>
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
import token from "../../users/store";
import Axios from "axios";
import moment from "moment-timezone";
import { authorities, baseApiUrl } from "../../../global";

window.JSZip = jsZip;

Axios.defaults.baseURL = baseApiUrl;

export default {
  name: "ListReports",
  data() {
    return {
      managers: [],
      loading: false,
      loans: [
        {
          disbursed_amount: 0,
          total_fees: 0,
          loan_schedules: [],
          total_installments: 0,
        },
      ],
      created_at: moment(new Date()),
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD", // Uses 'iso' if missing
      },
      formData: {
        manager: "",
        type: "",
        from: moment(new Date()).subtract(1, "month").format("YYYY-MM-DD"),
        to: moment(new Date()).format("YYYY-MM-DD"),
      },
      overlay: false,
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
      if (date) return moment(date).format("DD-MM-YYYY");
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
    paidInstallments(schs) {
      return schs.filter((s) => s.effective_date !== null).length;
    },
    totalPaid(schs) {
      const p_s = schs.filter((s) => s.effective_date !== null);
      return p_s.reduce((a, b) => a + parseFloat(b.fixed_monthly), 0);
    },
    getLoans() {
      this.loading = true;
      Axios.get(`/loans/reports_filter`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
        params: {
          from: this.formData.from,
          to: this.formData.to,
          manager_id: this.formData.manager,
          type: this.formData.type,
        },
      })
        .then((response) => {
          this.loans = response.data.loans;
          this.loading = false;
        })
        .catch((error) => {
          this.showAlert("Erro de processamento", "error");
        });
    },
  },
  mounted() {
    const self = this;
    this.getLoans();
    $(document).ready(function () {
      var table = $("#loans_table").DataTable({
        //dom: 'Bfrtip',
        paging: true,
        info: true,
        ordering: true,
        searching: false,
        lengthChange: false,
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

    $(".select-manager").select2({
      minimumResultsForSearch: 2,
      minimumInputLength: 1,
      theme: "bootstrap4",
      placeholder: "Nome do gestor",
      ajax: {
        url: `${baseApiUrl}/search_managers`,
        headers: { Authorization: `Bearer ${token.state.token}` },
        dataType: "json",
        delay: 220,
        processResults: function (data) {
          return {
            results: $.map(data, function (data) {
              return {
                text: data.name,
                id: data.id,
              };
            }),
          };
        },
        cache: true,
      },
    });

    $(".select-type").select2({
      minimumResultsForSearch: Infinity,
      theme: "bootstrap4",
    });
    $(".select-type").change(function () {
      self.formData.type = $(this).find("option:selected").val();
      self.getLoans();
    });
    $(".select-manager").change(function () {
      self.formData.manager = $(this).find("option:selected").val();
      self.getLoans();
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