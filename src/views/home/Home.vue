<template>
  <div class="container-fluid">
    <!-- Info boxes -->
    <div class="row">
      <top-card-item
        icon="fas fa-dollar-sign"
        type="bg-info"
        label="Total"
        :amount="dashboard.total"
      />
      <top-card-item
        icon="fas fa-toggle-on"
        type="bg-success"
        label="Activo"
        :amount="dashboard.disbursed"
      />
      <div class="clearfix hidden-md-up"></div>
      <top-card-item
        icon="fas fa-exclamation-triangle"
        type="bg-danger"
        label="Em mora"
        :amount="0"
      />
      <top-card-item
        icon="fas fa-pause-circle"
        type="bg-warning"
        label="Pendente"
        :amount="dashboard.pending"
      />
    </div>
    <!-- /.row -->
    <div class="row">
      <!-- Main content -->

      <div class="col-md-8">
        <!-- MAP & BOX PANE -->

        <!-- TABLE: LATEST ORDERS -->
        <div class="card">
          <div class="card-header border-transparent">
            <h3 class="card-title"><small>Pagamentos correntes</small></h3>

            <div class="card-tools">
              <button
                type="button"
                class="btn btn-tool"
                data-card-widget="collapse"
              >
                <i class="fas fa-minus"></i>
              </button>
              <button
                type="button"
                class="btn btn-tool"
                data-card-widget="remove"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div class="card-body p-0">
            <combo-chart />
            <!-- <div class="table-responsive">
              <table class="table m-0 table-font">
                <thead>
                  <tr>
                    <th>REF</th>
                    <th>Gestor</th>
                    <th>Membro</th>
                    <th>Telefone</th>
                    <th>Montante</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="loan in loans" :key="loan.id">
                    <td>{{ loan.code }}</td>
                    <td>{{ loan.manager }}</td>
                    <td>{{ loan.customer }}</td>
                    <td>{{ formatDate(loan.created_at) }}</td>
                    <td>{{ loan.amount }}</td>
                  </tr>
                </tbody>
              </table>
            </div> -->
          </div>
          <!-- <div class="card-footer clearfix">
            <a href="javascript:void(0)" class="btn btn-sm btn-info float-left"
              >Novo Empréstimo</a
            >
            <a
              href="javascript:void(0)"
              class="btn btn-sm btn-secondary float-right"
              >Ver todos empréstimos</a
            >
          </div> -->
        </div>
      </div>

      <div class="col-md-4">
        <div class="card col-12">
          <div class="card-header border-transparent">
            <h3 class="card-title"><small>Empréstimos</small></h3>

            <div class="card-tools">
              <button
                type="button"
                class="btn btn-tool"
                data-card-widget="collapse"
              >
                <i class="fas fa-minus"></i>
              </button>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body p-0">
            <pie-chart
              v-if="!loading"
              :total="dashboard.total"
              :paid="dashboard.total_paid"
              :delayed="dashboard.total_delayed"
            />
          </div>
        </div>

        <side-card-item
          icon="fas fa-users"
          type="bg-success"
          label="Membros"
          :amount="dashboard.customers"
        />
        <!-- <side-card-item
          icon="fas fa-pause-circle"
          type="bg-warning"
          label="Empréstimos pendentes"
          amount="1"
        />
        <side-card-item
          icon="fas fa-exclamation-triangle"
          type="bg-danger"
          label="Em mora"
          amount="5"
        />
        <side-card-item
          icon="fas fa-toggle-on"
          type="bg-info"
          label="Activos"
          amount="9"
        /> -->
      </div>
      <!-- /.col -->

      <!-- /.content -->
    </div>
    <div class="clearfix"></div>
    <div class="row">
      <!-- TABLE: LATEST ORDERS -->
      <div class="card col-12">
        <div class="card-header border-transparent">
          <h3 class="card-title text-uppercase">
            <small>prestações do mês</small>
          </h3>

          <div class="card-tools">
            <button
              type="button"
              class="btn btn-tool"
              data-card-widget="collapse"
            >
              <i class="fas fa-minus"></i>
            </button>
          </div>
        </div>
        <!-- /.card-header -->
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table m-0 table-font" style="width: 100%">
              <thead>
                <tr>
                  <th class="text-uppercase">data</th>
                  <th class="text-uppercase">prestação</th>
                  <th class="text-uppercase">Membro</th>
                  <th class="text-uppercase">Montante</th>
                  <th class="text-uppercase">Juros de mora</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="loan in dashboard.installments" :key="loan.id">
                  <td>{{ formatDate(loan.scheduled_date) }}</td>
                  <td>{{ loan.description }}</td>
                  <td>{{ loan.customer }}</td>
                  <td>{{ loan.fixed_monthly }}</td>
                  <td>{{ loan.delay_fees }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.table-responsive -->
        </div>
        <!-- /.card-body -->
        <div class="card-footer clearfix">
          <a href="javascript:void(0)" class="btn btn-sm btn-info float-left"
            >Novo Empréstimo</a
          >
          <a
            href="javascript:void(0)"
            class="btn btn-sm btn-secondary float-right"
            >Ver todos empréstimos</a
          >
        </div>
        <!-- /.card-footer -->
      </div>
      <!-- /.card -->
    </div>

    <!-- /.row -->
  </div>
</template>

<script>
import token from "../../modules/users/store/index";
import moment from "moment-timezone";
import Axios from "axios";
import TopCardItem from "./components/TopCardItem.vue";
import SideCardItem from "./components/SideCardItem.vue";
import PieChart from "./components/PieChart.vue";
import ComboChart from "./components/ComboChart.vue";

export default {
  components: { TopCardItem, SideCardItem, PieChart, ComboChart },
  data() {
    return {
      loans: [],
      loading: true,
      dashboard: {
        total: 0,
        total_delayed: 0,
        total_paid: 0,
        disbursed: 0,
        pending: 0,
        customers: 0,
        installments: [],
      },
    };
  },
  name: "Home",
  methods: {
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    getLoans() {
      Axios.get(`/loans`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.loans = response.data;
        })
        .catch((error) => {
          //this.showAlert('Erro de processamento', 'error')
        });
    },
    getDashboard() {
      Axios.get(`/dashboard`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.dashboard = response.data;
          this.loading = false;
        })
        .catch((error) => {
          //this.showAlert('Erro de processamento', 'error')
        });
    },
  },
  mounted() {
    this.getLoans();
    this.getDashboard();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
