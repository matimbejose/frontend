<template>
  <!-- End table Units -->

  <!--Begin Form modal used for create and edit -->

  <div
    class="modal fade"
    role="dialog"
    id="createShowBill"
    aria-labelledby="createShowBill"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content" id="printBill">
        <div class="invoice mb-3">
          <div class="row">
            <div class="col-12">
              <div style="width: 250px; height: 120px">
                <img
                  style="max-width: 100%"
                  :src="`${baseApiUrl.replace('/api', '')}/img/${
                    business.logo
                  }`"
                />
              </div>
            </div>
          </div>

          <div class="row invoice-info">
            <div class="col-sm-4 invoice-col">
              <address>
                <strong>{{ business.business_name }}</strong
                ><br />
                {{ business.city }}<br />
                {{ business.address }}<br />
                NUIT: {{ business.nuit }}<br />
                Telefone: +258 {{ business.phone }}<br />
                Email: {{ business.email }}
              </address>
            </div>

            <div class="col-sm-4 invoice-col">
              <address>
                <strong>{{ customer.name }}</strong
                ><br />
                {{ customer.city }}<br />
                {{ customer.address }}<br />
                Telefone: +258 {{ customer.phone }}<br />
                Email: {{ customer.email }}
              </address>
            </div>
            <div class="col-sm-4 invoice-col">
              <b>Recibo {{ payment.code }}</b
              ><br />
              <strong>Saldo do Cliente: {{ customer.balance }}</strong>
            </div>
          </div>

          <div class="row">
            <div class="col-12 table-responsive table-sm">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Referência</th>
                    <th>Prestação</th>
                    <th>Data Agendada</th>
                    <th>Data Pgto.</th>
                    <th>Valor</th>
                    <th>Juros</th>
                    <th>Total pago</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(install, i) in installments" :key="i">
                    <td>{{ i }}</td>
                    <td>{{ install.code }}</td>
                    <td>{{ install.description }}</td>
                    <td>{{ install.scheduled_date }}</td>
                    <td>{{ install.effective_date }}</td>
                    <td>{{ install.fixed_monthly }}</td>
                    <td>{{ install.delay_fees }}</td>
                    <td>
                      {{ install.effective_date ? install.fixed_monthly : 0 }}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="5"></td>
                    <th>{{ total_to_pay }}</th>
                    <th>{{ total_fees }}</th>
                    <th>{{ total_paid }}</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <p>
                Recebemos a quantia de: {{ payment.amount }} (<strong
                  class="text-uppercase"
                  >{{ generateExtenso(payment.amount) }}</strong
                >)
                <br />
                Método de pagamento: {{ paymentMethod(payment.method) }}<br />

                <br />
              </p>
            </div>

            <div class="col-6">
              <p>Utilizador:</p>
              <p>Assinatura: _____________________________________________</p>
              <p>Data de impressão: {{ today }}</p>
            </div>
          </div>

          <div class="row no-print">
            <div class="col-12">
              <button
                @click="print()"
                type="button"
                class="btn btn-primary float-right"
                style="margin-right: 5px"
              >
                <i class="fas fa-print"></i> Imprimir/PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- End form modal -->
</template>

<script>
import $ from "jquery";
import "select2";
import store from "../../store";
import token from "../../../users/store";
import Axios from "axios";
import { baseApiUrl } from "../../../../global";
import moment from "moment";
import extenso from "extenso";
import print from "print-js";

Axios.defaults.baseURL = baseApiUrl;

export default {
  name: "Bill",
  data() {
    return {
      today: moment().format("YYYY-MM-DD"),
      baseApiUrl: baseApiUrl,
      loading: true,
      customer: { business_name: "", address: "", city: "", phone: "" },
      business: {
        logo: "",
        business_name: "",
        address: "",
        city: "",
        phone: "",
      },
      total_to_pay: 0,
      total_fees: 0,
      total_paid: 0,
      installments: [],
      payment: { amount: 0, method: "" },
    };
  },
  methods: {
    setFormData(newData) {
      return (this.formData = { ...newData });
    },
    print() {
      print({
        printable: "printBill",
        type: "html",
      });
    },
    generateExtenso(num) {
      return extenso(parseFloat(num));
    },
    paymentMethod(txt) {
      if (txt === "mpesa") {
        return "M-pesa";
      } else if (txt === "cheque") {
        return "Cheque";
      } else if (txt === "bank_transfer") {
        return "Transferência bancária";
      }
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
    getBillInfo(id) {
      Axios.get(`/payments_bill/${id}`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.customer = response.data.customer;
          this.business = response.data.business;
          this.installments = response.data.installments;
          this.payment = response.data.payment;
          this.total_to_pay = response.data.total_to_pay;
          this.total_paid = response.data.total_paid;
          this.total_fees = response.data.total_fees;
          this.loading = false;
        })
        .catch((error) => {
          console.log("Processing...");
        });
    },
  },
  mounted() {},
};
</script>
