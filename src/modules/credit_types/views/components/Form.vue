<template>
  <!-- End table Units -->

  <!--Begin Form modal used for create and edit -->

  <div class="modal fade" tabindex="-1" role="dialog" id="createNewCreditType">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <form ref="credit_typeForm" action="#" @submit.prevent="save">
          <div class="card card-info">
            <div class="card-header pl-2 pt-1 pb-2">
              <h3 class="card-title">
                <i class="fa fas fa-coins mr-2"></i>
                <small>Adicionar Tipo de crédito</small>
              </h3>
            </div>
            <!-- /.card-header -->
            <div :class="loading ? 'card-body overlay-wrapper' : 'card-body'">
              <div v-if="loading" class="overlay">
                <i class="fas fa-3x fas fa-circle-notch text-grey fa-spin"></i>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label class="font-weight-normal" for="test"
                      >Nome: *
                      <span class="text-danger">
                        <small
                          class="text-danger"
                          v-if="errorsValidation.name"
                          >{{ errorsValidation.name[0] }}</small
                        ></span
                      >
                    </label>

                    <input
                      type="text"
                      v-model="formData.name"
                      class="form-control form-control-sm rounded-0"
                      placeholder="Ex: Standart"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label class="font-weight-normal" for="test"
                      >Taxa: *
                      <small class="text-danger" v-if="errorsValidation.tax">{{
                        errorsValidation.tax[0]
                      }}</small></label
                    >
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text rounded-0">%</span>
                      </div>
                      <InputNumber
                        mode="decimal"
                        :minFractionDigits="2"
                        class="form-control form-control-sm rounded-0"
                        :step="0.01"
                        v-model="formData.tax"
                      />
                    </div>
                  </div>
                </div>
                <!-- <div class="col-12">
                  <div class="form-group rounded-0">
                    <label class="font-weight-normal" for="test"
                      >Periodo (Mensal/Anual): *
                      <small class="text-danger"></small
                    ></label>
                    <select
                      class="form-control select-type rounded-0 select2"
                      style="width: 100%"
                    >
                      <option selected>Seleccione</option>
                      <option value="monthly">Mensal</option>
                      <option value="yearly">Anual</option>
                    </select>
                  </div>
                </div> -->
                <!-- <div class="col-12" v-show="formData.type != ''">
                  <div class="form-group">
                    <label class="font-weight-normal" for="test"
                      >Informe o periodo em
                      <span class="text-danger font-weight-bold">{{
                        formData.type == "monthly" ? "Dias" : "Meses"
                      }}</span
                      >: *
                      <small class="text-danger" v-if="errorsValidation.tax">{{
                        errorsValidation.tax[0]
                      }}</small></label
                    >

                    <InputNumber
                      mode="decimal"
                      class="form-control form-control-sm rounded-0"
                      :step="1"
                      v-model="formData.value"
                    />
                  </div>
                </div> -->
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

// import InputMask from 'primevue/inputmask';

// import GoBackButton from '../../../../components/GoBackButton.vue'

Axios.defaults.baseURL = baseApiUrl;

export default {
  name: "Form",
  props: ["id"],
  components: { InputNumber },
  data() {
    return {
      loading: false,
      isValidated: false,
      val: "",
      formData: {
        id: 0,
        name: "",
        description: "",
        tax: 0,
        type: "monthly",
        value: 0,
        business_id: token.state.business_id,
      },
      credit_type: store.state.credit_typeInfo || {},
      errorsValidation: {},
    };
  },
  methods: {
    setFormData(newData) {
      this.formData.id = newData.id;
      this.formData.name = newData.name;
      this.formData.tax = parseFloat(newData.tax);
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
    save() {
      Axios.defaults.headers.common["Authorization"] =
        "Bearer " + token.state.token;
      this.loading = true;
      if (store.state.editingCredit_typeId == null) {
        Axios.post("/credit_types", this.formData)
          .then((response) => {
            if (response.data.success) {
              this.loading = false;
              this.showAlert(response.data.success, "success");
              this.$refs.credit_typeForm.reset();
              this.$emit("reloadCreditTypes");
            }
          })
          .catch((error) => {
            this.loading = false;
            if (error.response.data) {
              this.validateForm(error.response.data);
            } else {
              this.showAlert(error.response.data.error, "error");
            }
          });
      } else {
        Axios.put(
          `/credit_types/${store.state.editingCredit_typeId}`,
          this.formData
        )
          .then((response) => {
            if (response.data.success) {
              this.loading = false;
              this.showAlert(response.data.success, "success");
              // this.$refs.credit_typeForm.reset();
              this.$emit("reloadCreditTypes");
              $("#createNewCreditType").modal("toggle");
            }
          })
          .catch((error) => {
            this.loading = false;
            if (error.response.data) {
              this.validateForm(error.response.data);
            } else {
              this.showAlert(error.response.data.error, "error");
            }
          });
      }
      this.loading = false;
    },
  },
  mounted() {
    // const self = this;
    // $(".select2").select2({
    //   minimumResultsForSearch: Infinity,
    //   theme: "bootstrap4",
    // });
    // $(".select-type").change(function () {
    //   self.isValidated = true;
    //   self.formData.type = $(this).find("option:selected").val();
    // });
    // if (store.state.addingCreditType == true) {
    //   this.$refs.credit_typeForm.reset();
    // }
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