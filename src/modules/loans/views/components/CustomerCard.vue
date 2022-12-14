<template>
  <div class="card card-primary card-outline">
    <div class="card-body box-profile">
      <div class="text-center">
        <img
          class="profile-user-img img-fluid img-circle"
          src="/assets/img/user.png"
          alt="User profile picture"
        />
      </div>

      <h6 class="text-center">{{ customer.name }}</h6>

      <p class="text-muted text-center">{{ customer.address }}</p>

      <ul class="list-group list-group-unbordered">
        <li class="list-group-item">
          <b>Idade</b> <a class="float-right">{{ getAge() }}</a>
        </li>
        <li class="list-group-item">
          <b>Residência</b>
          <a v-if="customer.residence == 'own'" class="float-right">Própria</a>
          <a v-if="customer.residence == 'rent'" class="float-right">Aluguel</a>
        </li>
        <li class="list-group-item">
          <b>Residência</b>
          <a v-if="customer.activity == 'employed'" class="float-right"
            >Trabalhador</a
          >
          <a v-if="customer.activity == 'own'" class="float-right"
            >Conta Própria</a
          >
        </li>
        <li class="list-group-item">
          <b>Telefone</b> <a class="float-right">{{ customer.phone }}</a>
        </li>
        <li v-if="customer.doc_type == 'id'" class="list-group-item">
          <b>BI</b> <a class="float-right">{{ customer.doc_nr }}</a>
        </li>
        <li v-if="customer.doc_type == 'passport'" class="list-group-item">
          <b>Passaporte</b> <a class="float-right">{{ customer.doc_nr }}</a>
        </li>
        <li v-if="customer.doc_type == 'dire'" class="list-group-item">
          <b>Carta de Condução</b>
          <a class="float-right">{{ customer.doc_nr }}</a>
        </li>
      </ul>
    </div>
    <!-- /.card-body -->
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: ["customer"],
  methods: {
    getAge() {
      return moment().diff(this.customer.birthdate, "years", false);
    },
  },
};
</script>