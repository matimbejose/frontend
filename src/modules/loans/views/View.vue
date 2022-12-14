<template>
  <div class="elevation-1 sidebar-light-primary p-3">
    <div class="clearfix">
      <span class="text-uppercase float-left">Empréstimo</span>
      <a href="#" @click="getLoan()"><i class="fas ml-3 fa-sync-alt"></i></a>
      <div class="float-right mb-2">
        <GoBackButton :length="-1" />
      </div>
    </div>
    <hr class="pt-0 pb-1 mt-0 mb-1" />
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">
            <!-- Profile Image -->
            <CustomerCard :customer="customer" />
            <!-- /.card -->

            <!-- /.card -->
          </div>
          <!-- /.col -->
          <div class="col-md-9">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      href="#activity"
                      data-toggle="tab"
                      >Dados do Empréstimo</a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#loans" data-toggle="tab"
                      >Garantias</a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#payments" data-toggle="tab"
                      >Pagamentos/Prestações</a
                    >
                  </li>
                </ul>
              </div>
              <!-- /.card-header -->
              <div
                :class="loading ? 'card-body overlay-wrapper' : 'card-body'"
                class="card-body"
              >
                <div v-if="loading" class="overlay">
                  <i
                    class="fas fa-3x fas fa-circle-notch text-grey fa-spin"
                  ></i>
                </div>
                <div class="tab-content">
                  <div class="active tab-pane" id="activity">
                    <LoanCard
                      :loan="loan"
                      :total_warranties="totalWarrantiesWorth"
                    />
                  </div>
                  <!-- /.tab-pane -->
                  <div class="tab-pane" id="loans">
                    <!-- The timeline -->
                    <Warranties :warranties="warrantiesList" />
                  </div>
                  <div class="tab-pane" id="payments">
                    <!-- The timeline -->
                    <Payments :payments="loan_transactions" />
                  </div>
                  <!-- /.tab-pane -->

                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div>
              <!-- /.card-body -->
              <div
                v-if="loan.status == 'approved' && isDisbursing"
                class="card-footer"
              >
                <DisbursingForm
                  @reloadLoans="refreshLoan($event)"
                  :loan_data="loan"
                  :accounts="accounts"
                />
              </div>
              <div v-show="isRestruturing" class="card-footer">
                <RestructingForm :loan_id="loan.id" />
              </div>
              <div class="card-footer">
                <div class="float-right">
                  <!-- <button
                    @click="modify(loan.id)"
                    v-show="loan.status == 'requested'"
                    class="btn btn-xs btn-primary mr-1"
                  >
                    MODIFICAR <i class="fas fa-pen"></i>
                  </button> -->
                  <button
                    v-show="
                      loan.status == 'requested' &&
                      auths.includes(auth_types.LOAN_APPROVE)
                    "
                    @click="approveOrDisapprove('approved')"
                    class="btn btn-xs btn-success mr-1"
                  >
                    {{ "APROVAR" }} <i class="fas fa-check"></i>
                  </button>
                  <button
                    v-show="
                      loan.status == 'requested' &&
                      auths.includes(auth_types.LOAN_APPROVE)
                    "
                    @click="approveOrDisapprove('disapproved')"
                    class="btn btn-xs btn-danger mr-1"
                  >
                    {{ "DESAPROVAR" }} <i class="fas fa-times"></i>
                  </button>
                  <button
                    v-show="
                      loan.status == 'approved' &&
                      !isDisbursing &&
                      auths.includes(auth_types.LOAN_DISBURSE)
                    "
                    @click="isDisbursing = true"
                    class="btn btn-xs btn-success mr-1"
                  >
                    {{ "DESEMBOLSAR" }} <i class="fas fa-check"></i>
                  </button>
                  <!-- <button
                    v-show="
                      loan.status == 'disbursed' &&
                      !isRestruturing &&
                      auths.includes(auth_types.LOAN_RESTRUCT)
                    "
                    @click="isRestruturing = true"
                    class="btn btn-xs btn-warning mr-1"
                  >
                    {{ "RESTRUTURAR" }} <i class="fas fa-check"></i>
                  </button>
                  <button
                    v-show="
                      loan.status == 'disbursed' &&
                      !isRestruturing &&
                      auths.includes(auth_types.LOAN_CLOSE)
                    "
                    @click="forget_loan()"
                    class="btn btn-xs btn-danger"
                  >
                    {{ "ABATER" }} <i class="fas fa-times"></i>
                  </button> -->

                  <button
                    v-show="isDisbursing || isRestruturing"
                    @click="cancelOperation()"
                    class="btn btn-xs btn-danger mr-1"
                  >
                    {{ "CANCELAR" }} <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            <!-- /.nav-tabs-custom -->
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
import "datatables.net";
import "datatables.net-dt";
import "datatables.net-bs4";
import "datatables.net-buttons";
import "datatables.net-buttons-bs4";
import token from "../../users/store";
import Axios from "axios";
import GoBackButton from "../../../components/GoBackButton.vue";
import moment from "moment-timezone";
import Warranties from "./components/Warranties.vue";
import CustomerCard from "./components/CustomerCard.vue";
import LoanCard from "./components/LoanCard.vue";
import DisbursingForm from "./components/DisbursingForm.vue";
import RestructingForm from "./components/RestructingForm.vue";
import Payments from "./components/Payments.vue";
import { authorities } from "../../../global";

