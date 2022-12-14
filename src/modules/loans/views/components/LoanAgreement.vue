<template>
  <div class="elevation-1 sidebar-light-primary p-3">
    <div class="clearfix">
      <span class="text-uppercase float-left">Contracto</span>
      <a href="#" @click="getLoan()"><i class="fas ml-3 fa-sync-alt"></i></a>
      <div class="float-right mb-2">
        <GoBackButton :length="-1" />
      </div>

      <button
        class="float-right mr-2 btn btn-xs btn-primary"
        type="button"
        @click="print()"
      >
        <i class="fas fa-print"></i>
        Imprimir
      </button>
    </div>
    <hr class="pt-0 pb-1 mt-0 mb-1" />
    <!-- Main content -->
    <div v-if="loading" class="d-flex justify-content">
      <ProgressSpinner />
    </div>
    <section v-else class="content" id="printJS-form">
      <div v-html="fillTheDoc()" class="container-fluid"></div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import ProgressSpinner from "primevue/progressspinner";
import token from "../../../users/store";
import Axios from "axios";
import GoBackButton from "../../../../components/GoBackButton.vue";
import moment from "moment-timezone";
import extenso from "extenso";
import print from "print-js";
import { baseApiUrl } from "../../../../global";

Axios.defaults.baseURL = baseApiUrl;

export default {
  name: "LoanAgreement",
  props: ["id"],
  data() {
    return {
      loading: false,
      content: "",
      loan: { amount: 0, maturity: 0, monthly_installment: 1, tax: 0 },
      customer: {
        birthdate: moment(new Date()).format("YYYY-MM-DD"),
        city: "",
        doc_nr: "",
        nuit: "",
        address: "",
      },
      manager: {},
      warrantiesList: [{ description: "" }],
      totalWarrantiesWorth: 0,
      loan_transactions: [],
      document_id: 1,
      document: { content: "" },
      print_styles: "",
    };
  },
  components: { GoBackButton, ProgressSpinner },
  methods: {
    print() {
      print({ printable: "printJS-form", type: "html" });
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
    fillTheDoc() {
      let warranties = "";
      let amount = parseFloat(this.loan.amount);
      let charges = (amount * 5) / 100;
      this.warrantiesList.map((w) => (warranties += w.description));
      let ready = this.document.content
        .replace(
          "{{nome}}",
          `<b class="text-uppercase text-danger">${this.customer.name}</b>`
        )
        .replace(
          "{{cidade}}",
          `<b class="text-uppercase text-danger">${this.customer.city}</b>`
        )
        .replace(
          "{{id}}",
          `<b class="text-uppercase text-danger">${this.customer.doc_nr}</b>`
        )
        .replace(
          "{{nuit}}",
          `<b class="text-uppercase text-danger">${this.customer.nuit}</b>`
        )
        .replace(
          "{{maturidade}}",
          `<b class="text-uppercase text-danger">${this.loan.maturity}</b>`
        )
        .replace(
          "{{garantias}}",
          `<b class="text-uppercase text-danger">${warranties}</b>`
        )
        .replace(
          "{{endereco}}",
          `<b class="text-uppercase text-danger">${this.customer.address}</b>`
        )
        .replace(
          "{{logo}}",
          `<div style="width: 250px;height: 120px"><img style="max-width: 100%;" src="${baseApiUrl.replace(
            "/api",
            ""
          )}/img/${this.company_logo}" /></div>`
        )
        .replace(
          "{{mora}}",
          `<b class="text-uppercase text-danger">${this.loan.monthly_installment}</b>`
        )
        .replace(
          "{{taxa}}",
          `<b class="text-uppercase text-danger">${this.loan.tax}</b>`
        )
        .replace(
          "{{total}}",
          `<b class="text-uppercase text-danger">${this.numberFormat(
            amount
          )}MT, ( ${extenso(amount)} METICAIS )</b>`
        )
        .replace(
          "{{encargos}}",
          `<b class="text-uppercase text-danger">${this.numberFormat(
            charges
          )}MT ( ${extenso(charges)} METICAIS)</b>`
        )
        .replace(
          "{{idade}}",
          `<b class="text-uppercase text-danger">${moment().diff(
            this.customer.birthdate,
            "years",
            false
          )}</b>`
        );

      return ready;
    },
    setContractData(content) {
      this.getLoan();
      this.getDocument();
    },
    getLoan() {
      this.loading = true;
      Axios.get(`/loans/${this.id}`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.loan = response.data.loan;
          this.company_logo = response.data.company_logo;
          this.customer = response.data.customer;
          this.manager = response.data.manager;
          this.warrantiesList = response.data.warranties;
          this.totalWarrantiesWorth = response.data.warranties_total_value;
          //this.accounts = response.data.accounts;
          this.loan_transactions = response.data.schedule;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    getDocument() {
      this.loading = true;
      Axios.get(`/settings/documents/${this.document_id}`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.document = response.data;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getLoan();
    this.getDocument();
    // if (store.state.showingLoanId == null) {
    //   this.$router.replace(`/loans`);
    // }
  },
};
</script>

<style>
</style>