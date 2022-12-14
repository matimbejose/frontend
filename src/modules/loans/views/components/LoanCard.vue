<template>
  <div class="row">
    <div class="col-6">
      <label class="text-primary" for="manager">Gestor:</label>
      <p class="h6">{{ loan.manager }}</p>
      <label class="text-primary" for="montante">Data do Empréstimo:</label>
      <p class="h6">{{ readableDate(loan.created_at) }}</p>
      <label class="text-primary" for="montante">Tipo de Crédito:</label>
      <p class="h6">{{ loan.credit_type_name }}</p>
      <label class="text-primary" for="montante">Montante:</label>
      <p class="h6">{{ numberFormat(loan.amount) }}</p>
      <label class="text-primary" for="montante">Juros de Mora (%):</label>
      <p class="h6">{{ loan.monthly_installment }}</p>
    </div>
    <div class="col-6">
      <label class="text-primary" for="montante">Maturidade:</label>
      <p class="h6">{{ loan.maturity }} Meses</p>
      <label class="text-primary" for="montante">Valor das Garantias:</label>
      <p class="h6">{{ numberFormat(total_warranties) }}</p>
      <label class="text-primary" for="montante">Estado:</label><br />
      <small class="badge badge-success" v-if="loan.status === 'requested'">{{
        "SOLICITADO"
      }}</small>
      <small class="badge badge-success" v-if="loan.status === 'approved'">{{
        "APROVADO"
      }}</small>
      <small class="badge badge-danger" v-if="loan.status === 'disapproved'">{{
        "DESAPROVADO"
      }}</small>
      <small class="badge badge-success" v-if="loan.status === 'disbursed'">{{
        "DESEMBOLSADO"
      }}</small>
      <small class="badge badge-warning" v-if="loan.status === 'refunded'">{{
        "REEMBOOLSADO"
      }}</small>
      <small
        class="badge badge-warning"
        v-if="loan.status === 'restructured'"
        >{{ "RESTRUTURADO" }}</small
      >
      <small class="badge badge-danger" v-if="loan.status === 'canceled'">{{
        "ABATIDO"
      }}</small>
      <small class="badge badge-success" v-if="loan.status === 'finished'">{{
        "FINALIZADO"
      }}</small
      ><br />
      <!-- <div class="col-6"> -->
      <router-link
        class="btn btn-info btn-xs mt-3"
        :to="'/loans/agreement/' + loan.id"
        ><i class="fas fa-file-pdf"></i> Visualizar Contrato</router-link
      >
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["loan", "total_warranties"],
  methods: {
    readableDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    numberFormat(num) {
      if (!isNaN(num)) {
        let number = parseFloat(num);
        return number
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$& ")
          .replace(".", ",");
      } else {
        return 0.0;
      }
    },
  },
};
</script>