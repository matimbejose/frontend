<template>
  <!-- End table Units -->

  <!--Begin Form modal used for create and edit -->

  <div class="modal fade" tabindex="-1" role="dialog" id="createNewAccount">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <form ref="accountsForm" action="#" @submit.prevent="save">
          <div class="card card-info">
            <div class="card-header pl-2 pt-1 pb-2">
              <h3 class="card-title">
                <i class="fa fas fa-coins mr-2"></i>
                <small>Adicionar Conta</small>
              </h3>
            </div>
            <!-- /.card-header -->
            <div :class="loading ? 'card-body overlay-wrapper' : 'card-body'">
              <div v-if="loading" class="overlay">
                <i class="fas fa-3x fas fa-circle-notch text-grey fa-spin"></i>
              </div>
              <div class="row">
                <div v-show="formData.id == ''" class="col-12">
                  <div class="form-group rounded-0">
                    <label class="font-weight-normal" for="test"
                      >Contas do PGC (Selecione a conta na qual criar a
                      subconta): * <small class="text-danger"></small
                    ></label>
                    <select
                      class="form-control select-acc rounded-0 select2"
                      style="width: 100%"
                    ></select>
                  </div>
                </div>
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
                      >Codigo/Referencia da conta: *
                      <small class="text-danger" v-if="errorsValidation.uuid">{{
                        errorsValidation.uuid[0]
                      }}</small></label
                    >
                    <InputNumber
                      :useGrouping="false"
                      mode="decimal"
                      class="form-control form-control-sm rounded-0"
                      v-model="formData.uuid"
                    />
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
import store from "../../../store";
import token from "../../users/store";
import Axios from "axios";
import InputNumber from "primevue/inputnumber";
import { baseApiUrl } from "../../../global";

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
        id: "",
        account_id: "",
        name: "",
        uuid: 0,
        description: "",
        business_id: token.state.business_id,
      },
      account: store.state.accountInfo || {},
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
      $(".select-customer").val(newData.type).trigger("change");
      return (this.formData = {
        ...newData,
        account_id: newData.id,
        uuid: parseInt(this.cleanUUID(newData.uuid)),
      });
    },
    showAlert(msg, type) {
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        // type: type,
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
      if (this.formData.id === "") {
        Axios.post("/accounts", this.formData)
          .then((response) => {
            if (response.data.success) {
              this.loading = false;
              this.showAlert(response.data.success, "success");
              this.$refs.accountsForm.reset();
              this.$emit("reloadAccounts");
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
        Axios.put(`/accounts/${this.formData.id}`, this.formData)
          .then((response) => {
            this.loading = false;
            this.showAlert(response.data.success, "success");
            this.$refs.accountsForm.reset();
            this.$emit("reloadAccounts");
            //$("#createNewAccount").modal("toggle");
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
    const self = this;
    $(".select-type").change(function () {
      self.isValidated = true;
      self.formData.type = $(this).find("option:selected").val();
    });
    $(".select-acc").change(function () {
      self.formData.account_id = $(this).find("option:selected").val();
    });
    if (
      store.state.editingAccountId != null &&
      store.state.addingAccount == false
    ) {
      this.fillFormInputs(store.state.editingAccountId);
    }
    if (store.state.addingAccount == true) {
      this.$refs.accountsForm.reset();
    }

    $(".select-acc").select2({
      dropdownParent: $("#createNewAccount .modal-content"),
      minimumResultsForSearch: 2,
      minimumInputLength: 1,
      theme: "bootstrap4",
      placeholder: "Conta mae",
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
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<!-- <style src="../../../assets/css/style.css"></style> -->
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