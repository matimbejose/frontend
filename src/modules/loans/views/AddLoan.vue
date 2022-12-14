<template>
  <div class="elevation-1 sidebar-light-primary p-3 transparent">
    <div class="clearfix">
      <span class="text-uppercase float-left"> Simulação / Solicitação </span>
      <div class="float-right mb-2">
        <GoBackButton :length="-1" />
      </div>
    </div>
    <hr class="pt-0 pb-1 mt-0 mb-1" />
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-7">
            <!-- /.card -->
            <form ref="loanForm" action="#" @submit.prevent="save">
              <div class="card">
                <div class="card-header pl-3 pt-2 pb-2">
                  <h3 class="card-title text-uppercase">
                    <small>Detalhes do Empréstimo</small>
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
                <div
                  :class="
                    loading
                      ? 'card-body pt-0 overlay-wrapper'
                      : 'card-body pt-0'
                  "
                >
                  <div v-if="loading" class="overlay">
                    <i
                      class="fas fa-3x fas fa-circle-notch text-grey fa-spin"
                    ></i>
                  </div>
                  <div class="row">
                    <div
                      v-show="!loan"
                      class="col-12 mt-1 btn-group btn-height"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        @click="isRequest = !isRequest"
                        :class="
                          isRequest === false
                            ? 'btn btn-info btn-sm text-uppercase'
                            : 'btn btn-sm btn-secondary text-uppercase'
                        "
                      >
                        Simulação
                      </button>
                      <button
                        v-if="auths.includes(auth_types.LOAN_CREATE)"
                        type="button"
                        @click="isRequest = !isRequest"
                        :class="
                          isRequest === true
                            ? 'btn btn-info btn-sm text-uppercase'
                            : 'btn btn-sm btn-secondary text-uppercase'
                        "
                      >
                        Solicitação
                      </button>
                    </div>
                  </div>

                  <div class="row">
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

                    <div class="col-6">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Montante: * <small class="text-danger"></small
                        ></label>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend bg-light">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-dollar-sign"></i
                            ></span>
                          </div>
                          <InputNumber
                            class="form-control form-control-sm rounded-0"
                            :min="0"
                            v-model="formData.amount"
                            mode="currency"
                            currency="MZN"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col-3"
                      v-show="
                        isRequest && auths.includes(auth_types.LOAN_CREATE)
                      "
                    >
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Juros de Mora <small></small
                        ></label>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text rounded-0">(%)</span>
                          </div>
                          <InputNumber
                            mode="decimal"
                            :minFractionDigits="2"
                            class="form-control form-control-sm rounded-0"
                            :step="0.01"
                            v-model="formData.monthly_installment"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-5">
                      <div class="form-group rounded-0">
                        <label class="font-weight-normal" for="test"
                          >Tipo do Crédito: * <small class="text-danger"></small
                        ></label>
                        <select
                          class="
                            form-control
                            select-credit_type
                            select2
                            rounded-0
                          "
                          style="width: 100%"
                        >
                          <option selected>Seleccione</option>
                          <option
                            v-for="credit_type in credit_types"
                            :value="credit_type.id"
                            :key="credit_type.id"
                          >
                            {{ credit_type.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Maturidade (Meses): *
                          <small class="text-danger"></small
                        ></label>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend bg-light">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-calendar"></i
                            ></span>
                          </div>
                          <InputNumber
                            mode="decimal"
                            class="form-control form-control-sm rounded-0"
                            :step="1"
                            v-model="formData.maturity"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="form-group">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            checked
                            class="custom-control-input"
                            id="showFixedAmountCol"
                          />
                          <label
                            class="custom-control-label"
                            for="showFixedAmountCol"
                            >Incluir mensalidade fixa.</label
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="m-1" />
                  <div
                    class="row"
                    v-show="isRequest && auths.includes(auth_types.LOAN_CREATE)"
                  >
                    <div class="col-5">
                      <div class="form-group rounded-0">
                        <label class="font-weight-normal" for="test"
                          >Gestor: * <small class="text-danger"></small
                        ></label>
                        <select
                          class="form-control select-manager rounded-0"
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

                    <div class="col-5">
                      <div class="form-group rounded-0">
                        <label class="font-weight-normal" for="test"
                          >Cliente / Mutuário : *
                          <small class="text-danger"></small
                        ></label>
                        <select
                          class="form-control select-customer-loan rounded-0"
                          style="width: 100%"
                        >
                          <option value="">Pesquisar conta</option>
                          <option
                            v-for="(item, i) in []"
                            value=""
                            :key="i"
                          ></option>
                          <!-- <option selected disabled >Seleccione</option>
                            <option v-for="customer in customers" :value="customer.id" :key="customer.id">{{ customer.name }}</option> -->
                        </select>
                      </div>
                    </div>

                    <div class="col-2">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Garantias <small></small
                        ></label>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <button
                              class="btn btn-success btn-xs btn-block"
                              data-toggle="modal"
                              data-target="#createNewWarranty"
                            >
                              <i class="fa fa-plus-circle"></i> Adicionar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- table begin -->
                </div>
                <!-- /.card-body -->

                <!-- /.card-footer -->
                <div class="card-footer">
                  <div class="d-flex justify-content-end">
                    <button
                      v-if="auths.includes(auth_types.LOAN_CREATE)"
                      v-show="isRequest"
                      :disabled="loading"
                      class="btn btn-success btn-sm btn-flat"
                      @click="requestCredit()"
                    >
                      <i class="fa fa-fw fa-calculator"></i>
                      <span v-if="!loan">SOLICITAR CRÉDITO</span
                      ><span v-else>ACTUALIZAR CRÉDITO</span>
                    </button>
                    <button
                      v-show="!isRequest"
                      :disabled="loading"
                      class="btn btn-info btn-sm btn-flat"
                      @click="simulateCredit()"
                    >
                      <i class="fa fa-fw fa-calculator"></i> SIMULAR CRÉDITO
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <!-- /.card -->
          </div>
          <LoanDetails
            :customer="customer"
            @remove-warranty="removeWarranty($event)"
            :manager="manager"
            :warranties="formData.warranties"
            :loading="loading"
          />

          <!-- /.col -->
        </div>
        <LoanSimulation
          v-show="show_simulation"
          ref="show_simulation"
          :loading="loading"
        />

        <AddWarranty @add-warranty="addWarranty($event)" />

        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import $ from "jquery";
import "select2";
import store from "../store";
import token from "../../users/store";
import Axios from "axios";
import InputNumber from "primevue/inputnumber";
import moment from "moment-timezone";
import LoanDetails from "./components/LoanDetails.vue";
import LoanSimulation from "./components/LoanSimulation.vue";
import AddWarranty from "./components/AddWarranty.vue";
import { authorities, baseApiUrl } from "../../../global";

import GoBackButton from "../../../components/GoBackButton.vue";

Axios.defaults.baseURL = baseApiUrl;

export default {
  name: "AddLoann",
  props: ["id"],
  components: {
    GoBackButton,
    InputNumber,
    LoanDetails,
    LoanSimulation,
    AddWarranty,
  },
  data() {
    return {
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD", // Uses 'iso' if missing
      },
      auth_types: authorities,
      auths: token.state.authorities,
      isRequired: "",
      show_simulation: false,
      fixedAmountColumn: true,
      text_danger: "text-red",
      isRequest: false,
      loading: false,
      headerList: {},
      val: "",
      loan: false,
      customers: [],
      managers: [],
      credit_types: [],
      simulationList: [],
      formData: {
        monthly_installment: 1,
        amount: 1,
        manager_id: "",
        warranties: [],
        maturity: 1,
        customer_id: "",
        credit_type: "",
        created_at: moment(
          JSON.stringify(new Date()).split("T")[0],
          "YYYY-MM-DD"
        ).format("YYYY-MM-DD"),
        business_id: token.state.business_id,
      },
      errorsValidation: {},
      selectedWarranties: [],
      customer: {},
      manager: {},
    };
  },
  watch: {
    fixedAmountColumn(newValue, oldValue) {
      this.$refs.show_simulation.showFixedColumns(newValue);
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
    validateForm(error) {
      let errorsFormed = {};
      for (const [key, value] of Object.entries(error)) {
        errorsFormed[key] = value[0];
        this.showAlert(value[0], "error");
      }
      this.errorsValidation = { ...errorsFormed };
    },
    addWarranty(warranty) {
      this.formData.warranties.push(warranty);
    },
    removeWarranty(i) {
      console.log("true");
      this.formData.warranties.splice(i, 1);
    },
    getCustomers() {
      this.loading = true;
      Axios.get("/customers", {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.customers = response.data.customers;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    getCreditTypes() {
      this.loading = true;
      Axios.get("/credit_types", {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.credit_types = response.data.credit_types;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    requestCredit() {
      if (this.monthly_installment === "") {
        this.isRequired = "has-error";
        return this.showAlert("Preencha os campos obrigatorios", "error");
      }
      this.loading = true;
      if (!this.id) {
        Axios.post(`/loans`, this.formData, {
          headers: { Authorization: `Bearer ${token.state.token}` },
        })
          .then((response) => {
            this.showAlert(response.data.success, "success");
            this.$refs.loanForm.reset();
            this.formData.warranties = [];
            //  location.href = "/loans";
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            if (error.response.status === 500) {
              return this.showAlert("Erro inesperado.", "error");
            } else if (error.response.data) {
              this.showAlert("Verifique os dados informados.", "error");
              return this.validateForm(error.response.data);
            }
          });
      } else {
        Axios.put(`/loans/${this.id}`, this.formData, {
          headers: { Authorization: `Bearer ${token.state.token}` },
        })
          .then((response) => {
            this.showAlert(response.data.success, "success");
            this.loading = false;
          })
          .catch((error) => {
            if (error.response.status === 500) {
              return this.showAlert("Erro inesperado.", "error");
            } else if (error.response.data) {
              this.showAlert("Verifique os dados informados.", "error");
              return this.validateForm(error.response.data);
            }
            this.loading = false;
          });
      }
    },
    async simulateCredit() {
      this.loading = true;
      await Axios.post(`/loans/simulate`, this.formData, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.simulationList = [...response.data.simulation];
          this.headerList = { ...response.data.header_info };
          this.$refs.show_simulation.showSimulation(
            this.simulationList,
            this.headerList,
            this.fixedAmountColumn
          );
          this.loading = false;
          this.show_simulation = true;
        })
        .catch((error) => {
          this.loading = false;
          if (error.response.status === 500) {
            return this.showAlert("Erro inesperado.", "error");
          } else if (error.response.data) {
            this.showAlert("Verifique os dados informados.", "error");
            return this.validateForm(error.response.data);
          }
        });
    },
    fillFormInputs(id) {
      this.loading = true;
      Axios.get(`/managers/${id}`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.loading = false;
          this.formData = { ...response.data.manager };
        })
        .catch((error) => {
          console.log("Processing...");
        });
    },
  },
  mounted() {
    const self = this;
    this.getCustomers();
    this.getCreditTypes();
    this.$forceUpdate();

    if (store.state.addingLoan == true) {
      this.$refs.loanForm.reset();
    }

    if (this.id) {
      this.formData = { ...store.state.loan.loan };
      this.formData.warranties = store.state.warranties;
      this.formData.monthly_installment = parseFloat(
        store.state.loan.loan.monthly_installment
      );
      this.formData.amount = parseFloat(store.state.loan.loan.amount);
      this.formData.maturity = parseFloat(store.state.loan.loan.maturity);

      self.customer = {
        id: store.state.loan.loan.customer_id,
        text: store.state.customer.name,
      };
      self.manager = {
        id: store.state.loan.loan.manager_id,
        text: store.state.manager.name,
      };

      $(".select-customer-loan")
        .val(store.state.loan.loan.customer_id)
        .trigger("change");
      $(".select-manager")
        .val(store.state.loan.loan.manager_id)
        .trigger("change");
      $(".select-credit_type")
        .val(store.state.loan.loan.credit_type)
        .trigger("change");
    }
    //if (!store.state.isMounted) {
    $(".select2").select2({
      minimumResultsForSearch: Infinity,
      theme: "bootstrap4",
    });

    $(".select-customer-loan").select2({
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
    //}

    $(".select-customer-loan").change(function () {
      self.formData.customer_id = $(this).find("option:selected").val();
      self.customer = {
        id: self.formData.customer_id,
        text: $(this).find("option:selected").text(),
      };
    });
    $(".select-credit_type").change(function () {
      self.formData.credit_type = $(this).find("option:selected").val();
    });
    $(".select-manager").change(function () {
      self.formData.manager_id = $(this).find("option:selected").val();
      self.manager = {
        id: self.formData.manager_id,
        text: $(this).find("option:selected").text(),
      };
    });

    document
      .getElementById("showFixedAmountCol")
      .addEventListener(
        "click",
        (ev) => (this.fixedAmountColumn = !this.fixedAmountColumn)
      );

    //this.$store.dispatch("setIsMounted", true);
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style src="../../../../public/assets/plugins/select2/css/select2.min.css"></style>
<style src="../../../../node_modules/@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.min.css"></style>
<style scoped>
.select2-container--default
  .select2-selection--single
  .select2-selection__rendered {
  margin-top: -9px !important;
}
.btn-height {
  height: 30px !important;
}
</style>
