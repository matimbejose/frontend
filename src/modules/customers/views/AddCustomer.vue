<template>
  <div class="elevation-1 sidebar-light-primary p-3 transparent">
    <div class="clearfix">
      <span class="text-uppercase float-left">Clientes</span>
      <div class="float-right mb-2">
        <GoBackButton :length="-1" />
      </div>
    </div>
    <hr class="pt-0 pb-1 mt-0 mb-1" />
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <!-- /.card -->
            <form ref="customerForm" action="#" @submit.prevent="save">
              <div class="card">
                <div class="card-header pl-3 pt-2 pb-2">
                  <h3 class="card-title">
                    <i class="fa fas fa-address-book mr-2"></i>
                    <small>Adicionar Clientes</small>
                  </h3>
                </div>
                <!-- /.card-header -->
                <div
                  :class="loading ? 'card-body overlay-wrapper' : 'card-body'"
                >
                  <div v-if="loading" class="overlay">
                    <i
                      class="fas fa-3x fas fa-circle-notch text-grey fa-spin"
                    ></i>
                  </div>
                  <div class="row">
                    <div class="col-2">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Tipo: *
                          <span class="text-danger">
                            <small
                              class="text-danger"
                              v-if="errorsValidation.type"
                              >{{ errorsValidation.type }}</small
                            ></span
                          ></label
                        >
                        <div class="form-group">
                          <div class="form-check">
                            <input
                              type="radio"
                              id="individual"
                              value="individual"
                              v-model="formData.type"
                              class="form-check-input"
                              checked="checked"
                            />
                            <label
                              class="form-check-label"
                              role="button"
                              for="individual"
                              >Individual</label
                            >
                          </div>
                          <div class="form-check ml-3">
                            <input
                              v-model="formData.type"
                              class="form-check-input"
                              id="company"
                              type="radio"
                              value="company"
                            />
                            <label
                              class="form-check-label"
                              role="button"
                              for="company"
                              >Empresa</label
                            >
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-4" v-show="formData.type == 'company'">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Nome da empresa: *
                          <span class="text-danger">
                            <small
                              class="text-danger"
                              v-if="errorsValidation.name"
                              >{{ errorsValidation.name }}</small
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
                            placeholder="Ex: Dugongo"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-4" v-show="formData.type == 'individual'">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Primeiro nome: *
                          <span class="text-danger">
                            <small
                              class="text-danger"
                              v-if="errorsValidation.first_name"
                              >{{ errorsValidation.first_name }}</small
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
                            v-model="formData.first_name"
                            class="form-control form-control-sm rounded-0"
                            placeholder="Ex: Junior"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-3" v-show="formData.type == 'individual'">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Segundo nome</label
                        >
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-pen"></i
                            ></span>
                          </div>
                          <input
                            type="text"
                            v-model="formData.middle_name"
                            class="form-control form-control-sm rounded-0"
                            placeholder="Ex: carlos"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-3" v-show="formData.type == 'individual'">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Apelido: *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.surname"
                            >{{ errorsValidation.surname }}</small
                          ></label
                        >
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-pen"></i
                            ></span>
                          </div>
                          <input
                            type="text"
                            v-model="formData.last_name"
                            class="form-control form-control-sm rounded-0"
                            placeholder="Ex: Banze"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3" v-show="formData.type == 'individual'">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Data de nascimento: *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.birthdate"
                            >{{ errorsValidation.birthdate }}</small
                          ></label
                        >
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-calendar"></i
                            ></span>
                          </div>
                          <v-date-picker
                            v-model="formData.birthdate"
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
                    <div class="col-2" v-show="formData.type == 'individual'">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Sexo: *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.gender"
                            >{{ errorsValidation.gender[0] }}</small
                          ></label
                        >
                        <div class="row form-group">
                          <div class="form-check">
                            <input
                              v-model="formData.gender"
                              class="form-check-input"
                              id="m"
                              value="M"
                              type="radio"
                              checked=""
                            />
                            <label
                              class="form-check-label"
                              role="button"
                              for="m"
                              >M</label
                            >
                          </div>
                          <div class="form-check ml-3">
                            <input
                              v-model="formData.gender"
                              value="F"
                              id="f"
                              class="form-check-input"
                              type="radio"
                            />
                            <label
                              class="form-check-label"
                              role="button"
                              for="f"
                              >F</label
                            >
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-2" v-show="formData.type == 'individual'">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Actividade: *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.activity"
                            >{{ errorsValidation.activity[0] }}</small
                          ></label
                        >
                        <div class="row form-group">
                          <div class="form-check">
                            <input
                              v-model="formData.activity"
                              id="employed"
                              class="form-check-input"
                              type="radio"
                              value="employed"
                              checked="checked"
                            />
                            <label
                              class="form-check-label"
                              role="button"
                              for="employed"
                              >Empregado</label
                            >
                          </div>
                          <div class="form-check ml-3">
                            <input
                              v-model="formData.activity"
                              id="own"
                              class="form-check-input"
                              value="own"
                              type="radio"
                            />
                            <label
                              class="form-check-label"
                              role="button"
                              for="own"
                              >Conta própria</label
                            >
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-2">
                      <div class="form-group rounded-0">
                        <label class="font-weight-normal" for="test"
                          >Tipo do Doc: *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.doc_type"
                            >{{ errorsValidation.doc_type[0] }}</small
                          ></label
                        >
                        <select
                          class="form-control select-doctype rounded-0 select2"
                          style="width: 100%"
                        >
                          <option value="id" selected="selected">B.I.</option>
                          <option value="dire">DIRE</option>
                          <option value="passport">Passaporte</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Nr do Documento: *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.doc_nr"
                            >{{ errorsValidation.doc_nr }}</small
                          ></label
                        >
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-id-badge"></i
                            ></span>
                          </div>
                          <input
                            type="text"
                            v-model="formData.doc_nr"
                            class="form-control rounded-0 form-control-sm"
                            placeholder="110191200192B"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-3">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Data de emissão: *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.emission_date"
                            >{{ errorsValidation.emission_date }}</small
                          ></label
                        >
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-calendar"></i
                            ></span>
                          </div>
                          <v-date-picker
                            v-model="formData.emission_date"
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
                    <div class="col-3">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Válido até: *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.expiration_date"
                            >{{ errorsValidation.expiration_date }}</small
                          ></label
                        >
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-calendar"></i
                            ></span>
                          </div>
                          <v-date-picker
                            v-model="formData.expiration_date"
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

                    <div class="col-3">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >NUIT:*
                          <small
                            class="text-danger"
                            v-if="errorsValidation.nuit"
                            >{{ errorsValidation.nuit }}</small
                          ></label
                        >
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-id-card"></i
                            ></span>
                          </div>
                          <InputMask
                            v-model="formData.nuit"
                            mask="999 999 999"
                            class="form-control form-control-sm rounded-0"
                            placeholder="12133244"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-3">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Nacionalidade: *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.nationality"
                            >{{ errorsValidation.nationality }}</small
                          ></label
                        >
                        <div class="input-group mb-3">
                          <div class="input-group-prepend bg-light">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-globe"></i
                            ></span>
                          </div>
                          <input
                            type="text"
                            v-model="formData.nationality"
                            class="form-control rounded-0 form-control-sm"
                            placeholder="Mozambique"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <label class="text-primary" for="">Endereço </label>
                  <hr class="m-1" />
                  <div class="row">
                    <div class="col-2" v-show="formData.type == 'individual'">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Residência: *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.residence"
                            >{{ errorsValidation.residence }}</small
                          ></label
                        >
                        <div class="form-group">
                          <div class="form-check">
                            <input
                              v-model="formData.residence"
                              id="rent"
                              class="form-check-input"
                              type="radio"
                              value="rent"
                            />
                            <label
                              class="form-check-label"
                              role="button"
                              for="rent"
                              >Arrendada</label
                            >
                          </div>
                          <div class="form-check ml-3">
                            <input
                              v-model="formData.residence"
                              id="own_house"
                              class="form-check-input"
                              type="radio"
                              value="own"
                              checked=""
                            />
                            <label
                              class="form-check-label"
                              role="button"
                              for="own_house"
                              >Própria</label
                            >
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-3">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Cidade: *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.city"
                            >{{ errorsValidation.city }}</small
                          ></label
                        >
                        <div class="input-group mb-3">
                          <div class="input-group-prepend bg-light">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-map-marker"></i
                            ></span>
                          </div>
                          <input
                            type="text"
                            v-model="formData.city"
                            class="form-control rounded-0 form-control-sm"
                            placeholder="Maputo"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-3">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Endereço: *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.address"
                            >{{ errorsValidation.address }}</small
                          ></label
                        >
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-map-marker"></i
                            ></span>
                          </div>
                          <input
                            type="text"
                            v-model="formData.address"
                            class="form-control rounded-0 form-control-sm"
                            placeholder="Avenida, Bairro"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-2">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Quarteirão: (Opcional)
                          <small
                            class="text-danger"
                            v-if="errorsValidation.quarter"
                            >{{ errorsValidation.quarter }}</small
                          ></label
                        >
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-id-badge"></i
                            ></span>
                          </div>
                          <input
                            type="text"
                            v-model="formData.quarter"
                            class="form-control rounded-0 form-control-sm"
                            placeholder="Ex: Q-12"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-2">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Nr da casa: *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.house_nr"
                            >{{ errorsValidation.house_nr }}</small
                          ></label
                        >
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-id-badge"></i
                            ></span>
                          </div>
                          <input
                            type="text"
                            v-model="formData.house_nr"
                            class="form-control rounded-0 form-control-sm"
                            placeholder="Ex: 460"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <label class="text-primary" for="">Contactos: </label>
                  <hr class="m-1" />
                  <div class="row">
                    <div class="col-3">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Telefone: *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.phone"
                            >{{ errorsValidation.phone }}</small
                          ></label
                        >
                        <div class="input-group mb-3">
                          <div class="input-group-prepend bg-light">
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

                    <div class="col-3">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Alternativo:
                          <small
                            class="text-danger"
                            v-if="errorsValidation.city"
                            >{{ errorsValidation.alternative_phone }}</small
                          ></label
                        >
                        <div class="input-group mb-3">
                          <div class="input-group-prepend bg-light">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-phone"></i
                            ></span>
                          </div>
                          <InputMask
                            v-model="formData.alternative_phone"
                            mask="99 999 9999"
                            class="form-control form-control-sm rounded-0"
                            placeholder="Ex: 878383883"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-3" v-show="formData.type == 'individual'">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Familiar:
                          <small
                            class="text-danger"
                            v-if="errorsValidation.city"
                            >{{ errorsValidation.family_phone }}</small
                          ></label
                        >
                        <div class="input-group mb-3">
                          <div class="input-group-prepend bg-light">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-phone"></i
                            ></span>
                          </div>
                          <InputMask
                            v-model="formData.family_phone"
                            mask="99 999 9999"
                            class="form-control form-control-sm rounded-0"
                            placeholder="Ex: 878383883"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-3">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Email:
                          <small
                            class="text-danger"
                            v-if="errorsValidation.email"
                            >{{ errorsValidation.email }}</small
                          ></label
                        >
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-envelope"></i
                            ></span>
                          </div>
                          <input
                            type="email"
                            v-model="formData.email"
                            class="form-control rounded-0 form-control-sm"
                            placeholder="membro@admin.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />

                  <div class="form-group">
                    <div class="custom-control custom-checkbox">
                      <input
                        class="custom-control-input"
                        disabled
                        type="checkbox"
                        id="createUser"
                        value="option1"
                      />
                      <label for="createUser" class="custom-control-label"
                        >Criar conta de utilizador para o cliente.</label
                      >
                    </div>
                  </div>
                  <!-- table begin -->
                </div>
                <!-- /.card-body -->

                <!-- /.card-footer -->
                <div class="card-footer">
                  <div class="d-flex justify-content-end">
                    <button
                      type="submit"
                      :disabled="loading"
                      class="btn btn-success mr-1 btn-sm"
                    >
                      <i class="fas fa-save"></i> Guardar
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
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
import InputMask from "primevue/inputmask";
import moment from "moment-timezone";

