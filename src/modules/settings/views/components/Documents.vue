<template>
  <!-- /.card-header -->
  <div :class="loading ? 'card-body overlay-wrapper' : 'card-body'">
    <div v-if="loading" class="overlay">
      <i class="fas fa-3x fas fa-circle-notch text-grey fa-spin"></i>
    </div>
    <div class="d-flex justify-content-end">
      <router-link to="/documents/new" class="btn btn-success mr-1 mb-2 btn-xs"
        ><i class="fas fa-plus-circle"></i> ADICIONAR</router-link
      >
    </div>

    <!-- table begin  -->
    <table id="accounts" class="table table-sm table-font table-bordered">
      <thead>
        <tr class="text-uppercase font-weight-normal">
          <th>Código</th>
          <th>Descrição</th>
          <th>Acções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="account in accounts" :key="account.id">
          <td>{{ "#" }}</td>
          <td>{{ account.description }}</td>
          <td>
            <router-link
              :to="'/documents/' + account.id"
              class="btn btn-success mr-1 btn-xs"
            >
              <i class="fas fa-pen"></i> Editar
            </router-link>
            <!-- <button
              @click="deleteAccount(account.id)"
              class="btn btn-danger mr-1 btn-xs"
            >
              <i class="fas fa-trash"></i> Apagar
            </button> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- /.card-body -->

  <!-- /.col -->
  <!-- /.row -->
</template>

<script>
import $ from "jquery";
import "../../../../assets/css/style.css";
import store from "../../store";
import token from "../../../users/store";
import Axios from "axios";

import { baseApiUrl } from "../../../../global";
Axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
Axios.defaults.baseURL = baseApiUrl;

export default {
  name: "Accounts",
  emits: ["reloadAccounts"],
  data() {
    return {
      taxes: [],
      loading: false,
      accounts: [],
    };
  },
  methods: {
    getDocuments() {
      this.loading = true;
      Axios.get("/settings/documents", {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.accounts = response.data.documents;
          this.loading = false;
          $(".odd").html("");
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    showAlert(msg) {
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        type: "success",
        title: msg,
        icon: "error",
      });
    },

    editAcccount(id) {
      this.$store.dispatch("setAccountEditingId", id);
      this.$store.dispatch("setAccountActionPerform", false);
      Axios.get(`/accounts/${id}`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.loading = false;
          this.$refs.addaccount.setFormData(response.data);
        })
        .catch((error) => {
          console.log("Processing...");
        });
    },
  },
  mounted() {
    // execute child method from parent
  },
};
</script>

<style scoped>
</style>