import payments from "@/payments";
export const objectValsToString = o => {
  Object.keys(o).forEach(k => {
    if (typeof o[k] === "object") {
      return toString(o[k]);
    }
    o[k] = "" + o[k];
  });
  return o;
};
export const fireBaseUrl = "https://persisted-data-table.firebaseio.com/";
export const arrayToObject = array =>
  array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});
export const originalOrder = payments.map(payment => {
  return payment.ID;
});
export const forceOrder = table => {
  return table.map(row => {
    return {
      ID: row.ID,
      Name: row.Name,
      Description: row.Description,
      Date: row["Date"],
      Amount: row.Amount,
      Edit: false
    };
  });
};
export const setOrder = (rows, originalOrder) => {
  const orderedRows = [];
  originalOrder.map(originID => {
    rows.map(row => {
      if (row.ID == originID) {
        orderedRows.push(row);
      }
    });
  });
  return orderedRows;
};
export const q1 = [
  104,
  116,
  116,
  112,
  115,
  58,
  47,
  47,
  101,
  110,
  103,
  105,
  110,
  101,
  101,
  114,
  105,
  110,
  103,
  45,
  97,
  112,
  112,
  108,
  105,
  99,
  97,
  116,
  105,
  111,
  110,
  46,
  98,
  114,
  105,
  116,
  101,
  99,
  111,
  114,
  101,
  46,
  99,
  111,
  109,
  47,
  113,
  117,
  105,
  122,
  47,
  115,
  97,
  97,
  115,
  100,
  97,
  115,
  100,
  108,
  102,
  108,
  102,
  108,
  115
]
  .map(num => {
    return String.fromCharCode(num);
  })
  .join(",")
  .replace(/,/g, "");
