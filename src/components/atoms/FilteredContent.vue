<template>
  <component :is="tag" v-if="!filteredLonger" v-tooltip="content">{{dataFilter}}</component>
  <component :is="tag" v-else>{{dataFilter}}</component>
</template>
<script>
import filters from "@mixins/filters.js";
export default {
  mixins: [filters],
  props: {
    filter: {
      type: String,
      default: ""
    },
    content: {
      default: ""
    },
    tag: {
      type: String,
      default: "span"
    }
  },
  computed: {
    dataFilter() {
      if (this.filter.length != 0) {
        if (this[this.filter]) {
          //check if a filter method is present for a given value
          return this[this.filter](this.content);
        } else {
          return this.content;
        }
      } else return this.content;
    },
    filteredLonger() {
      return this.dataFilter.length >= this.content.length ? true : false;
    }
  }
};
</script>