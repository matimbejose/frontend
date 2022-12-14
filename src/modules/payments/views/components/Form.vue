<template>
  <!-- End table Units -->

  <!--Begin Form modal used for create and edit -->

  <div
    class="modal fade"
    tabindex="-1"
    role="dialog"
    id="createNewPayment"
    aria-labelledby="createNewPayment"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <form ref="paymentForm" action="#" @submit.prevent="save">
          <div class="card">
            <div class="card-header pl-2 pt-1 pb-2">
              <h3 class="card-title">
                <i class="fa fas fa-coins mr-2"></i>
                <small>Adicionar Reembolso</small>
              </h3>
            </div>
            <!-- /.card-header -->
            <div :class="loading ? 'card-body overlay-wrapper' : 'card-body'">
              <div v-if="loading" class="overlay">
                <i class="fas fa-3x fas fa-circle-notch text-grey fa-spin"></i>
              </div>
              <div class="row">
                <div class="col-12" v-show="showResumeCard">
                  <div
                    role="button"
                    :class="
                      'info-box d-flex justify-content-center align-items-center mb-1 ' +
                      card_type
                    "
                  >
                    <div class="col-4 text-center">
                      <span class="">Prestação: </span>
                      <p class="font-weight-bold">
                        {{ numberFormat(p_loan_info.fixed_monthly) }} MT
                      </p>
                    </div>
                    <!-- <div class="col-4 text-center">
                      <span class="">Fixa:</span>
                      <p class="">{{ 12 }}</p>
                    </div> -->
                    <div class="col-4 text-center">
                      <span class="">Em Mora:</span>
                      <p class="font-weight-bold">
                        {{ numberFormat(p_loan_info.delay_fees) }} MT
                      </p>
                    </div>
                    <div class="col-4 text-center">
                      <span class="font-weight-bold">Total:</span>
                      <p class="">{{ numberFormat(total_to_pay) }} MT</p>
                    </div>
                    <!-- /.info-box-content -->
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group rounded-0">
                    <label class="font-weight-normal" for="test"
                      >Cliente / Mutuário : * <small class="text-danger"></small
                    ></label>
                    <select
                      class="form-control select-customer-payments rounded-0"
                      style="width: 100%"
                    >
                      <option>Pesquisar mutuario...</option>
                      <option
                        v-for="method in methods"
                        :value="method.value"
                        :key="method.id"
                      >
                        {{ method.label }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-12">
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group rounded-0">
                        <label class="font-weight-normal" for="test"
                          >Método de pagamento: *
                          <small class="text-danger"></small
                        ></label>
                        <select
                          class="form-control select-method rounded-0"
                          style="width: 100%"
                        >
                          <option>Seleccione</option>
                          <option
                            v-for="method in methods"
                            :value="method.value"
                            :key="method.value"
                          >
                            {{ method.label }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group rounded-0">
                        <label class="font-weight-normal" for="test"
                          >REF: * <small class="text-danger"></small
                        ></label>
                        <input
                          v-model="formData.ref_payment"
                          class="form-control form-control-sm rounded-0"
                          placeholder="Referencia de pagamento"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group rounded-0">
                    <label class="font-weight-normal" for="test"
                      >Contas de pagamento: * <small class="text-danger"></small
                    ></label>
                    <select
                      class="form-control select-account rounded-0"
                      style="width: 100%"
                    >
                      <option>Seleccione</option>
                      <option
                        v-for="account in accounts"
                        :value="account.id"
                        :key="account.id"
                      >
                        {{ cleanUUID(account.uuid) + "-" + account.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-12">
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Montante: *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.effective_payment"
                            >{{ errorsValidation.effective_payment[0] }}</small
                          ></label
                        >
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-money-bill-alt"></i
                            ></span>
                          </div>

                          <InputNumber
                            class="form-control form-control-sm rounded-0"
                            :min="0"
                            v-model="formData.effective_payment"
                            mode="currency"
                            currency="MZN"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Data: * <small class="text-danger"></small
                        ></label>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-calendar"></i
                            ></span>
                          </div>
                          <v-date-picker
                            v-model="formData.created_at"
                            :model-config="modelConfig"
                          >
                            <template v-slot="{ inputValue, inputEvents }">
                              <input
                                class="bg-white border py-1 px-1"
                                :value="inputValue"
                                v-on="inputEvents"
                              />
                            </template>
                          </v-date-picker>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label class="font-weight-normal" for="test"
                      >Nota adicional <small>(opcional)</small>:
                      <small
                        class="text-danger"
                        v-if="errorsValidation.description"
                        >{{ errorsValidation.description[0] }}</small
                      ></label
                    >
                    <textarea
                      class="form-control"
                      v-model="formData.description"
                      rows="1"
                      placeholder="Nota adicional..."
                    ></textarea>
                  </div>
                </div>
              </div>

              <hr />

              <!-- table begin -->
            </div>
            <!-- /.card-body -->
            <!-- /.card-footer -->
            <div class="card-footer">
              <div class="d-flex justify-content-end">
                <button
                  :disabled="loading"
                  data-dismiss="modal"
                  class="btn btn-danger mr-1 btn-sm"
                >
                  <i class="fas fa-times-circle"></i> Fechar
                </button>
                <button
                  type="submit"
                  :disabled="loading"
                  class="btn btn-success mr-1 btn-sm"
                >
                  <i class="fas fa-save"></i> Gravar
                </button>
              </div>
            </div>
          </div>
        </form>
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
import InputNumber from "primevue/inputnumber";
import { baseApiUrl } from "../../../../global";
import moment from "moment";

// import InputMask from 'primevue/inputmask';

// import GoBackButton from '../../../../components/GoBackButton.vue'

Axios.defaults.baseURL = baseApiUrl;

export default {
  name: "Form",
  props: ["accounts"],
  components: { InputNumber },
  data() {
    return {
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD", // Uses 'iso' if missing
      },
      methods: [
        { value: "cash", label: "Cash" },
        { value: "mpesa", label: "M-pesa" },
        { value: "cheque", label: "Cheque" },
        { value: "bank_transfer", label: "Transferência" },
      ],
      p_loan_info: { fixed_monthly: 0, delay_fees: 0 },
      loading: false,
      showResumeCard: false,
      total_to_pay: 0,
      card_type: "bg-info",
      formData: {
        description: "",
        effective_payment: 0,
        ref_payment: "",
        payment_method: "",
        customer_id: "",
        account_id: "",
        created_at: moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD"),
        business_id: token.state.business_id,
      },
      errorsValidation: {},
    };
  },
  methods: {
    cleanUUID(uuid) {
      return uuid.split(".").join("");
    },
    setFormData(newData) {
      return (this.formData = { ...newData });
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
    validateForm(error) {
      this.errorsValidation = { ...error };
    },
    getLoanPaymentInfo() {
      Axios.get(`/loans_payments/next/${this.formData.customer_id}`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.loading = false;
          this.p_loan_info = response.data;
          this.card_type =
            this.p_loan_info.delay_fees > 0 ? "bg-danger" : "bg-info";
          this.total_to_pay =
            parseFloat(this.p_loan_info.fixed_monthly) +
            parseFloat(this.p_loan_info.delay_fees);
          this.showResumeCard = true;
        })
        .catch((error) => {
          this.showResumeCard = false;
          if (error.response.status === 500) {
            return this.showAlert("Erro inesperado.", "error");
          } else if (error.response.data) {
            this.showAlert("Verifique os dados informados.", "error");
            return this.validateForm(error.response.data);
          }
        });
    },
    save() {
      if (!this.formData.account_id) {
        return this.showAlert("Selecione uma conta!", "error");
      }
      Axios.defaults.headers.common["Authorization"] =
        "Bearer " + token.state.token;
      this.loading = true;
      if (store.state.editingLoanPaymentId == null) {
        Axios.post("/loans_payments", this.formData)
          .then((response) => {
            if (response.data.success) {
              this.loading = false;
              this.showAlert(response.data.success, "success");
              this.$refs.paymentForm.reset();
              this.$emit("reloadCreditTypes");
            }
          })
          .catch((error) => {
            this.loading = false;
            this.validateForm(error.response.data);
          });
      } else {
        Axios.put(
          `/loans_payments/${store.state.editingLoanPaymentId}`,
          this.formData
        )
          .then((response) => {
            if (response.data.success) {
              this.loading = false;
              this.showAlert(response.data.success, "success");
              this.$refs.paymentForm.reset();
              this.$emit("reloadCreditTypes");
              $("#createNewCreditType").modal("toggle");
            }
          })
          .catch((error) => {
            this.loading = false;
            this.validateForm(error.response.data);
          });
      }
      this.loading = false;
    },
  },
  mounted() {
    if (
      store.state.editingLoanPaymentId != null &&
      store.state.addingLoanPayment == false
    ) {
      this.fillFormInputs(store.state.editingLoanPaymentId);
    }
    if (store.state.addingLoanPayment == true) {
      this.$refs.paymentForm.reset();
    }
    const self = this;

    //if (!store.state.isFormMounted) {
    $(".select-method").select2({
      minimumResultsForSearch: Infinity,
      theme: "bootstrap4",
    });
    $(".select-account").select2({
      minimumResultsForSearch: Infinity,
      theme: "bootstrap4",
    });

    $(".select-customer-payments").select2({
      dropdownParent: $("#createNewPayment .modal-content"),
      minimumResultsForSearch: 2,
      minimumInputLength: 1,
      theme: "bootstrap4",
      placeholder: "Nome do membro",
      ajax: {
        url: `${baseApiUrl}/search_customers`,
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
    //}
    $(".select-account").change(function () {
      self.formData.account_id = $(this).find("option:selected").val();
    });
    $(".select-method").change(function () {
      self.formData.payment_method = $(this).find("option:selected").val();
    });

    $(".select-customer-payments").change(function () {
      self.formData.customer_id = $(this).find("option:selected").val();
      self.getLoanPaymentInfo();
    });
    //this.$store.dispatch("setIsFormMounted", true);
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style src="../../../../../public/assets/plugins/select2/css/select2.min.css"></style>
<style src="../../../../../node_modules/@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.min.css"></style>
<style>
.select2-selection--single .select2-selection__rendered {
  margin-top: -9px !important;
}
.btn-height {
  height: 30px !important;
}
</style>