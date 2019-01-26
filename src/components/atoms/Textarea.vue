<template>
  <textarea type ref="textarea" class="bg-light" @input="handleInput" v-model="text"/>
</template>
<script>
export default {
  props: ["value"],
  data() {
    return {
      text: this.value
    };
  },
  methods: {
    handleInput() {
      this.$emit("input", this.text);
    }
  },
  mounted() {
    this.$refs.textarea.select();
  }
};
</script>