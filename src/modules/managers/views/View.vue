<template>
  <div class="elevation-1 sidebar-light-primary p-3">
    <div class="clearfix">
      <span class="text-uppercase float-left">Perfil</span>
      <a href="#" @click="getManager()"><i class="fas ml-3 fa-sync-alt"></i></a>
      <div class="float-right mb-2">
        <GoBackButton :length="-1" />
      </div>
    </div>
    <hr class="pt-0 pb-1 mt-0 mb-1" />
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">
            <!-- Profile Image -->
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center">
                  <img
                    class="profile-user-img img-fluid img-circle"
                    src="/assets/img/user.png"
                    alt="User profile picture"
                  />
                </div>

                <router-link
                  :to="`/managers/edit/${manager.id}`"
                  class="btn btn-primary btn-block mt-3"
                  ><b><i class="fas fa-pen"></i> Editar perfil</b></router-link
                >
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->

            <!-- /.card -->
          </div>
          <!-- /.col -->
          <div class="col-md-9">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      href="#activity"
                      data-toggle="tab"
                      >Dados do perfil</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      href="#loans"
                      @click="showLoans()"
                      data-toggle="tab"
                      >Empréstimos</a
                    >
                  </li>
                </ul>
              </div>
              <!-- /.card-header -->
              <div
                :class="loading ? 'card-body overlay-wrapper' : 'card-body'"
                class="card-body"
              >
                <div v-if="loading" class="overlay">
                  <i
                    class="fas fa-3x fas fa-circle-notch text-grey fa-spin"
                  ></i>
                </div>
                <div class="tab-content">
                  <div class="active tab-pane" id="activity">
                    <label class="text-primary" for="">Perfil </label>
                    <hr class="m-1" />
                    <div class="row">
                      <div class="col-3">
                        <label for="">Nome</label>
                        <p>{{ manager.name }}</p>
                      </div>
                      <div class="col-3">
                        <label for="">Sexo</label>
                        <p v-show="manager.gender == 'M'">Masculino</p>
                        <p v-show="manager.gender == 'F'">Femenino</p>
                      </div>
                      <div class="col-3">
                        <label for="">Cidade</label>
                        <p>{{ manager.city }}</p>
                      </div>
                      <div class="col-3">
                        <label for="">Endereço</label>
                        <p>{{ manager.address }}</p>
                      </div>
                      <div class="col-3">
                        <label for="">Telefone</label>
                        <p>{{ manager.phone }}</p>
                      </div>
                      <div class="col-3">
                        <label for="">Email</label>
                        <p>{{ manager.email }}</p>
                      </div>
                    </div>
                  </div>
                  <!-- /.tab-pane -->
                  <div class="tab-pane" id="loans">
                    <Loans ref="showLoans" />
                  </div>
                  <!-- /.tab-pane -->

                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.nav-tabs-custom -->
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
import "datatables.net";
import "datatables.net-dt";
import "datatables.net-bs4";
import "datatables.net-buttons";
import "datatables.net-buttons-bs4";
import store from "../store";
import token from "../../users/store";
import Axios from "axios";
import GoBackButton from "../../../components/GoBackButton.vue";
import Loans from './components/Loans.vue'

export default {
  name: "View",
  props: ["id"],
  data() {
    return {
      loading: false,
      manager: {},
    };
  },
  components: {
    GoBackButton,
    Loans
  },
  methods: {
    getManager() {
      this.loading = true;
      Axios.get(`/users/${this.id}`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.manager = response.data.user;
          this.loading = false;
          $(".odd").html("");
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    showLoans() {
      this.$refs.showLoans.getLoans(this.id);
    },
  },
  mounted() {
    this.getManager();
  },
};
</script>

<style>
</style>