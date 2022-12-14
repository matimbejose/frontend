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
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text rounded-0"
                          ><i class="fas fa-pen"></i
                        ></span>
                      </div>
                      <input
                        type="text"
                        v-model="formData.name"
                        class="form-control form-control-sm rounded-0"
                        placeholder="Ex: Standart"
                      />
                    </div>
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
                        <span class="input-group-text rounded-0"
                          ><i class="fas fa-percent"></i
                        ></span>
                      </div>
                      <input
                        type="numeric"
                        v-model="formData.tax"
                        class="form-control form-control-sm rounded-0"
                        placeholder="10"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label class="font-weight-normal" for="test"
                      >Descrição: *
                      <small
                        class="text-danger"
                        v-if="errorsValidation.description"
                        >{{ errorsValidation.description[0] }}</small
                      ></label
                    >
                    <textarea
                      class="form-control"
                      v-model="formData.description"
                      rows="3"
                      placeholder="Descreva o tipo..."
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
import { baseApiUrl } from "../../../../global";

// import InputMask from 'primevue/inputmask';

// import GoBackButton from '../../../../components/GoBackButton.vue'

Axios.defaults.baseURL = baseApiUrl;

export default {
  name: "Form",
  props: ["id"],

  data() {
    return {
      loading: false,
      val: "",
      formData: {
        name: "",
        description: "",
        tax: "",
        business_id: token.state.business_id,
      },
      credit_type: store.state.credit_typeInfo || {},
      errorsValidation: {},
    };
  },
  methods: {
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
            this.validateForm(error.response.data);
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
              this.$refs.credit_typeForm.reset();
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
      store.state.editingCredit_typeId != null &&
      store.state.addingCreditType == false
    ) {
      this.fillFormInputs(store.state.editingCredit_typeId);
    }
    if (store.state.addingCreditType == true) {
      this.$refs.credit_typeForm.reset();
    }
  },
};
</script>

