<template>
  <data-table v-if="!loadingRows"></data-table>
</template>
<script>
import DataTable from "@/views/DataTable";
import quiz from "@/quiz";
export default {
  components: { DataTable },
  computed: {
    loadingRows() {
      return this.$store.getters.loading;
    }
  },
  created() {
    this.$store.dispatch("LOAD");
    console.log(quiz().q1, quiz().q2);
  }
};
</script>