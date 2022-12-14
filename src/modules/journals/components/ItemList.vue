<template>
  <span>
    <tr class="pointer" v-for="(item, index) in d_list.data" :key="index">
      <span v-if="item.total != 0 || item.prev_total != 0">
        <th
          class="p-left-th th-padd text-no-bold collapsed"
          data-toggle="collapse"
          :data-target="'#' + dropIds + index"
          aria-expanded="false"
          :aria-controls="dropIds + index"
        >
          <div class="accordion m-0 p-0" :id="'sub' + dropIds + index">
            <div class="card m-0 p-0">
              <div class="card-header m-0 p-0" id="headingTwo">
                <h5 class="mb-0">
                  <span>{{ item.name }}</span>
                  <div v-if="item.accounts.length != 0" class="pull-right">
                    <i class="glyphicon glyphicon-triangle-bottom"></i>
                  </div>
                </h5>
              </div>
              <div
                :id="dropIds + index"
                class="collapse"
                aria-labelledby="headingTwo"
                :data-parent="`#sub${dropIds}${index}`"
              >
                <div class="card-body">
                  <table class="table table-hover">
                    <tbody>
                      <tr
                        v-for="(item, index) in item.accounts"
                        class="p-1"
                        :key="index"
                      >
                        <span
                          v-if="
                            item.balance > 0 ||
                            item.prev_balance > 0 ||
                            item.balance < 0 ||
                            item.prev_balance < 0
                          "
                        >
                          <th
                            class="p-left-th th-padd text-no-bold"
                            v-html="cleanUUID(item.uuid) + '-' + item.name"
                          ></th>
                          <td v-if="!item.prev_balance"></td>
                          <td v-if="item.prev_balance">
                            {{ numberFormat(item.prev_balance) }}
                          </td>
                          <td>{{ numberFormat(item.balance) }}</td>
                        </span>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </th>
        <td v-if="!item.prev_total"></td>
        <td v-if="item.prev_total">{{ numberFormat(item.prev_total) }}</td>
        <td>{{ numberFormat(item.total) }}</td>
      </span>
    </tr>
  </span>
</template>

<script>
export default {
  props: ["dataList", "refer"],
  name: "ItemList",
  data() {
    return {
      d_list: this.dataList,
      identifier: this.refer,
      dropIds: this.refer,
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
        return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      } else {
        return "0.0";
      }
    },
  },
  mounted() {},
};
</script>

<style >
</style>
