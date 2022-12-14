<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header pl-3 pt-2 pb-2">
          <h3 class="card-title text-uppercase">
            <small>Simulação do Empréstimo </small>
          </h3>
          <div class="float-right">
            <a href="#"><i class="fas ml-3 fa-sync-alt"></i></a>
          </div>
          <div class="float-right">
            <span data-card-widget="collapse" title="Collapse">
              <i class="fas fa-minus"></i>
            </span>
          </div>
        </div>
        <!-- /.card-header -->
        <div :class="loading ? 'card-body overlay-wrapper' : 'card-body'">
          <div v-if="loading" class="overlay">
            <i class="fas fa-3x fas fa-circle-notch text-grey fa-spin"></i>
          </div>
          <div style="width: 250px; height: 120px">
            <img
              style="max-width: 100%"
              :src="`${baseApiUrl.replace('/api', '')}/img/${company_logo}`"
            />
          </div>
          <div class="row">
            <div class="col-md-6">
              <p>
                Quantia do empréstimo:
                <strong>{{ numberFormat(headerinf.amount) }}</strong>
              </p>
              <p>
                Taxa de juro: <strong>{{ numberFormat(headerinf.tax) }}</strong>
              </p>
              <!-- <p>Taxa de juro mensal</p> -->
              <p>
                Maturidade (meses):
                <strong>{{ headerinf.maturity }}</strong>
              </p>
            </div>
            <div class="col-md-6">
              <p>
                Data de início do empréstimo:
                <strong>{{ headerinf.created_at }}</strong>
              </p>
              <p>
                Prestação Mensal fixa:
                <strong>{{ numberFormat(headerinf.fixed_monthly) }}</strong>
              </p>
            </div>
          </div>
          <table
            id="loan_simulation"
            class="table table-hover"
            style="width: 100% !important"
          >
            <thead>
              <tr>
                <th class="table-align-left">Prestação</th>
                <th class="table-align-right">Valor Residual</th>
                <th class="table-align-right">Prestação Mensal</th>
                <th class="table-align-right">Juros do capital</th>
                <th class="table-align-right">Renda mensal</th>
                <th class="table-align-right">Renda fixa</th>
                <th>Data Agendada</th>
              </tr>
            </thead>
            <tbody></tbody>
            <tbody>
              <tr>
                <th colspan="2"></th>
                <th class="table-align-right">
                  {{ numberFormat(summarizy.effective_payment) }}
                </th>
                <th class="table-align-right">
                  {{ numberFormat(summarizy.fees) }}
                </th>
                <th class="table-align-right">
                  {{ numberFormat(summarizy.main_capital) }}
                </th>
                <th v-show="fixedAmountColumn" class="table-align-right">
                  {{ numberFormat(summarizy.fixed_monthly) }}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- /.card -->
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "datatables.net-bs4/js/dataTables.bootstrap4.min";
import "datatables.net-buttons-bs4/js/buttons.bootstrap4.min";
import jsZip from "jszip";
import "pdfmake/build/vfs_fonts";
import "pdfmake/build/pdfmake.min";
import "datatables.net-buttons/js/buttons.print.min";
import "datatables.net-buttons/js/buttons.flash.min";
import "datatables.net-buttons/js/buttons.html5.min";
import "datatables.net-responsive-bs4";
import moment from "moment";
import { authorities, baseApiUrl } from "../../../../global";

window.JSZip = jsZip;

export default {
  name: "LoanSimulation",
  data() {
    return {
      baseApiUrl: baseApiUrl,
      table: null,
      fixedAmountColumn: false,
      company_logo: "",
      headerinf: {
        amount: 0,
        tax: 0,
        maturity: 0,
        scheduled_payment: 0,
        created_at: moment(new Date()).format("YYYY-MM-DD"),
      },
      summarizy: { main_capital: 0, fees: 0, effective_payment: 0 },
      allDTColumns: [
        { data: "index" },
        { data: "final_balance" },
        { data: "effective_payment" },
        { data: "fees" },
        { data: "main_capital" },
        { data: "fixed_monthly" },
        { data: "scheduled_date" },
      ],
    };
  },
  props: ["simulationList", "headerf", "loading"],
  methods: {
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
    showFixedColumns(showFixed) {
      this.fixedAmountColumn = showFixed;
      var column = this.table.column(5);
      if (showFixed) {
        column.visible(true);
      } else {
        column.visible(false);
      }
    },
    showSimulation(sList, hInfo, showFixedCol) {
      this.company_logo = hInfo.company_logo;
      this.fixedAmountColumn = showFixedCol;
      this.headerinf = hInfo;
      this.summarizy.effective_payment = sList.reduce(
        (a, b) => a + parseFloat(b.effective_payment),
        0
      );
      this.summarizy.fees = sList.reduce((a, b) => a + parseFloat(b.fees), 0);
      this.summarizy.fixed_monthly = sList.reduce(
        (a, b) => a + parseFloat(b.main_capital),
        0
      );
      this.summarizy.main_capital = sList.reduce(
        (a, b) => a + parseFloat(b.main_capital),
        0
      );
      const newList = sList.map((simulation) => {
        (simulation.final_balance = this.numberFormat(
          simulation.final_balance
        )),
          (simulation.main_capital = this.numberFormat(
            simulation.main_capital
          )),
          (simulation.fixed_monthly = this.numberFormat(
            simulation.fixed_monthly
          )),
          (simulation.fees = this.numberFormat(simulation.fees)),
          (simulation.effective_payment = this.numberFormat(
            simulation.effective_payment
          ));
        return simulation;
      });

      this.table.clear().rows.add(newList).draw();
    },
  },
  mounted() {
    const self = this;

    $(document).ready(function () {
      self.table = $("#loan_simulation").DataTable({
        //dom: 'Bfrtip',
        paging: false,
        info: false,
        ordering: false,
        searching: false,
        //columnDefs: self.simulationList,
        columns: self.allDTColumns,
        buttons: [
          {
            customize: function (win) {
              $(win.document.body).prepend(`
                <div style="width: 250px; height: 120px">
            <img
              style="max-width: 100%"
              src="${self.baseApiUrl.replace("/api", "")}/img/${
                self.company_logo
              }"
            />
          </div>
                <div class="row mt-5 mb-5">
                <div class="col-md-6">
                  <p>
                    Quantia do empréstimo:
                    <strong>${self.numberFormat(self.headerinf.amount)}</strong>
                  </p>
                  <p>
                    Taxa de juro: <strong>${self.numberFormat(
                      self.headerinf.tax
                    )}</strong>
                  </p>
                  <!-- <p>Taxa de juro mensal</p> -->
                  <p>
                    Maturidade (meses):
                    <strong>${self.headerinf.maturity}</strong>
                  </p>
                </div>
                <div class="col-md-6">
                  <p>
                    Data de início do empréstimo:
                    <strong>${self.headerinf.created_at}</strong>
                  </p>
                  <p>
                    Prestação Mensal:
                    <strong>${self.numberFormat(
                      self.headerinf.scheduled_payment
                    )}</strong>
                  </p>
                </div>
              </div>`);
              $(win.document.body).append("<hr>");
            },
            title: "<h4>Simulação do Empréstimo<h4>",
            extend: "print",
            text: '<i class="fas fa-print"></i> Imprimir',
            className: "btn-xs mb-2 btn-primary",
          },
        ],
        //lengthMenu: false,
      });
      self.table
        .buttons()
        .container()
        .appendTo("#loan_simulation_wrapper .col-md-6:eq(0)");
    });
  },
};
</script>

