<template>
  <div class="elevation-1 sidebar-light-primary p-3 transparent">
    <div class="clearfix">
      <span class="text-uppercase float-left">Extractos de conta</span>
      <div class="float-right mb-2">
        <GoBackButton :length="-1" />
      </div>
    </div>
    <hr class="pt-0 pb-1 mt-0 mb-1" />
    <div class="card">
      <!-- /.card-header -->
      <div class="card-body p-2">
        <div class="row">
          <div class="col-4">
            <div class="form-group rounded-0">
              <label class="font-weight-normal" for="test"
                >Contas do PGC: * <small class="text-danger"></small
              ></label>
              <select
                class="form-control select-acc rounded-0 select2"
                style="width: 100%"
              >
                <option value="">Pesquisar conta</option>
                <option v-for="(item, i) in []" value="" :key="i"></option>
              </select>
            </div>
          </div>

          <div class="col-3">
            <div class="form-group" style="position: relative">
              <label class="font-weight-normal" for="test"
                >De: * <small class="text-danger"></small
              ></label>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text rounded-0"
                    ><i class="fas fa-calendar"></i
                  ></span>
                </div>
                <v-date-picker
                  v-model="formData.from"
                  :model-config="modelConfig"
                >
                  <template v-slot="{ inputValue, inputEvents }">
                    <input
                      class="bg-white border px-2 py-1 rounded"
                      :value="inputValue"
                      v-on="inputEvents"
                    />
                  </template>
                </v-date-picker>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="form-group">
              <label class="font-weight-normal" for="test"
                >Para: * <small class="text-danger"></small
              ></label>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text rounded-0"
                    ><i class="fas fa-calendar"></i
                  ></span>
                </div>
                <v-date-picker
                  v-model="formData.to"
                  :model-config="modelConfig"
                >
                  <template v-slot="{ inputValue, inputEvents }">
                    <input
                      class="bg-white border px-2 py-1 rounded"
                      :value="inputValue"
                      v-on="inputEvents"
                    />
                  </template>
                </v-date-picker>
              </div>
            </div>
          </div>
          <div class="col-2">
            <button
              style="margin-top: 25px"
              @click="filterExtract()"
              class="btn btn-info btn-sm btn-flat"
            >
              <i class="fa fa-filter"></i> Gerar extracto
            </button>
          </div>
        </div>
      </div>
      <!-- /.card-body -->
    </div>
    <div class="card">
      <div class="card-header pl-3 pt-2 pb-2">
        <span class="text-uppercase"> <small>Extracto</small></span>
        <div class="float-right">
          <a href="#"><i class="fas ml-3 fa-sync-alt"></i></a>
        </div>
        <div class="float-right">
          <span data-card-widget="collapse" title="Collapse">
            <i class="fas fa-minus"></i>
          </span>
        </div>
        <div class="float-right">
          <button
            @click="print()"
            class="btn btn-primary text-uppercase mr-1 btn-xs"
          >
            <i class="fas fa-print"></i> Imprimir/PDF
          </button>
        </div>
      </div>
      <div class="card-body" id="extract-print">
        <div class="table-responsive">
          <table
            v-show="showExtract"
            id="extracts"
            class="
              table table-bordered table-sm table-hover
              nowrap
              w-100
              d-print-block d-print-table
            "
            width="100%"
          >
            <thead>
              <tr>
                <th class="text-left">Data</th>
                <th>Código</th>
                <th>Lançamento</th>
                <th>Descrição</th>
                <th class="table-align-right">Débito</th>
                <th class="table-align-right">Crédito</th>
                <!-- <th>Estado</th> -->
                <th class="table-align-right">Balanço</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="3">
                  <strong>Saldos anteriores (Débito, Crédito e Saldo)</strong>
                </td>
                <td class="table-align-right">
                  <strong>{{ numberFormat(extractList.debit_initial) }}</strong>
                </td>
                <td class="table-align-right">
                  <strong>{{
                    numberFormat(extractList.credit_initial)
                  }}</strong>
                </td>
                <!-- <td>{{ extract.ref_no }}</td> -->
                <td class="table-align-right">
                  <strong>{{
                    numberFormat(extractList.balance_initial)
                  }}</strong>
                </td>
              </tr>
              <tr
                :key="extract.invoice_ref"
                v-for="extract in extractList.extracts"
              >
                <td class="table-align-left">{{ extract.date }}</td>
                <td class="table-align-left">{{ extract.code }}</td>
                <td class="table-align-left">{{ extract.invoice_ref }}</td>
                <td class="table-align-left">{{ extract.description }}</td>
                <!-- <td>{{ extract.ref_no }}</td> -->
                <td class="table-align-right">
                  {{ numberFormat(extract.debit) }}
                </td>

                <td class="table-align-right">
                  {{ numberFormat(extract.credit) }}
                </td>

                <td
                  :class="
                    extract.f_balance < 0
                      ? 'text-red table-align-right'
                      : 'table-align-right'
                  "
                >
                  {{ numberFormat(extract.f_balance) }}
                </td>
              </tr>
              <tr class="table-align-right">
                <td class="table-align-right" colspan="4">
                  <strong>Total Período</strong>
                </td>
                <td>
                  <strong>{{ numberFormat(extractList.debit) }} </strong>
                </td>
                <td class="table-align-right">
                  <strong> {{ numberFormat(extractList.credit) }} </strong>
                </td>
                <td class="table-align-right">
                  <strong>{{ numberFormat(extractList.balance) }} </strong>
                </td>
              </tr>
              <tr class="table-align-right">
                <td colspan="4"><strong>Total Acumulado</strong></td>
                <td class="table-align-right">
                  <strong> {{ numberFormat(extractList.a_debit) }}</strong>
                </td>
                <td class="table-align-right">
                  <strong> {{ numberFormat(extractList.a_credit) }}</strong>
                </td>
                <td class="table-align-right">
                  <strong> {{ numberFormat(extractList.a_balance) }}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- /.card-body -->
    </div>
    <!-- /.content -->
  </div>
