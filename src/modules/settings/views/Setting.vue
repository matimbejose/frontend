<template>
  <div class="elevation-1 sidebar-light-primary pl-3 pt-3 transparent">
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
        <div class="d-flex justify-content-center">
          <div class="col-10">
            <div class="card">
              <div class="card-header pl-3 pt-2 pb-2">
                <h3 class="card-title">
                  <i class="fas fa-cog fa-spin"></i>
                  <small>
                    Configurações
                    <a href="#" @click="getCreditTypes()"
                      ><i class="fas ml-3 fa-sync-alt"></i
                    ></a>
                  </small>
                </h3>
              </div>
              <!-- /.card-header -->
              <div class="row">
                <div class="col-12 h-100">
                  <div class="card card-primary card-outline card-tabs">
                    <div class="card-header p-0 pt-1 border-bottom-0">
                      <ul
                        class="nav nav-tabs"
                        id="custom-tabs-three-tab"
                        role="tablist"
                      >
                        <li class="nav-item">
                          <a
                            class="nav-link active"
                            id="custom-tabs-three-home-tab"
                            data-toggle="pill"
                            href="#custom-tabs-three-home"
                            role="tab"
                            aria-controls="custom-tabs-three-home"
                            aria-selected="true"
                            >Gerais</a
                          >
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            id="custom-tabs-three-business-tab"
                            data-toggle="pill"
                            href="#custom-tabs-three-business"
                            role="tab"
                            aria-controls="custom-tabs-three-business"
                            aria-selected="false"
                            >Regras de negócio.</a
                          >
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            id="custom-tabs-three-profile-tab"
                            @click="getDocuments()"
                            data-toggle="pill"
                            href="#custom-tabs-three-profile"
                            role="tab"
                            aria-controls="custom-tabs-three-profile"
                            aria-selected="false"
                            >Documentos</a
                          >
                        </li>

                        <!-- <li class="nav-item">
                          <a
                            class="nav-link"
                            id="custom-tabs-three-messages-tab"
                            data-toggle="pill"
                            href="#custom-tabs-three-messages"
                            role="tab"
                            aria-controls="custom-tabs-three-messages"
                            aria-selected="false"
                            >Definições de Email</a
                          >
                        </li> -->
                      </ul>
                    </div>
                    <div class="card-body">
                      <div
                        class="tab-content"
                        id="custom-tabs-three-tabContent"
                      >
                        <div
                          class="tab-pane fade show active"
                          id="custom-tabs-three-home"
                          role="tabpanel"
                          aria-labelledby="custom-tabs-three-home-tab"
                        >
                          <General />
                        </div>
                        <div
                          class="tab-pane fade"
                          id="custom-tabs-three-profile"
                          role="tabpanel"
                          aria-labelledby="custom-tabs-three-profile-tab"
                        >
                          <Document ref="documents" />
                        </div>
                        <div
                          class="tab-pane fade"
                          id="custom-tabs-three-business"
                          role="tabpanel"
                          aria-labelledby="custom-tabs-three-business-tab"
                        >
                          <Business ref="business" />
                        </div>
                        <div
                          class="tab-pane fade"
                          id="custom-tabs-three-messages"
                          role="tabpanel"
                          aria-labelledby="custom-tabs-three-messages-tab"
                        >
                          Morbi turpis dolor, vulputate vitae felis non,
                          tincidunt congue mauris. Phasellus volutpat augue id
                          mi placerat mollis. Vivamus faucibus eu massa eget
                          condimentum. Fusce nec hendrerit sem, ac tristique
                          nulla. Integer vestibulum orci odio. Cras nec augue
                          ipsum. Suspendisse ut velit condimentum, mattis urna
                          a, malesuada nunc. Curabitur eleifend facilisis velit
                          finibus tristique. Nam vulputate, eros non luctus
                          efficitur, ipsum odio volutpat massa, sit amet
                          sollicitudin est libero sed ipsum. Nulla lacinia, ex
                          vitae gravida fermentum, lectus ipsum gravida arcu, id
                          fermentum metus arcu vel metus. Curabitur eget sem eu
                          risus tincidunt eleifend ac ornare magna.
                        </div>
                        <div
                          class="tab-pane fade"
                          id="custom-tabs-three-settings"
                          role="tabpanel"
                          aria-labelledby="custom-tabs-three-settings-tab"
                        >
                          <router-link to="/documents/new">New doc</router-link>
                        </div>
                      </div>
                    </div>
                    <!-- /.card -->
                  </div>
                </div>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <Form ref="creditType" @reloadCreditTypes="getCreditTypes()" />
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import $ from "jquery";
import "../../../assets/css/style.css";
import "datatables.net/js/jquery.dataTables";
import "datatables.net-buttons/js/dataTables.buttons.min";
import jsZip from "jszip";
import "pdfmake/build/vfs_fonts";
import "pdfmake/build/pdfmake.min";
import "datatables.net-buttons/js/buttons.print.min";
import "datatables.net-buttons/js/buttons.flash.min";
import "datatables.net-buttons/js/buttons.html5.min";
import store from "../store";
import token from "../../users/store";
import Axios from "axios";
import GoBackButton from "../../../components/GoBackButton.vue";
import Form from "./components/Form.vue";
import General from "./components/General.vue";
import Document from "./components/Documents.vue";
import Business from "./components/Business.vue";
import { baseApiUrl } from "../../../global";

window.JSZip = jsZip;

Axios.defaults.baseURL = baseApiUrl;

export default {
  components: {
    GoBackButton,
    Form,
    General,
    Business,
    Document,
  },
  name: "Settings",
  data() {
    return {
      credit_types: [],
      loading: false,
      accounts: [],
    };
  },
  methods: {
    getCreditTypes() {
      this.loading = true;
      Axios.get("/credit_types", {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.credit_types = response.data.credit_types;
          this.loading = false;
          $(".odd").html("");
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    getDocuments() {
      this.$refs.documents.getDocuments();
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
    deleteCustomer(id) {
      this.$swal
        .fire({
          title: "Tem certeza?",
          text: "Não vai poder reverter esta acção!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, Eliminar!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            Axios.delete(`/credit_types/${id}`, {
              headers: { Authorization: `Bearer ${token.state.token}` },
            })
              .then((response) => {
                this.getCreditTypes();
                this.$swal.fire("Eliminado!", response.data.success, "success");
              })
              .catch((error) => {
                this.showAlert(error.response.data.error, "error");
              });
          }
        });
    },

    editCreditType(id) {
      this.$store.dispatch("setCreditTypeEditingId", id);
      this.$store.dispatch("setCreditTypeActionPerform", false);
      Axios.get(`/credit_types/${id}`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.loading = false;
          this.$refs.creditType.setFormData(response.data);
        })
        .catch((error) => {
          console.log("Processing...");
        });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.card {
  min-height: 60vh !important;
}
</style>