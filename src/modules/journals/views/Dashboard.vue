<template>
  <div class="row">
    <div class="col-6 p-1">
      <TreeTable :style="'font-size: 11px; '" :value="btable">
        <Column
          :headerClass="'py-2 px-4'"
          :bodyClass="'p-1'"
          field="name"
          :style="'font-size: 10px; '"
          header="Activos - Conta"
          :expander="true"
        ></Column>
        <Column
          :headerClass="'text-right py-2 '"
          :bodyClass="'text-right p-1'"
          :style="'font-size: 10px; '"
          field="total"
          header="Saldo (MT)"
        ></Column>
      </TreeTable>
    </div>
    <!--  ############################################# DEMONSTRACAO DE RESULTADOS #################################################### -->
    <div class="col-6 p-1">
      <TreeTable :style="'font-size: 11px; '" :value="drtable">
        <Column
          :headerClass="'py-1 px-4'"
          :bodyClass="'p-1'"
          field="name"
          :style="'font-size: 10px; '"
          header="Receitas - Conta"
          :expander="true"
        ></Column>
        <Column
          :headerClass="'text-right py-1 '"
          :bodyClass="'text-right p-1'"
          :style="'font-size: 10px; '"
          field="total"
          header="Saldo (MT)"
        ></Column>
      </TreeTable>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "select2";
import moment from "moment";
import Axios from "axios";
import token from "../../users/store";
import { baseApiUrl } from "../../../global";
import TreeTable from "primevue/treetable";
import Column from "primevue/column";

Axios.defaults.baseURL = baseApiUrl;

