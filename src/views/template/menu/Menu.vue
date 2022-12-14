<template>
  <aside
    class="main-sidebar ml-1 sidebar-dark-primary bg-navy elevation-4"
    style="top: 58px; min-height: 80% !important"
  >
    <!-- Brand Logo -->
    <router-link to="/" class="brand-link">
      <img
        src="../../../assets/img/logo.png"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: 0.8"
      />
      <span class="brand-text font-weight-light">MICRO-CRÉDITOv1</span>
    </router-link>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->

      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <Label text="MICRO-CRÉDITO" />
          <menu-item
            v-show="authorities.includes(authTypes.DASHBOARD_VIEW)"
            text="Dashboard"
            icon="fas fa-chart-line nav-icon"
            link="dashboard"
          />
          <menu-list
            v-show="
              authorities.includes(authTypes.CUSTOMER_VIEW) ||
              authorities.includes(authTypes.MANAGER_VIEW) ||
              authorities.includes(authTypes.CREDIT_TYPE_VIEW)
            "
            title="Cadastros"
            icon="fas fa-book-open nav-icon"
            :items="[
              {
                text: 'Membros',
                icon: 'arrows-alt-v',
                link: 'customers',
                authority: authTypes.CUSTOMER_VIEW,
              },
              {
                text: 'Gestores',
                icon: 'arrows-alt-v',
                link: 'managers',
                authority: authTypes.MANAGER_VIEW,
              },
              {
                text: 'Taxas',
                icon: 'arrows-alt-v',
                link: 'credit_types',
                authority: authTypes.CREDIT_TYPE_VIEW,
              },
            ]"
          />

          <menu-list
            title="Empréstimos"
            v-show="authorities.includes(authTypes.LOAN_VIEW)"
            icon="fas fa-hand-holding-usd nav-icon"
            :items="[
              {
                text: 'Em vigor',
                icon: 'arrows-alt-h',
                link: 'loans',
                authority: authTypes.LOAN_VIEW,
              },
              {
                text: 'Simulação/Solicitação',
                icon: 'arrows-alt-h',
                link: 'loans/create',
                authority: authTypes.LOAN_SIMULATE,
              },
            ]"
          />
          <menu-list
            title="Banco"
            icon="fas fa-money-bill-alt nav-icon"
            :items="[
              {
                text: 'Reembolsos',
                icon: 'arrows-alt-h',
                link: 'payments',
                authority: authTypes.LOAN_TRANSACTION_VIEW,
              },
            ]"
          />
          <menu-list
            v-if="authorities.includes(authTypes.ACCOUNT_VIEW)"
            title="Contabilidade"
            icon="fas fa-calculator nav-icon"
            :items="[
              {
                authority: authTypes.ACCOUNT_VIEW,
                text: 'Dashboard',
                icon: 'arrows-alt-h',
                link: 'accounting/dashboard',
              },
              {
                authority: authTypes.ACCOUNT_VIEW,
                text: 'Extractos de conta',
                icon: 'arrows-alt-h',
                link: 'extracts',
              },
              {
                text: 'Plano de contas',
                icon: 'arrows-alt-h',
                link: 'pgc',
                authority: authTypes.ACCOUNT_VIEW,
              },
              {
                text: 'Lançamentos',
                icon: 'arrows-alt-h',
                link: 'journals_casts',
                authority: authTypes.ACCOUNT_VIEW,
              },
              // {text: 'Ver Lançamentos', icon: 'arrows-alt-h', link: 'loans/create'},
            ]"
          />

          <!-- <menu-list title="Pagamentos" icon="fas fa-money-bill-alt nav-icon" :items="[
              {text: 'Membros', icon: 'arrows-alt-h', link: 'customers'},
          ]"/> -->
          <menu-item
            v-show="authorities.includes(authTypes.LOAN_VIEW)"
            text="Relatórios"
            icon="fas fa-chart-bar nav-icon"
            link="loans/reports"
          />

          <Label
            text="ADMINISTRADOR"
            v-if="
              authorities.includes(authTypes.ROLE_VIEW) ||
              authorities.includes(authTypes.USER_VIEW)
            "
          />
          <menu-list
            v-if="
              authorities.includes(authTypes.ROLE_VIEW) ||
              authorities.includes(authTypes.USER_VIEW)
            "
            title="Controle de acesso"
            icon="fas fa-users nav-icon"
            :items="[
              {
                text: 'Cargos',
                icon: 'arrows-alt-v',
                link: 'roles',
                authority: authTypes.ROLE_VIEW,
              },
              {
                text: 'Utilizadores',
                icon: 'arrows-alt-v',
                link: 'users',
                authority: authTypes.USER_VIEW,
              },
            ]"
          />
          <menu-item
            v-if="authorities.includes(authTypes.SETTINGS_VIEW)"
            text="Configurações"
            icon="fas fa-cog fa-spin nav-icon"
            link="settings"
          />
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
import MenuItem from "./components/MenuItem";
import MenuList from "./components/MenuList";
import Label from "./components/Label.vue";
import store from "../../../modules/users/store";
import { roles } from "../../../global";
import { authorities } from "../../../global";

export default {
  data() {
    return {
      authorities: store.state.authorities,
      l_roles: roles,
      authTypes: authorities,
    };
  },
  name: "Menu",
  components: { MenuItem, Label, MenuList },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
 