<template>
  <form
    ref="generalForm"
    enctype="multipart/form-data"
    action="#"
    @submit="save"
  >
    <div class="row">
      <div class="col-6">
        <div class="col-12">
          <div class="form-group">
            <label class="font-weight-normal" for="test"
              >Nome da filial: *
              <span class="text-danger">
                <small
                  class="text-danger"
                  v-if="errorsValidation.business_name"
                  >{{ errorsValidation.business_name[0] }}</small
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
                v-model="formData.business_name"
                class="form-control form-control-sm rounded-0"
                placeholder="Ex: Standart"
              />
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label class="font-weight-normal" for="test"
              >NUIT: *
              <small class="text-danger" v-if="errorsValidation.nuit">{{
                errorsValidation.nuit[0]
              }}</small></label
            >
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text rounded-0"
                  ><i class="fas fa-id-card"></i
                ></span>
              </div>
              <input
                type="numeric"
                v-model="formData.nuit"
                class="form-control form-control-sm rounded-0"
                placeholder="10"
              />
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="form-group">
            <label for="exampleInputFile">Logotipo</label>
            <div class="input-group">
              <div class="custom-file">
                <input
                  type="file"
                  v-on:change="onImageChange"
                  class="custom-file-input"
                  id="exampleInputFile"
                />
                <label class="custom-file-label" for="exampleInputFile"
                  >Escolher arquivo</label
                >
              </div>
              <div class="input-group-append">
                <span class="input-group-text" id="">Carregar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="col-12">
          <div class="form-group">
            <label class="font-weight-normal" for="test"
              >Endereço: *
              <span class="text-danger">
                <small class="text-danger" v-if="errorsValidation.address">{{
                  errorsValidation.address[0]
                }}</small></span
              >
            </label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text rounded-0"
                  ><i class="fas fa-map-marker"></i
                ></span>
              </div>
              <input
                type="text"
                v-model="formData.address"
                class="form-control form-control-sm rounded-0"
                placeholder="Ex: Standart"
              />
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label class="font-weight-normal" for="test"
              >Telefone: *
              <small class="text-danger" v-if="errorsValidation.phone">{{
                errorsValidation.phone[0]
              }}</small></label
            >
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text rounded-0"
                  ><i class="fas fa-phone"></i
                ></span>
              </div>
              <InputMask
                v-model="formData.phone"
                mask="99 999 9999"
                class="form-control form-control-sm rounded-0"
                placeholder="Ex: 878383883"
              />
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="form-group">
            <label class="font-weight-normal" for="test"
              >Inicio de actividade: *
              <small class="text-danger" v-if="errorsValidation.birthdate">{{
                errorsValidation.start_date
              }}</small></label
            >
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text rounded-0"
                  ><i class="fas fa-calendar"></i
                ></span>
              </div>
              <v-date-picker
                v-model="formData.start_date"
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

      <div class="ml-auto">
        <button
          type="submit"
          :disabled="loading"
          class="btn btn-success mr-1 btn-sm"
        >
          <i class="fas fa-save"></i> Actualizar
        </button>
      </div>
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
import InputMask from "primevue/inputmask";

import { baseApiUrl } from "../../../../global";
Axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
Axios.defaults.baseURL = baseApiUrl;

export default {
  name: "General",
  components: { InputMask },
  data() {
    return {
      loading: false,
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD", // Uses 'iso' if missing
      },
      val: "",
      formData: {
        business_name: "",
        nuit: "",
        phone: "",
        address: "",
        logo: "",
        start_date: moment(
          JSON.stringify(new Date()).split("T")[0],
          "YYYY-MM-DD"
        ).format("YYYY-MM-DD"),
        business_id: token.state.business_id,
      },
      image: "",
      business: {},
      errorsValidation: {},
    };
  },
  methods: {
    setFormData(newData) {
      return (this.formData = { ...newData });
    },
    onImageChange(e) {
      this.formData.logo = e.target.files[0];
      //this.formData = {...this.formData, image: this.image}
      console.log(this.formData.logo);
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
          this.formData = { ...response.data.businesses };
          this.loading = false;
        })
        .catch((error) => console.log("error"));
    },
    save(e) {
      e.preventDefault();
      // Axios.defaults.headers.common["Authorization"] = "Bearer " + token.state.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token.state.token}`,
          "content-type": "multipart/form-data",
        },
      };
      var formData = new FormData();
      formData.append("logo", this.formData.logo);
      formData.append("business_name", this.formData.business_name);
      formData.append("start_date", this.formData.start_date);
      formData.append("nuit", this.formData.nuit);
      formData.append("address", this.formData.address);
      formData.append("phone", this.formData.phone);
      formData.append("business_id", token.state.business_id);
      formData.append("_method", "put");

      this.loading = true;
      Axios.post(`/businesses/${this.formData.id}`, formData, config)
        .then((response) => {
          if (response.data.success) {
            this.loading = false;
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
    this.getBusinesses();
  },
};
</script>

