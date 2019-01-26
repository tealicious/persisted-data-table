import FirebaseApi from "@api/FirebaseApi";
import payments from "@/payments";
import { objectValsToString } from "@/consts";

payments.map(payment => {
  payment.Edit = false;
  // too crazy to deal with data type maintenance for a proof of concept app, let's just default to string for now
  return objectValsToString(payment);
});

var columns = [
  ...new Set(
    payments
      .map(payment => {
        return Object.keys(payment);
      })
      .flat()
  )
].map(column => {
  return {
    name: column,
    filter: `format${column.charAt(0).toUpperCase() + column.substr(1)}`
  };
});

const totalRows = payments.length;
export default {
  data() {
    return {
      rowCountOptions: [
        Math.floor(totalRows / 10),
        Math.floor(totalRows / 4),
        Math.floor(totalRows / 2),
        Math.floor(totalRows)
      ],
      valueToEdit: "",
      columns: columns,
      rows: payments
    };
  },
  methods: {
    save() {
      this.$store.dispatch("SAVE", this.rows);
    }
  }
};
