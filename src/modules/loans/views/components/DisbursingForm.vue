<template>
  <div class="row">
    <div class="col-4">
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

    <div class="col-4">
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
            :disabled="true"
            class="form-control form-control-sm rounded-0"
            :min="0"
            v-model="formData.disbursed_amount"
            mode="currency"
            currency="MZN"
          />
        </div>
      </div>
    </div>

    <div class="col-4">
      <div class="form-group rounded-0">
        <label class="font-weight-normal" for="test"
          >Contas conta a debitar: * <small class="text-danger"></small
        ></label>
        <select
          class="form-control select-account rounded-0 select2"
          style="width: 100%"
        >
          <option selected disabled>Seleccione</option>
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
      <button @click="disburse()" class="btn btn-success btn-xs float-right">
        <i class="fas fa-save"></i> Desembolsar
      </button>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import moment from "moment";
import InputNumber from "primevue/inputnumber";
import token from "../../../users/store";
import Axios from "axios";
import store from "../../store";
Axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default {
  name: "DisbursingForm",
  props: ["accounts", "loan_data"],
  emits: ["reloadLoans"],
  components: {
    InputNumber,
  },
  data() {
    return {
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD", // Uses 'iso' if missing
      },
      formData: {
        created_at: moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD"),
        disbursed_amount: parseFloat(this.loan_data.amount),
        account_id: "",
        id: this.loan_data.id,
      },
    };
  },
  methods: {
    cleanUUID(uuid) {
      return uuid.split(".").join("");
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
    disburse() {
      this.overlay = true;
      Axios.post(`/loans/disburse`, this.formData, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.loan = response.data.loan;
          this.$emit("reloadLoans", this.loan);
          this.showAlert(response.data.success, "success");
        })
        .catch((error) => {
          this.showAlert("Algo deu errado", "error");
        });
    },
  },
  mounted() {
    const self = this;
    $(".select2").select2({
      minimumResultsForSearch: Infinity,
      theme: "bootstrap4",
    });
    $(".select-account").change(function () {
      self.formData.account_id = $(this).find("option:selected").val();
    });
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style src="../../../../../public/assets/plugins/select2/css/select2.min.css"></style>
<style src="../../../../../node_modules/@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.min.css"></style>
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