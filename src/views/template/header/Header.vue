<template>
  <nav
    class="main-header navbar navbar-expand bg-navy pb-0"
    style="margin-left: 0 !important"
  >
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a
          class="nav-link text-white"
          data-widget="pushmenu"
          href="#"
          role="button"
          ><i class="fas fa-bars"></i
        ></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <div class="user-panel d-flex">
          <div class="image">
            <img
              src="/assets/img/user.png"
              class="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div class="info">
            <a href="#" class="d-block text-light">ADMINISTRATOR</a>
          </div>
        </div>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a
          class="nav-link text-white"
          data-widget="fullscreen"
          href="#"
          role="button"
        >
          <i class="fas fa-expand-arrows-alt"></i>
        </a>
      </li>
      <li class="nav-item">
        <router-link class="nav-link text-white" :to="{ name: 'logout' }">
          <i class="fas fa-power-off"></i>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Header",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
