<template>
  <div class="elevation-1 sidebar-light-primary p-3 transparent">
    <div class="clearfix">
      <span class="text-uppercase float-left">utilizadores</span>
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
            <form ref="userForm" action="#" @submit.prevent="save">
              <div class="card card-secondary">
                <div class="card-header pl-4 pt-1 pb-2">
                  <h3 class="card-title">
                    <i class="fas fa-users"></i>
                    <small>Adicionar Utilizadores</small>
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
                    <div class="col-4">
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
                    <div class="col-4">
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
                  <div class="row">
                    <div class="col-3">
                      <div class="form-group">
                        <label class="font-weight-normal" for="test"
                          >Nome de Utilizador: *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.username"
                            >{{ errorsValidation.username }}</small
                          ></label
                        >
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text rounded-0"
                              ><i class="fas fa-user"></i
                            ></span>
                          </div>
                          <input
                            type="text"
                            v-model="formData.username"
                            class="form-control form-control-sm rounded-0"
                            placeholder="Ex: Junior"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-4">
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
                            placeholder="Ex: mail@example.com"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-5">
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
                  </div>
                  <div class="row">
                    <div class="col-5">
                      <div class="form-group">
                        <label class="font-weight-normal"
                          >Empresa (s): *
                          <small
                            class="text-danger"
                            v-if="errorsValidation.businesses"
                            >{{ errorsValidation.businesses }}</small
                          ></label
                        >
                        <Multiselect
                          v-model="formData.businesses"
                          mode="tags"
                          placeholder="Selecione o(s) empresa(s)"
                          :createTag="true"
                          :options="businessesList"
                        />
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
                    <div class="col-4">
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
import store from "../store";
import Axios from "axios";
import Multiselect from "@vueform/multiselect";

import { email, required } from "@vuelidate/validators";
import GoBackButton from "../../../components/GoBackButton.vue";
import { baseApiUrl } from "../../../global";

Axios.defaults.baseURL = baseApiUrl;

export default {
  name: "ListUsers",
  props: ["id"],
  components: {
    Multiselect,
    GoBackButton,
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
        last_name: "",
        surname: "",
        username: "",
        roles: [],
        email: "",
        password: "",
        password_confirmation: "",
        businesses: [],
      },
      errorsValidation: {},
    };
  },
  methods: {
    getBusinesses() {
      Axios.get("/businesses/listbusinessesmultiselect", {
        headers: { Authorization: `Bearer ${store.state.token}` },
      })
        .then((response) => {
          this.businessesList = response.data.businesses;
        })
        .catch((error) => console.log("error"));
    },
    getRoles() {
      Axios.get("/roles/listrolesmultiselect", {
        headers: { Authorization: `Bearer ${store.state.token}` },
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
        type: type,
        title: msg,
        icon: type,
      });
    },
    validateForm(error) {
      this.errorsValidation = { ...this.formData };
      this.errorsValidation.first_name = error.first_name[0];
      this.errorsValidation.roles = error.roles[0];
      this.errorsValidation.email = error.email[0];
      this.errorsValidation.surname = error.surname[0];
      this.errorsValidation.username = error.username[0];
      this.errorsValidation.businesses = error.businesses[0];
      this.errorsValidation.password = error.password[0];
      this.errorsValidation.password_confirmation = error.password[0];
    },
    save() {
      Axios.defaults.headers.common["Authorization"] =
        "Bearer " + store.state.token;
      this.loading = true;
      if (store.state.editingUserId == null) {
        Axios.post("/users", this.formData)
          .then((response) => {
            this.loading = false;
            if (response.data.success) {
              this.showAlert(response.data.success, "success");
            }
          })
          .catch((error) => {
            this.loading = false;
            this.validateForm(error.response.data.errors);
          });
      } else {
        Axios.put(`/users/${store.state.editingUserId}`, this.formData)
          .then((response) => {
            if (response.data.success) {
              this.showAlert(response.data.success, "success");
              this.$store.dispatch("setActionPerform", "add");
              this.loading = false;
            }
          })
          .catch((error) => {
            this.validateForm(error.response.data.errors);
            this.loading = false;
          });
      }
    },
    fillFormInputs(id) {
      this.loading = true;
      Axios.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${store.state.token}` },
      })
        .then((response) => {
          let user = response.data.user;
          this.formData.first_name = user.first_name;
          this.formData.last_name = user.last_name;
          this.formData.surname = user.surname;
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

    if (store.state.editingUserId == null && store.state.addingUser == false) {
      this.$router.replace(`/users`);
    }
    if (store.state.editingUserId != null && store.state.addingUser == false) {
      this.fillFormInputs(store.state.editingUserId);
    }
    if (store.state.addingUser == true) {
      this.$refs.userForm.reset();
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