<template>
  <div class="container-fluid mt-3">
    <controls v-model="tableRules" :rowsToShow="rowCountOptions" :pagesAvailable="pagesAvailable" @saved="save"/>
    <data-table
      v-if="paginatedRows.length > 0"
      v-model="rows"
      :tableRules="tableRules"
      :tableHeaders="columns"
      :displayedRows="paginatedRows"
      :editableCells="editableCells"
      @updateSorted="assignSortingColumn"
      @reverseOrder="reverseOrder"
      @updateCell="updateCell"
    />
    <p
      v-else
      class="justify-center font-weight-bolder lead mt-4"
    >No results found for "{{tableRules.textFilter}}", please refine your search criteria.</p>
  </div>
</template>
<script>
import SortIcon from "@atoms/icons/Sort.vue";
import AppTextArea from "@atoms/Textarea.vue";
import Pagination from "@molecules/Pagination.vue";
import DataTable from "@organisms/DataTable.vue";
import SearchBar from "@molecules/SearchBar.vue";

import stateHelper from "@mixins/loadFirebaseState";
//import stateHelper from "@mixins/loadOriginalState";

export default {
  mixins: [stateHelper],
  data() {
    return {
      tableRules: {
        currentPage: 1,
        rowsPerPage: 10,
        textFilter: "",
        sortByColumn: null
      },
      editableCells: ["Description"], //Spec asks for description to be editable, but I wanted to create a more robust/reusalbe solution. You can pass other column headers here to allow their cells to become editable I.E. "Name"
      reverseCurrentOrder: false
    };
  },
  components: {
    SortIcon,
    Controls: Pagination,
    AppTextArea,
    DataTable,
    SearchBar
  },
  methods: {
    updateCell(newRow) {
      this.rows = this.rows.map(row => {
        if (row.ID === newRow.ID && row !== newRow) {
          row = newRow;
        }
        return row;
      });
    },
    reverseOrder() {
      this.reverseCurrentOrder = !this.reverseCurrentOrder;
    },
    assignSortingColumn(column) {
      this.tableRules.sortByColumn = column;
      this.reverseCurrentOrder = false;
    },
    paginateRows(rows, rowsPerPage, currentPage) {
      if (rows.length > 0) {
        let end = rowsPerPage * currentPage;
        let start = end - rowsPerPage;
        rows = rows.slice(start, end);
      }
      return rows;
    },
    getAmountPages(length, limit) {
      return Math.ceil(length / limit);
    },
    sortRows(rows, sortColumn, reverseCurrentOrder) {
      if (sortColumn) {
        rows = rows.sort(function(a, b) {
          var textA = a[sortColumn].toUpperCase();
          var textB = b[sortColumn].toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
      }
      if (reverseCurrentOrder) {
        return rows.reverse();
      } else {
        return rows;
      }
    },
    filterRows(rows, textFilter) {
      if (textFilter != "") {
        return rows.filter(row => {
          if (
            Object.values(row)
              .join("")
              .toLowerCase()
              .indexOf(textFilter.toLowerCase()) >= 0
          ) {
            return row;
          }
        });
      }
      return rows;
    }
  },
  computed: {
    sortedRows() {
      return this.sortRows(
        this.rows,
        this.tableRules.sortByColumn,
        this.reverseCurrentOrder
      );
    },
    filteredRows() {
      return this.filterRows(this.sortedRows, this.tableRules.textFilter);
    },
    paginatedRows() {
      return this.paginateRows(
        this.filteredRows,
        this.tableRules.rowsPerPage,
        this.tableRules.currentPage
      );
    },
    pagesAvailable() {
      return this.getAmountPages(
        this.filteredRows.length,
        this.tableRules.rowsPerPage
      );
    }
  },
  watch: {
    tableRules: {
      handler: function(tableRules) {
        if (tableRules.currentPage > this.pagesAvailable) {
          tableRules.currentPage = 1;
        }
      },
      deep: true
    }
  }
};
</script>