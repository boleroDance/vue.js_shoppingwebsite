<template>
  <div class="param-info">
    <table class="info-size" v-for="(table, index) in paramInfo.rule.tables" :key="index">
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>

    <table></table>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }

}
</script>

<style scoped>
   .param-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }
  .param-info table {
    width: 100%;
    border-collapse: collapse;
  }
  .param-info table tr {
    height: 42px;
  }

  .param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .info-param {
    border-top: 1px solid rgba(0,0,0,.1);
  }
</style>