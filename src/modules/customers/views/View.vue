<template>
  <div class="elevation-1 sidebar-light-primary p-3">
    <div class="clearfix">
      <span class="text-uppercase float-left">Perfil</span>
      <a href="#" @click="getCustomer()"
        ><i class="fas ml-3 fa-sync-alt"></i
      ></a>
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

                <a
                  @click="editCustomer(`${customer.id}`)"
                  class="btn btn-primary btn-block mt-3"
                  ><b><i class="fas fa-pen"></i> Editar perfil</b></a
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
                    <a class="nav-link" href="#loans" data-toggle="tab"
                      >Empréstimos</a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#warranty" data-toggle="tab"
                      >Garantias</a
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
                        <p>{{ customer.name }}</p>
                      </div>
                      <div class="col-3">
                        <label for="">Data de nascimento</label>
                        <p>{{ customer.birthdate }}</p>
                      </div>
                      <div class="col-3">
                        <label for="">Nacionalidade</label>
                        <p>{{ customer.nationality }}</p>
                      </div>
                      <div class="col-3">
                        <label for="">Sexo</label>
                        <p v-show="customer.gender == 'M'">Masculino</p>
                        <p v-show="customer.gender == 'F'">Femenino</p>
                      </div>
                    </div>
                    <label class="text-primary" for="">Identidade </label>
                    <hr class="m-1" />
                    <div class="row">
                      <div class="col-3">
                        <label for="">Tipo de documento</label>
                        <p v-show="customer.doc_type == 'id'">B.I.</p>
                        <p v-show="customer.doc_type == 'dire'">DIRE</p>
                        <p v-show="customer.doc_type == 'passport'">
                          Passaport
                        </p>
                      </div>
                      <div class="col-3">
                        <label for="">Nr do documento</label>
                        <p>{{ customer.doc_nr }}</p>
                      </div>
                      <div class="col-3">
                        <label for="">Data de emissão</label>
                        <p>{{ customer.emission_date }}</p>
                      </div>
                      <div class="col-3">
                        <label for="">Válido até</label>
                        <p>{{ customer.expiration_date }}</p>
                      </div>
                    </div>
                    <label class="text-primary" for="">Endereço </label>
                    <hr class="m-1" />
                    <div class="row">
                      <div class="col-3">
                        <label for="">Residência</label>
                        <p v-show="customer.residence == 'own'">Própria</p>
                        <p v-show="customer.residence == 'rent'">Arrendada</p>
                      </div>
                      <div class="col-3">
                        <label for="">Cidade</label>
                        <p>{{ customer.city }}</p>
                      </div>
                      <div class="col-3">
                        <label for="">Endereço</label>
                        <p>{{ customer.address }}</p>
                      </div>
                      <div class="col-3">
                        <label for="">Nr da casa</label>
                        <p>{{ customer.house_nr }}</p>
                      </div>
                    </div>
                    <label class="text-primary" for="">Contactos </label>
                    <hr class="m-1" />
                    <div class="row">
                      <div class="col-3">
                        <label for="">Telefone</label>
                        <p>{{ customer.phone }}</p>
                      </div>
                      <div class="col-3">
                        <label for="">Alternativo</label>
                        <p>{{ customer.alternative_phone }}</p>
                      </div>
                      <div class="col-3">
                        <label for="">Familiar</label>
                        <p>{{ customer.family_phone }}</p>
                      </div>
                      <div class="col-3">
                        <label for="">Email</label>
                        <p>{{ customer.email }}</p>
                      </div>
                    </div>
                  </div>
                  <!-- /.tab-pane -->
                  <div class="tab-pane" id="loans">
                    <!-- The timeline -->
                  </div>
                  <!-- /.tab-pane -->

                  <div class="tab-pane" id="warranty"></div>
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

export default {
  name: "View",
  data() {
    return {
      loading: false,
      customer: {},
    };
  },
  components: {
    GoBackButton,
  },
  methods: {
    getCustomer() {
      this.loading = true;
      Axios.get(`/customers/${store.state.editingCustomerId}`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.customer = response.data.customer;
          this.loading = false;
          $(".odd").html("");
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    editCustomer(id) {
      this.$store.dispatch("setCustomerEditingId", id);
      this.$store.dispatch("setCustomerActionPerform", false);
      this.$router.replace(`/customers/edit`);
    },
  },
  mounted() {
    this.getCustomer();

    if (store.state.editingCustomerId == null) {
      this.$router.replace(`/customers`);
    }
  },
};

// $('#example2').DataTable( {
//     dom: 'Bfrtip',
//     buttons: [
//         'copy', 'excel', 'pdf'
//     ]
// } );

$(function () {
  $("#example2").DataTable({
    paging: true,
    lengthChange: false,
    searching: false,
    ordering: true,
    info: true,
    autoWidth: false,
    responsive: true,
  });
});
</script>

<style>
</style>