import GoBackButton from "../../../components/GoBackButton.vue";
import { baseApiUrl } from "../../../global";

Axios.defaults.baseURL = baseApiUrl;

export default {
  name: "ListUsers",
  props: ["id"],
  components: {
    GoBackButton,
    InputMask,
  },
  data() {
    return {
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD", // Uses 'iso' if missing
      },
      loading: false,
      val: "",
      formData: {
        first_name: "",
        last_name: "",
        middle_name: "",
        nationality: "Moçambicana",
        city: "Maputo",
        doc_type: "id",
        doc_nr: "",
        birthdate: moment(
          JSON.stringify(new Date()).split("T")[0],
          "YYYY-MM-DD"
        )
          .subtract(18, "years")
          .format("YYYY-MM-DD"),
        emission_date: moment(
          JSON.stringify(new Date()).split("T")[0],
          "YYYY-MM-DD"
        ).format("YYYY-MM-DD"),
        expiration_date: moment(
          JSON.stringify(new Date()).split("T")[0],
          "YYYY-MM-DD"
        ).format("YYYY-MM-DD"),
        activity: "employed",
        address: "",
        phone: "",
        alternative_phone: "",
        family_phone: "",
        quarter: "",
        name: "",
        house_nr: "",
        residence: "own",
        type: "individual",
        gender: "M",
        business_id: token.state.business_id,
      },
      errorsValidation: {},
    };
  },
  methods: {
    getBusinesses() {
      Axios.get("/businesses/listbusinessesmultiselect", {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.businessesList = response.data.businesses;
        })
        .catch((error) => console.log("error"));
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
      let errorsFormed = {};
      for (const [key, value] of Object.entries(error)) {
        errorsFormed[key] = value[0];
      }
      this.errorsValidation = { ...errorsFormed };
    },
    save() {
      Axios.defaults.headers.common["Authorization"] =
        "Bearer " + token.state.token;
      this.loading = true;
      if (store.state.editingCustomerId == null) {
        Axios.post("/customers", this.formData)
          .then((response) => {
            if (response.data.success) {
              this.loading = false;
              this.showAlert(response.data.success, "success");
              //this.$refs.customerForm.reset();
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
      } else {
        Axios.put(`/customers/${store.state.editingCustomerId}`, this.formData)
          .then((response) => {
            if (response.data.success) {
              this.loading = false;
              this.showAlert(response.data.success, "success");
              this.$store.dispatch("setActionPerform", "add");
            }
          })
          .catch((error) => {
            this.loading = false;
            if (error.response.data.errors) {
              this.validateForm(error.response.data.errors);
            } else {
              this.showAlert(error.response.data.error, "error");
            }
          });
      }
      this.loading = false;
    },
    fillFormInputs(id) {
      this.loading = true;
      Axios.get(`/customers/${id}`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.loading = false;
          this.formData = { ...response.data.customer };
          $(".select-doctype")
            .val(response.data.customer.doc_type)
            .trigger("change");
        })
        .catch((error) => {
          console.log("Processing...");
        });
    },
  },
  mounted() {
    $(".select2").select2();
    $(".select-doctype").change(function () {
      self.doc_type = $(this).find("option:selected").val();
    });

    if (
      store.state.editingCustomerId == null &&
      store.state.addingCustomer == false
    ) {
      this.$router.replace(`/customers`);
    }
    if (
      store.state.editingCustomerId != null &&
      store.state.addingCustomer == false
    ) {
      this.fillFormInputs(store.state.editingCustomerId);
    }
    if (store.state.addingCustomer == true) {
      this.$refs.customerForm.reset();
    }
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style src="../../../../public/assets/plugins/select2/css/select2.min.css"></style>
<style src="../../../../node_modules/@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.min.css"></style>
<style>
.select2-container--default
  .select2-selection--single
  .select2-selection__rendered {
  margin-top: -9px !important;
}
</style>
