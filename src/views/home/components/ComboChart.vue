
<template>
  <div>
    <Chart type="bar" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import Chart from "primevue/chart";

export default {
  components: { Chart },
  data() {
    return {
      chartData: {
        labels: [
          "Janeiro",
          "Fevereiro",
          "March",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
        ],
        datasets: [
          {
            type: "bar",
            label: "Pago",
            backgroundColor: "#66BB6A",
            data: [0, 0, 0, 0, 0, 0, 0],
            borderColor: "white",
            borderWidth: 2,
          },
          {
            type: "bar",
            label: "Em Mora",
            backgroundColor: "#FFA726",
            data: [0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },
      chartOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#495057",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
          y: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
        },
      },
    };
  },
};
</script>