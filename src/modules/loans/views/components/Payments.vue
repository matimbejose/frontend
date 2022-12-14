<template>
  <div class="col-12">
    <table id="unit-table" class="table table-sm table-hover">
      <thead>
        <tr class="text-uppercase font-weight-normal">
          <th>Descrição</th>
          <th>Data Agendada</th>
          <th class="text-right">Receita mensal</th>
          <th class="text-right">Receita fixa</th>
          <th class="text-center">Estado</th>
          <th class="text-right">Juros de mora</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(payment, i) in payments" :key="i">
          <td class="text-uppercase font-weight-bold text-success">
            {{ payment.description }}
          </td>
          <td>{{ formatDate(payment.scheduled_date) }}</td>
          <td class="text-right">{{ payment.total_monthly }}</td>
          <td class="text-right">{{ payment.fixed_monthly }}</td>
          <td class="text-center">
            <small
              class="badge badge-success text-light"
              v-if="payment.loan_transaction"
              >{{ "PAGO" }}</small
            >
            <small class="badge badge-warning text-light" v-else>{{
              "PENDENTE"
            }}</small>
          </td>
          <td class="text-right">{{ payment.delay_fees }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Payments",
  props: ["payments"],
  emits: ["remove-warranty"],
  data() {
    return {
      errorsValidation: {},
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY");
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
    removeWarranty(i) {
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
            this.$emit("remove-warranty", i);
            this.$swal.fire(
              "Eliminado!",
              "Garantia removida da lista!",
              "success"
            );
          }
        });
    },
  },
};
</script>
<style >
</style>
