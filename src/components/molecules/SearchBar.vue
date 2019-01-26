<template>
  <input v-model="value.textFilter" type="text" class="form-control searchbar" placeholder="Search...">
</template>
<script>
export default {
  props: ["value"],
  watch: {
    value: function(value) {
      this.$emit("input", value);
    }
  }
};
</script>
<style scoped>
.page-row {
  z-index: 1;
}
</style>