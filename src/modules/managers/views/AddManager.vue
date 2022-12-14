<template>
  <div class="elevation-1 sidebar-light-primary p-3 transparent">
    <div class="clearfix">
      <span class="text-uppercase float-left">Gestores</span>
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
            <form ref="managerForm" action="#" @submit.prevent="save">
              <div class="card">
                <div class="card-header pl-3 pt-2 pb-2">
                  <h3 class="card-title">
                    <i class="fa fas fa-address-book mr-2"></i>
                    <small>Adicionar Gestores</small>
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
                          >Sexo: *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.gender"
                            >{{ errorsValidation.gender }}</small
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
                    <div class="col-4">
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
                    <div class="col-3">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Segundo nome <small>(optional)</small></label
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
                            placeholder="Ex: carlos"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-3">
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
                            v-model="formData.surname"
                            class="form-control form-control-sm rounded-0"
                            placeholder="Ex: Banze"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <label class="text-primary" for="">Endereço </label>
                  <hr class="m-1" />
                  <div class="row">
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

                    <div class="col-5">
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
                  </div>
                  <label class="text-primary" for=""
                    >Acesso como utilizador:
                  </label>
                  <hr class="m-1" />
                  <div class="row">
                    <div class="col-3">
                      <div class="form-group">
                        <label class="font-weight-normal"
                          >Cargo (s): *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.roles"
                            >{{ errorsValidation.roles }}</small
                          ></label
                        >
                        <Multiselect
                          v-model="formData.roles"
                          mode="tags"
                          placeholder="Selecione o(s) cargo(s)"
                          :createTag="true"
                          :options="rolesList"
                          ref="multiselect"
                        />
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Email: *
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
                    <div class="col-3">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Senha: *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.password"
                            >{{ errorsValidation.password }}</small
                          ></label
                        >
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-key"></i
                            ></span>
                          </div>
                          <input
                            type="password"
                            v-model="formData.password"
                            class="form-control rounded-0 form-control-sm"
                            placeholder="*******"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Reescreva a senha: *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.password_confirmation"
                            >{{ errorsValidation.password_confirmation }}</small
                          ></label
                        >
                        <div class="input-group mb-3">
                          <div class="input-group-prepend bg-light">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-key"></i
                            ></span>
                          </div>
                          <input
                            type="password"
                            v-model="formData.password_confirmation"
                            class="form-control rounded-0 form-control-sm"
                            placeholder="*******"
                          />
                        </div>
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
import store from "../store";
import token from "../../users/store";
import Axios from "axios";
import Multiselect from "@vueform/multiselect";

import { email, required } from "@vuelidate/validators";
import GoBackButton from "../../../components/GoBackButton.vue";
import { baseApiUrl } from "../../../global";
import InputMask from "primevue/inputmask";

Axios.defaults.baseURL = baseApiUrl;

export default {
  name: "ListManagers",
  props: ["id"],
  components: {
    Multiselect,
    GoBackButton,
    InputMask,
  },
  data() {
    return {
      loading: false,
      users: [],
      selectedRoles: null,
      selectedBusinesses: null,
      rolesList: [],
      businessesList: [],
      formData: {
        first_name: "",
        surname: "",
        last_name: "",
        phone: "",
        address: "",
        city: "",
        username: "",
        gender: true,
        roles: [],
        businesses: [1],
        type: "manager",
        email: "",
        password: "",
        password_confirmation: "",
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
    getRoles() {
      Axios.get("/roles/listrolesmultiselect", {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.rolesList = response.data.roles;
        })
        .catch((error) => console.log("processs"));
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
      this.formData.gender = this.gender ? "M" : "F";
      //this.formData.username =
      if (!this.id) {
        Axios.post("/users", this.formData)
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
      } else {
        Axios.put(`/users/${this.id}`, this.formData)
          .then((response) => {
            if (response.data.success) {
              this.showAlert(response.data.success, "success");
              this.$store.dispatch("setActionPerform", "add");
              this.loading = false;
            }
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
    fillFormInputs(id) {
      this.loading = true;
      Axios.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          let user = response.data.user;
          this.formData.first_name = user.first_name;
          this.formData.surname = user.surname;
          this.formData.last_name = user.last_name;
          this.formData.city = user.city;
          this.formData.address = user.address;
          this.formData.phone = user.phone;
          this.formData.username = user.username;
          this.formData.email = user.email;
          this.loading = false;
        })
        .catch((error) => {
          console.log("Processing...");
        });
    },
  },
  mounted() {
    // this.$refs.multiselect.value.select()
    this.getRoles();
    this.getBusinesses();
    if (this.id) {
      this.fillFormInputs(this.id);
    }
    if (!this.id) {
      this.$refs.managerForm.reset();
    }
  },
  validations() {
    return {
      formData: {
        first_name: { required },
        surname: { required },
        username: { required },
        email: { email },
        roles: { required },
        password: { required },
        password_confirmation: { required },
        businesses: { required },
      },
    };
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.input-group-text {
  background-color: white !important;
  font-size: 10px !important;
}
.multiselect-tag {
  background: #007bff !important;
  color: white;
}
.multiselect > * {
  font-size: small !important;
}
</style>