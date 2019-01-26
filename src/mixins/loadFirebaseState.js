export default {
  data() {
    return {
      columns: this.$store.state.columns,
      rows: this.$store.state.rows
    };
  },
  computed: {
    totalRows() {
      return this.rows.length;
    },
    rowCountOptions() {
      return [
        Math.floor(this.totalRows / 10),
        Math.floor(this.totalRows / 4),
        Math.floor(this.totalRows / 2),
        Math.floor(this.totalRows)
      ];
    }
  },
  methods: {
    save() {
      this.$store.dispatch("SAVE", this.rows);
    }
  }
};
