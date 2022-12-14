<template>
  <div>
    <Chart type="pie" :data="chartData" :options="lightOptions" />
  </div>
</template>

<script>
import Chart from "primevue/chart";

export default {
  components: { Chart },
  props: ["total", "paid", "delayed"],
  data() {
    return {
      chartData: {
        labels: ["Total", "Pago", "Em Mora"],
        datasets: [
          {
            data: [
              parseInt(this.total),
              parseInt(this.paid),
              parseInt(this.delayed),
            ],
            backgroundColor: ["#42A5F5", "#66BB6A", "#dc3545"],
            hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
          },
        ],
      },
      lightOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#495057",
            },
          },
        },
      },
    };
  },
};
</script>