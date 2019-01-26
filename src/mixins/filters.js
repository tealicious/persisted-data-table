var moment = require("moment");
export default {
  methods: {
    formatDate(value) {
      if (!value) return "";
      return moment(value).format("M/D/YY");
    },
    formatAmount(value) {
      if (!value) return "";
      value = value.toString();
      if (value.includes("-")) {
        return value.replace(/-/g, "-$");
      }
      return `$${value}`;
    },
    formatID(value) {
      if (!value) return "";
      return value.substring(0, 9 - 1) + "...";
    }
  }
};
