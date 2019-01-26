<template>
  <div class="row page-row pt-3">
    <div class="col-12 col-lg-3">
      <div class="input-group mb-3">
        <select v-model="value.rowsPerPage" class="custom-select">
          <option v-for="(option, i) in rowsToShow" :key="i" :value="option">{{option}}</option>
        </select>
        <div class="input-group-append">
          <label class="input-group-text" for="inputGroupSelect01">Rows</label>
        </div>
        <button v-if="!saving" type="button" class="btn btn-danger ml-2" @click="save" @keydown.13="save">Save</button>
        <button v-else type="button" class="btn btn-danger ml-2" disabled>
          <font-awesome-icon icon="spinner" pulse/>
        </button>
      </div>
    </div>
    <nav class="col-12 col-lg-9 searchwrap">
      <search-bar v-model="value"/>
      <ul class="pagination" v-if="pagesAvailable > 1">
        <template v-if="pagesAvailable > 1">
          <li class="page-item">
            <button
              class="page-link"
              href="#"
              @click.prevent="value.currentPage = value.currentPage  + -1"
              :disabled="value.currentPage == 1"
            >Prev</button>
          </li>
          <li v-for="(p, i) in pagesAvailable" class="page-item" :class="{ active : p == value.currentPage }" :key="i">
            <a href="#" class="page-link" @click.prevent="value.currentPage = p">{{ p }}</a>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              href="#"
              @click.prevent="value.currentPage = value.currentPage  + 1"
              :disabled="value.currentPage == pagesAvailable"
            >Next</button>
          </li>
        </template>
      </ul>
    </nav>
    <hr>
  </div>
</template>
<script>
import SearchBar from "@molecules/SearchBar.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  components: {
    FontAwesomeIcon,
    SearchBar
  },
  props: ["value", "rowsToShow", "pagesAvailable"],
  watch: {
    value: function(value) {
      this.$emit("input", value);
    }
  },
  computed: {
    saving() {
      return this.$store.getters.saving;
    }
  },
  methods: {
    save() {
      this.$emit("saved");
    }
  }
};
</script>
<style scoped>
button {
  width: 70px;
}
hr {
  width: 100%;
  margin: 0;
  margin: 0 1rem;
}
</style>