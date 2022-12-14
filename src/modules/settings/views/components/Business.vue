<template>
  <form
    ref="generalForm"
    enctype="multipart/form-data"
    action="#"
    @submit="save"
  >
    <div class="row">
      <div class="col-4 col-xs-12">
        <div class="form-group">
          <label class="font-weight-normal" for="test"
            >Taxa dos encargos: *
            <small class="text-danger" v-if="errorsValidation.charges_fee">{{
              errorsValidation.charges_fee[0]
            }}</small></label
          >
          <InputNumber
            mode="decimal"
            :minFractionDigits="2"
            class="form-control form-control-sm rounded-0"
            :step="0.01"
            v-model="formData.charges_fee"
          />
        </div>
      </div>

      <div class="col-4 col-xs-12">
        <div class="form-group rounded-0">
          <label class="font-weight-normal" for="test"
            >Receita mensal: (Fixa / Variavel) *
            <small class="text-danger"></small
          ></label>
          <select
            class="form-control select-btypes rounded-0 select2"
            style="width: 100%"
          >
            <option
              v-for="btype in billing_type"
              :value="btype.value"
              :key="btype.value"
            >
              {{ btype.label }}
            </option>
          </select>
        </div>
      </div>
      <!-- <div class="col-4 col-xs-12">
        <div class="form-group rounded-0">
          <label class="font-weight-normal" for="test"
            >Modo do sistema: * <small class="text-danger"></small
          ></label>
          <select
            class="form-control select-income rounded-0 select2"
            style="width: 100%"
          >
            <option value="fixed" selected>Fixa</option>
            <option value="variable">Variavel</option>
          </select>
        </div>
      </div> -->
    </div>

    <hr />
    <label for="accounts"
      >Contas predefinidas na contabilidade (PGC):
      <span class="text-danger"
        >Se não endende de contabilidade não altere os campos abaixo</span
      >

      <i class="fas fa-2x text-danger fa-exclamation-triangle"></i>
      <i class="fas fa-2x text-danger fa-exclamation-triangle"></i>
      <i class="fas fa-2x text-danger fa-exclamation-triangle"></i>
    </label>
    <div class="row">
      <div class="col-4 col-xs-12">
        <div class="form-group rounded-0">
          <label class="font-weight-normal" for="test"
            >Conta a usar para movimentar encargos: *
            <span class="text-danger">
              <small class="text-danger" v-if="errorsValidation.acc_charges">{{
                errorsValidation.acc_charges[0]
              }}</small></span
            >
          </label>
          <select
            class="form-control select-charges rounded-0 select2"
            style="width: 100%"
          >
            <option
              v-for="account in accounts"
              :value="account.uuid"
              :key="account.id"
            >
              {{ account.uuid + " - " + account.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-4 col-xs-12">
        <div class="form-group rounded-0">
          <label class="font-weight-normal" for="test"
            >Conta de clientes: *
            <span class="text-danger">
              <small class="text-danger" v-if="errorsValidation.acc_clients">{{
                errorsValidation.acc_clients[0]
              }}</small></span
            >
          </label>
          <select
            class="form-control select-clients rounded-0 select2"
            style="width: 100%"
          >
            <option
              v-for="account in accounts"
              :value="account.uuid"
              :key="account.id"
            >
              {{ account.uuid + " - " + account.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-4 col-xs-12">
        <div class="form-group rounded-0">
          <label class="font-weight-normal" for="test"
            >Conta Acréscimos e Deferimento: *
            <span class="text-danger">
              <small class="text-danger" v-if="errorsValidation.increases">{{
                errorsValidation.increases[0]
              }}</small></span
            >
          </label>
          <select
            class="form-control select-increases rounded-0 select2"
            style="width: 100%"
          >
            <option
              v-for="account in accounts"
              :value="account.uuid"
              :key="account.id"
            >
              {{ account.uuid + " - " + account.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-4 col-xs-12">
        <div class="form-group rounded-0">
          <label class="font-weight-normal" for="test"
            >Receitas Financeiras: *
            <span class="text-danger">
              <small
                class="text-danger"
                v-if="errorsValidation.finantial_incomes"
                >{{ errorsValidation.finantial_incomes[0] }}</small
              ></span
            >
          </label>
          <select
            class="form-control select-fincome rounded-0 select2"
            style="width: 100%"
          >
            <option
              v-for="account in accounts"
              :value="account.uuid"
              :key="account.id"
            >
              {{ account.uuid + " - " + account.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-4 col-xs-12">
        <div class="form-group rounded-0">
          <label class="font-weight-normal" for="test"
            >Perda Financeira: *
            <span class="text-danger">
              <small
                class="text-danger"
                v-if="errorsValidation.finantial_loose"
                >{{ errorsValidation.finantial_loose[0] }}</small
              ></span
            >
          </label>
          <select
            class="form-control select-loose rounded-0 select2"
            style="width: 100%"
          >
            <option
              v-for="account in accounts"
              :value="account.uuid"
              :key="account.id"
            >
              {{ account.uuid + " - " + account.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-4 col-xs-12">
        <div class="form-group rounded-0">
          <label class="font-weight-normal" for="test"
            >Adiantamentos de clientes: *
            <span class="text-danger">
              <small class="text-danger" v-if="errorsValidation.acc_advances">{{
                errorsValidation.acc_advances[0]
              }}</small></span
            >
          </label>
          <select
            class="form-control select-advances rounded-0 select2"
            style="width: 100%"
          >
            <option
              v-for="account in accounts"
              :value="account.uuid"
              :key="account.id"
            >
              {{ account.uuid + " - " + account.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="ml-auto">
      <button
        type="submit"
        :disabled="loading"
        class="btn btn-success mr-1 btn-sm"
      >
        <i class="fas fa-save"></i> Actualizar
      </button>
    </div>
  </form>

  <!-- End form modal -->
</template>

<script>
import $ from "jquery";
import "select2";
import store from "../../store";
import token from "../../../users/store";
import Axios from "axios";
import moment from "moment-timezone";
import InputNumber from "primevue/inputnumber";

import { baseApiUrl } from "../../../../global";
Axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
Axios.defaults.baseURL = baseApiUrl;

export default {
  name: "Business",
  components: { InputNumber },
  data() {
    return {
      loading: false,
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD", // Uses 'iso' if missing
      },
      val: "",
      formData: {
        charges_fee: 0,
        billing_type: "fixed",
        acc_clients: "",
        acc_advances: "",
        acc_charges: "",
        acc_increases: "",
        acc_finantial_incomes: "",
        acc_finantial_looses: "",
        business_id: token.state.business_id,
      },
      image: "",
      accounts: [],
      billing_type: [
        { value: "fixed", label: "Fixa" },
        { value: "variable", label: "Variavel" },
      ],
      business: {},
      errorsValidation: {},
    };
  },
  methods: {
    cleanUUID(uuid) {
      if (uuid) {
        return uuid.split(".").join("");
      }
    },
    setFormData(newData) {
      return (this.formData = { ...newData });
    },
    onImageChange(e) {
      this.formData.logo = e.target.files[0];
      //this.formData = {...this.formData, image: this.image}
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
    getBusinesses() {
      this.loading = true;
      Axios.get("/businesses", {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.formData = {
            ...response.data.businesses,
            charges_fee: parseFloat(response.data.businesses.charges_fee),
          };
          setTimeout(() => {
            $(".select-btypes")
              .val(this.formData.billing_type)
              .trigger("change");
            $(".select-fincome")
              .val(this.formData.acc_finantial_incomes)
              .trigger("change");
            $(".select-clients")
              .val(this.formData.acc_clients)
              .trigger("change");
            $(".select-increases")
              .val(this.formData.acc_increases)
              .trigger("change");
            $(".select-loose")
              .val(this.formData.acc_finantial_looses)
              .trigger("change");
            $(".select-advances")
              .val(this.formData.acc_advances)
              .trigger("change");
            $(".select-charges")
              .val(this.formData.acc_charges)
              .trigger("change");
          }, 2000);
          this.loading = false;
        })
        .catch((error) => console.log("error"));
    },
    getAccounts() {
      this.loading = true;
      Axios.get("/accounts/retrieve_entire_pgc", {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.accounts = { ...response.data.accounts };
          this.loading = false;
        })
        .catch((error) => console.log("error"));
    },
    save(e) {
      e.preventDefault();
      Axios.defaults.headers.common["Authorization"] =
        "Bearer " + token.state.token;

      console.log(this.formData);

      this.loading = true;
      Axios.put(`/businesses/${this.formData.id}`, this.formData)
        .then((response) => {
          this.loading = false;
          if (response.data.success) {
            this.showAlert(response.data.success, "success");
          }
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

      this.loading = false;
    },
  },
  mounted() {
    this.getAccounts();
    this.getBusinesses();
    const self = this;

    $(".select2").select2({
      minimumResultsForSearch: Infinity,
      theme: "bootstrap4",
    });

    $(".select-advances").change(function () {
      self.formData.acc_advances = $(this).find("option:selected").val();
    });
    $(".select-charges").change(function () {
      self.formData.acc_charges = $(this).find("option:selected").val();
    });
    $(".select-loose").change(function () {
      self.formData.acc_finantial_looses = $(this)
        .find("option:selected")
        .val();
    });
    $(".select-increases").change(function () {
      self.formData.acc_increases = $(this).find("option:selected").val();
    });
    $(".select-clients").change(function () {
      self.formData.acc_clients = $(this).find("option:selected").val();
    });
    $(".select-fincome").change(function () {
      self.formData.acc_finantial_incomes = $(this)
        .find("option:selected")
        .val();
    });
    $(".select-btypes").change(function () {
      self.formData.billing_type = $(this).find("option:selected").val();
    });
  },
};
</script>