export default {
  components: { TreeTable, Column },
  name: "DashboardAcc",
  data() {
    return {
      btable: [],
      drtable: [],
      dataList: {
        class_1: { data: [] },
        class_2: {},
        class_3: {},
        class_4: {},
        class_5: {},
        class_6: {},
        class_7: {},
        class_8: {},
        class_3_passives: {},
        class_3_actives: {},
        class_4_passives: {},
        class_4_actives: {},
      },
      currentYear: moment(new Date()).year(),
    };
  },
  methods: {
    cleanUUID(uuid) {
      return uuid.split(".").join("");
    },
    daySplited: (date) => date.split("-")[0],
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
    formatChildren(accounts, key) {
      const childs = [];
      accounts.map((item, i) => {
        childs[i] = {
          key: `${key}-${i}`,
          data: {
            name: item.name,
            total: this.numberFormat(item.total),
          },
        };
      });
      return childs;
    },
    dashboard() {
      Axios.get(`/accounting/dashboard`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      }).then((response) => {
        this.dataList = response.data;
        this.drTableFormat(this.dataList);
        const actives = [
          ...response.data.class_1.data,
          ...response.data.class_2.data,
          ...response.data.class_3_actives.data,
          ...response.data.class_4_actives.data,
        ];
        actives.map((item, index) =>
          this.btable.push({
            key: `${index}`,
            data: {
              name: item.name,
              total: this.numberFormat(item.total),
            },
            children: [...this.formatChildren(item.accounts, index)],
          })
        );
        this.btable.push(
          {
            key: "0-t-1",
            data: {
              name: "Total Activos",
              total: this.numberFormat(this.totalActives()),
            },
          },
          {
            key: "0-p-1",
            data: { name: "FUNDOS Próprios E PASSIVOS".toUpperCase() },
          },
          {
            key: "0-p-2",
            data: { name: " Fundos Próprios" },
          }
        );

        response.data.class_5.data.map((item, index) =>
          this.btable.push({
            key: `${index}-c5`,
            data: {
              name: item.name,
              total: this.numberFormat(item.total),
            },
            children: [...this.formatChildren(item.accounts, index)],
          })
        );
        this.btable.push(
          {
            key: "0-6-rr",
            data: {
              name: "Resultado de regularização",
              total: this.numberFormat(
                this.dataList.class_7.total - this.dataList.class_6.total
              ),
            },
          },
          {
            key: "0-3-rr",
            data: {
              name: "Passivos",
              total: this.numberFormat(
                this.dataList.class_5.total +
                  (this.dataList.class_7.total - this.dataList.class_6.total)
              ),
            },
          }
        );

        const class3_4_passive = [
          ...response.data.class_3_passives.data,
          ...response.data.class_4_passives.data,
        ];
        class3_4_passive.map((item, index) =>
          this.btable.push({
            key: `${index}-fp`,
            data: {
              name: item.name,
              total: this.numberFormat(item.total),
            },
            children: [...this.formatChildren(item.accounts, index)],
          })
        );

        this.btable.push(
          {
            key: "0-2-tfp",
            data: {
              name: "Total dos passivos",
              total: this.numberFormat(this.dataList.class_4_passives.total),
            },
          },
          {
            key: "0-3-tfp",
            data: {
              name: "Total dos Fundos Próprios",
              total: this.numberFormat(this.totalOwnAndPassive()),
            },
          }
        );
      });
    },
    totalPrevActives() {
      return (
        parseFloat(this.dataList.class_1.prev_total) +
        parseFloat(this.dataList.class_2.prev_total) +
        parseFloat(this.dataList.class_3_actives.prev_total) +
        parseFloat(this.dataList.class_4_actives.prev_total)
      );
    },
    totalActives() {
      return (
        parseFloat(this.dataList.class_1.total) +
        parseFloat(this.dataList.class_2.total) +
        parseFloat(this.dataList.class_3_actives.total) +
        parseFloat(this.dataList.class_4_actives.total)
      );
    },
    totalOwnAndPassive() {
      return (
        parseFloat(this.dataList.class_5.total) +
        parseFloat(this.dataList.class_3_passives.total) +
        parseFloat(this.dataList.class_4_passives.total) +
        (parseFloat(this.dataList.class_7.total) -
          parseFloat(this.dataList.class_6.total))
      );
    },
    totalPrevOwnAndPassive() {
      return (
        parseFloat(this.dataList.class_5.prev_total) +
        parseFloat(this.dataList.class_3_passives.prev_total) +
        parseFloat(this.dataList.class_4_passives.prev_total) +
        (parseFloat(this.dataList.class_7.prev_total) -
          parseFloat(this.dataList.class_6.prev_total))
      );
    },
    drTableFormat(dlist) {
      dlist.class_7.data.map((item, index) =>
        this.drtable.push({
          key: `${index}`,
          data: {
            name: item.name,
            total: this.numberFormat(item.total),
          },
          children: [...this.formatChildren(item.accounts, index)],
        })
      );
      this.drtable.push(
        {
          key: "0-1-dr",
          data: {
            name: "Total de receitas",
            total: this.numberFormat(this.dataList.class_7.total),
          },
        },
        {
          key: "0-2-dr",
          data: {
            name: "Gastos e perdas",
          },
        }
      );
      dlist.class_6.data.map((item, index) =>
        this.drtable.push({
          key: `${index}`,
          data: {
            name: item.name,
            total: this.numberFormat(item.total),
          },
          children: [...this.formatChildren(item.accounts, index)],
        })
      );
      this.drtable.push(
        {
          key: "0-3-dr",
          data: {
            name: "Total de gastos e perdas",
            total: this.numberFormat(this.dataList.class_6.total),
          },
        },
        {
          key: "0-4-dr",
          data: {
            name: "Resultado líquido do período",
            total: this.numberFormat(
              this.dataList.class_7.total - this.dataList.class_6.total
            ),
          },
        }
      );
    },
    export() {
      $("table").tableExport();
    },
  },
  mounted() {
    this.dashboard();
    $(".select2").select2();
    // this.$store.commit('setTotalActive', this.dataList.total_assets)
    // this.$store.commit('setTotalPassive', this.dataList.total_own_and_passive)
    // $("#dashboard_years").html(
    //   `(${this.dataList.dates.from} - ${this.dataList.dates.to})`
    // );

    const self = this;
    $(".select-account").change(function () {
      // self.export()
      let el = $(this).find("option:selected").val();
      //self.newBalances(el);
    });
  },
};
</script>

<style >
h5 {
  font-size: 11px !important;
}
.bold-text {
  font-weight: bold;
}
.th-padd {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.p-left-th {
  padding-left: 30px !important;
}
.bolder-550 {
  font-weight: 550 !important;
}
.m-0 {
  margin: 0 !important;
}
.p-0 {
  padding: 0 !important;
}

.d-header {
  background-color: #404040 !important;
  color: white !important;
  padding-left: 5px !important;
}

.d-header-sub {
  background-color: #a7a7a7 !important;
  color: rgb(33, 32, 32) !important;
}

.d-header-sub2 {
  background-color: #e8e2e2 !important;
  color: rgb(26, 25, 25) !important;
}

.text-capt {
  text-transform: capitalize !important;
}
</style>
