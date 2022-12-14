<template>
  <div style="background-color: #cccccc" class="hold-transition login-page">
    <div class="login-box">
      <!-- /.login-logo -->
      <div class="card pt-4 pb-4 rounded-0" style="width: 280px !important">
        <div class="card-body login-card-body">
          <p class="login-box-msg">Bem vindo ao Gestão de Microcrédito</p>

          <div class="row text-center">
            <!-- <img style="margin: 0 auto" src="img/user.png" width="100" class="img-circle" alt="User Image"> -->
          </div>
          <br />
          <div v-if="successMessage" class="alert alert-success">
            {{ successMessage }}
          </div>
          <div v-if="serverError" class="alert alert-danger">
            {{ serverError }}
          </div>
          <form action="#" @submit.prevent="login">
            <div class="input-group mb-3">
              <input
                type="username"
                class="form-control form-control-sm rounded-0"
                v-model="username"
                placeholder="Nome de utilizador"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input
                type="password"
                class="form-control form-control-sm rounded-0"
                v-model="password"
                placeholder="Password"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-8">
                <div class="icheck-primary">
                  <input class="mr-2" type="checkbox" id="remember" />
                  <label for="remember"> Lembrar Me </label>
                </div>
              </div>
              <!-- /.col -->

              <!-- /.col -->
            </div>
            <div class="row">
              <div class="col-12">
                <button
                  :disabled="loading"
                  type="submit"
                  class="btn btn-info btn-sm btn-block"
                >
                  Entrar
                </button>
                <i class="fa fa-circle-o-notch fa-spin" v-if="loading"></i>
              </div>
            </div>
          </form>

          <!-- /.social-auth-links -->
        </div>
        <!-- /.login-card-body -->
      </div>
    </div>
    <!-- /.login-box -->
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      serverError: "",
      successMessage: "",
      loading: false,
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$store
        .dispatch("retrieveToken", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          this.loading = false;
          this.$router.go();
          //location.href = "dashboard";
          //this.$router.push({ name: "dashboard", replace: true });
        })
        .catch((error) => {
          this.loading = false;
          this.showErrorAlert(error.response.data.error);
          this.password = "";
          this.successMessage = "";
        });
    },
    showErrorAlert(msg) {
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
  },
  mounted() {},
};

// $('#example2').DataTable( {
//     dom: 'Bfrtip',
//     buttons: [
//         'copy', 'excel', 'pdf'
//     ]
// } );
</script>

<style>
</style>