</template>

<script>
import $ from "jquery";
import "select2";
import store from "../store";
import Axios from "axios";
import moment from "moment-timezone";
import print from "print-js";

import GoBackButton from "../../../components/GoBackButton.vue";

import token from "../../users/store";
import { baseApiUrl } from "../../../global";

Axios.defaults.baseURL = baseApiUrl;

export default {
  name: "Extracts",
  components: {
    GoBackButton,
  },
  data() {
    return {
      loading: false,
      extractList: [],
      showExtract: false,
      account_name: "",
      show: false,
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD", // Uses 'iso' if missing
      },
      formData: {
        account_id: "",
        from: moment(new Date()).subtract(1, "month").format("YYYY-MM-DD"),
        to: moment(new Date()).format("YYYY-MM-DD"),
      },
      accounts: [],
    };
  },
  methods: {
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
    print() {
      print({
        printable: "extract-print",
        type: "html",
      });
    },
    cleanUUID(uuid) {
      if (uuid) {
        return uuid.split(".").join("");
      }
    },
    showAlert(msg, type) {
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        title: msg,
        icon: type,
      });
    },
    getAccounts() {
      this.loading = true;
      Axios.get(`/accounts/extracts`, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          this.accounts = response.data.accounts;
          this.formData.to = moment(response.data.lastdate).format(
            "YYYY-MM-DD"
          );
          this.loading = false;
        })
        .catch((error) => {
          this.showAlert(error.response.error, "error");
        });
    },
    filterExtract() {
      this.loading = true;
      Axios.post(`/accounts/extractacc`, this.formData, {
        headers: { Authorization: `Bearer ${token.state.token}` },
      })
        .then((response) => {
          if (response.data.error) {
            this.loading = false;
            return this.showAlert(response.data.error, "error");
          } else {
            this.show = true;
            this.extractList = response.data;
            this.showExtract = true;
            this.loading = false;
          }
        })
        .catch((e) => {
          this.loading = false;
          this.showAlert(e.response.data.error);
        });
    },
  },
  mounted() {
    this.getAccounts();
    const self = this;
    $(".select-acc").select2({
      minimumResultsForSearch: 2,
      minimumInputLength: 1,
      theme: "bootstrap4",
      placeholder: "Pesquisar conta...",
      ajax: {
        url: `${baseApiUrl}/accounts/search`,
        headers: { Authorization: `Bearer ${token.state.token}` },
        dataType: "json",
        delay: 220,
        processResults: function (data) {
          return {
            results: $.map(data, function (data) {
              return {
                text: `${self.cleanUUID(data.uuid)} - ${data.name}`,
                id: data.id,
              };
            }),
          };
        },
        cache: true,
      },
    });
    $(".select-acc").change(function () {
      self.formData.account_id = $(this).find("option:selected").val();
    });
  },
};
</script>
<style src="../../../../public/assets/plugins/select2/css/select2.min.css"></style>
<style src="../../../../node_modules/@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.min.css"></style>
<style scoped>
.select2-container--default
  .select2-selection--single
  .select2-selection__rendered {
  margin-top: -9px !important;
}
.btn-height {
  height: 30px !important;
}
</style>