export default {
  name: "View",
  props: ["id"],
  data() {
    return {
      loading: false,
      loan: {},
      customer: {},
      manager: {},
      warrantiesList: {},
      totalWarrantiesWorth: 0,
      isDisbursing: false,
      account_id: "",
      disbursed_amount: 0,
      isRestruturing: false,
      maturity: 0,
      accounts: [],
      loan_transactions: [],
      auth_types: authorities,
      auths: token.state.authorities,
    };
  },
  components: {
    GoBackButton,
    Warranties,
    Payments,
    CustomerCard,
    LoanCard,
    DisbursingForm,
    RestructingForm,
  },
  methods: {
    readableDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    getAge() {
      return moment().diff(this.customer.birthdate, "years", false);
    },
    refreshLoan(loan) {
      this.loan = { ...loan };
      this.isDisbursing = false;
      this.isRestruturing = false;
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
    cancelOperation() {
      this.isDisbursing = false;
      this.isRestruturing = false;
    },
    getLoan() {
      this.loading = true;
      Axios.get(`/loans/${this.id}`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.loan = response.data.loan;
          this.customer = response.data.customer;
          this.manager = response.data.manager;
          this.warrantiesList = response.data.warranties;
          this.totalWarrantiesWorth = response.data.warranties_total_value;
          this.accounts = response.data.accounts;
          this.loan_transactions = response.data.schedule;
          this.loading = false;
          $(".odd").html("");
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    // modify(id) {
    //   this.$store.dispatch("setLoanShowingId", id);
    //   this.$store.dispatch("setLoanActionPerform", false);
    //   this.$store.dispatch("setLoanInfo", {
    //     loan: this.loan,
    //     warranties: this.warrantiesList,
    //     customer: this.customer,
    //     manager: this.manager,
    //   });
    //   this.$router.replace(`/loans/edit`);
    // },
    approveOrDisapprove(status) {
      this.overlay = true;
      Axios.post(
        `/loans/approve_or_disapprove`,
        { id: this.id, status: status },
        { headers: { Authorization: `Bearer ${token.state.token}` } }
      )
        .then((response) => {
          this.loan = response.data.loan;
          this.showAlert(response.data.success, "success");
          this.overlay = false;
        })
        .catch((error) => {
          this.showAlert("Erro do sistema. informe o suport", "error");
        });
    },
    forget_loan() {
      this.overlay = true;
      Axios.post(
        `/loans/forget_loan`,
        { id: this.id },
        { headers: { Authorization: `Bearer ${token.state.token}` } }
      )
        .then((response) => {
          this.loan = response.data.loan;
          this.showAlert(response.data.success, "success");
          this.overlay = false;
        })
        .catch((error) => {
          this.showAlert("Erro do sistema. informe o suport", "error");
        });
    },
  },
  mounted() {
    this.getLoan();
  },
};
</script>

<style>
</style>