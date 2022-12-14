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
          <div class="col-12">
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
              <div class="card-body">
                <div class="row">
                  <div class="col-10">
                    <div class="form-group">
                      <input
                        type="text"
                        v-model="formData.description"
                        class="form-control form-control-sm rounded-0"
                        placeholder="Ex: Contrato padrao"
                      />
                    </div>
                  </div>
                  <div class="col-2">
                    <button
                      type="button"
                      :disabled="loading"
                      @click="save()"
                      class="btn btn-success btn-block mr-1 btn-sm"
                    >
                      <i class="fas fa-save"></i> Gravar
                    </button>
                  </div>
                </div>
                <Editor
                  v-model="formData.content"
                  editorStyle="height: 620px"
                />
              </div>
              <!-- /.card-body -->
            </div>
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
import "../../../assets/css/style.css";
import token from "../../users/store";
import Axios from "axios";
import GoBackButton from "../../../components/GoBackButton.vue";
import { baseApiUrl } from "../../../global";
import Editor from "primevue/editor";

Axios.defaults.baseURL = baseApiUrl;

export default {
  props: ["id"],
  components: {
    GoBackButton,
    Editor,
  },
  name: "NewDocument",
  data() {
    return {
      credit_types: [],
      loading: false,
      document: {},
      formData: { description: "", content: "", id: 0 },
    };
  },
  methods: {
    save() {
      this.loading = true;
      if (this.formData === 0) {
        Axios.post("/settings/documents", this.formData, {
          headers: { Authorization: `Bearer ${token.state.token}` },
        })
          .then((response) => {
            this.showAlert(response.data.success, "success");
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            this.showAlert("Erro de processamento", "error");
          });
      } else {
        Axios.put(`/settings/documents/${this.formData.id}`, this.formData, {
          headers: { Authorization: `Bearer ${token.state.token}` },
        })
          .then((response) => {
            this.showAlert(response.data.success, "success");
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            this.showAlert("Erro de processamento", "error");
          });
      }
    },
    getDocument(id) {
      this.loading = true;
      Axios.get(`/settings/documents/${id}`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.document = response.data;
          this.formData = { ...this.document };
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    showAlert(msg, icon) {
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        type: "success",
        title: msg,
        icon,
      });
    },
  },
  mounted() {
    const id = this.id;

    if (id) {
      this.getDocument(id);
      this.formData.id = id;
    }
  },
};
</script>

<style scoped>
.card {
  min-height: 60vh !important;
}
</style>