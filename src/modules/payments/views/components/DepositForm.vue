<template>
  <!-- End table Units -->

  <!--Begin Form modal used for create and edit -->

  <div class="modal fade" tabindex="-1" role="dialog" id="createNewDeposit">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <form ref="paymentForm" action="#" @submit.prevent="save">
          <div class="card">
            <div class="card-header pl-2 pt-1 pb-2">
              <h3 class="card-title">
                <i class="fa fas fa-coins mr-2"></i>
                <small>Lançamentos contábeis: </small>
              </h3>
            </div>
            <!-- /.card-header -->
            <div :class="loading ? 'card-body overlay-wrapper' : 'card-body'">
              <div v-if="loading" class="overlay">
                <i class="fas fa-3x fas fa-circle-notch text-grey fa-spin"></i>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="form-group rounded-0">
                    <label class="font-weight-normal" for="test"
                      >Conta a debitar: * <small class="text-danger"></small
                    ></label>
                    <select
                      class="form-control select-acc1 rounded-0"
                      style="width: 100%"
                    >
                      <option value="">Pesquisar conta</option>
                      <option
                        v-for="(item, i) in []"
                        value=""
                        :key="i"
                      ></option>
                    </select>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group rounded-0">
                    <label class="font-weight-normal" for="test"
                      >Contas a creditar: * <small class="text-danger"></small
                    ></label>
                    <select
                      class="form-control select-acc2 rounded-0"
                      style="width: 100%"
                    >
                      <option value="">Pesquisar conta</option>
                      <option
                        v-for="(item, i) in []"
                        value=""
                        :key="i"
                      ></option>
                    </select>
                  </div>
                </div>

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
                              class="bg-white border px-2 py-1 rounded"
                              :value="inputValue"
                              v-on="inputEvents"
                            />
                          </template>
                        </v-date-picker>
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
                      rows="2"
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
      loading: false,
      formData: {
        description: "",
        effective_payment: 1,
        customer_id: "",
        d_account_id: "",
        c_account_id: "",
        created_at: moment(new Date()).format("YYYY-MM-DD"),
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
    showAlert(msg, type) {
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        type: type,
        title: msg,
        icon: type,
      });
    },
    validateForm(error) {
      this.errorsValidation = { ...error };
    },
    save() {
      if (!this.formData.d_account_id) {
        return this.showAlert("Selecione a conta debitar!", "error");
      }
      if (!this.formData.c_account_id) {
        return this.showAlert("Selecione a conta creditar!", "error");
      }
      Axios.defaults.headers.common["Authorization"] =
        "Bearer " + token.state.token;
      this.loading = true;
      if (store.state.editingLoanPaymentId == null) {
        Axios.post("/journals", this.formData)
          .then((response) => {
            if (response.data.success) {
              this.loading = false;
              this.showAlert(response.data.success, "success");
              this.$refs.paymentForm.reset();
              this.$emit("reloadDeposits");
            }
          })
          .catch((error) => {
            this.loading = false;
            if (error.response.status === 500) {
              return this.showAlert("Erro inesperado.", "error");
            } else if (error.response.data) {
              this.showAlert(error.response.data.error, "error");
              return this.validateForm(error.response.data);
            }
          });
      } else {
        Axios.put(
          `/journals/${store.state.editingLoanPaymentId}`,
          this.formData
        )
          .then((response) => {
            if (response.data.success) {
              this.loading = false;
              this.showAlert(response.data.success, "success");
              this.$refs.paymentForm.reset();
              this.$emit("reloadDeposits");
              $("#createNewDeposit").modal("toggle");
            }
          })
          .catch((error) => {
            this.loading = false;
            if (error.response.status === 500) {
              return this.showAlert("Erro inesperado.", "error");
            } else if (error.response.data) {
              this.showAlert(error.response.data.error, "error");
              return this.validateForm(error.response.data);
            }
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
    //if (!store.state.isDepositFormMounted) {
    $(".select-acc1").select2({
      dropdownParent: $("#createNewDeposit .modal-content"),
      minimumResultsForSearch: 2,
      minimumInputLength: 1,
      theme: "bootstrap4",
      placeholder: "Conta a debitar",
      ajax: {
        url: `${baseApiUrl}/accounts/search`,
        headers: { Authorization: `Bearer ${token.state.token}` },
        dataType: "json",
        delay: 220,
        processResults: function (data) {
          return {
            results: $.map(data, function (data) {
              return {
                text: `${self.cleanUUID(data.uuid)} - ${data.name}`,
                id: data.id,
              };
            }),
          };
        },
        cache: true,
      },
    });
    $(".select-acc2").select2({
      dropdownParent: $("#createNewDeposit .modal-content"),
      minimumResultsForSearch: 2,
      minimumInputLength: 1,
      theme: "bootstrap4",
      placeholder: "Conta a creditar",
      ajax: {
        url: `${baseApiUrl}/accounts/search`,
        headers: { Authorization: `Bearer ${token.state.token}` },
        dataType: "json",
        delay: 220,
        processResults: function (data) {
          return {
            results: $.map(data, function (data) {
              return {
                text: `${self.cleanUUID(data.uuid)} - ${data.name}`,
                id: data.id,
              };
            }),
          };
        },
        cache: true,
      },
    });
    // }

    $(".select-acc1").change(function () {
      self.formData.d_account_id = $(this).find("option:selected").val();
    });
    $(".select-acc2").change(function () {
      self.formData.c_account_id = $(this).find("option:selected").val();
    });
    // this.$store.dispatch("setIsDepositFormMounted", true);
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