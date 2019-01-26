<template>
  <table class="table table-striped" v-on-clickaway="quitEdit">
    <thead>
      <tr>
        <template v-for="(column, index) in tableHeadersNames">
          <th
            tabindex="0"
            @click.prevent="sortRows(column)"
            @keydown.13="sortRows(column)"
            v-if="column != 'Edit'"
            :key="index"
          >
            <div>
              {{ column }}
              <sort-icon></sort-icon>
            </div>
          </th>
          <th v-else :key="index"></th>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row) in displayedRows" :key="row.ID" :id="row.ID">
        <template v-for="(value, key, j) in row">
          <td
            v-if="(editableCells.includes(key)) && (tableHeadersNames.includes(key))"
            @focus="edit(row, key)"
            :key="row.ID + j"
            class="editable"
            tabindex="0"
            :class="key"
          >
            <app-text-area v-if="editingCell(row, key)" v-model="valueToEdit"></app-text-area>
            <app-filtered-content v-else :filter="getFilter(key)" :content="value"></app-filtered-content>
          </td>
          <app-filtered-content
            v-else-if="(key != 'Edit') && (tableHeadersNames.includes(key))"
            :filter="getFilter(key)"
            :content="value"
            :key="row.ID + j"
            :class="key"
            tag="td"
          ></app-filtered-content>
          <template v-else>
            <td
              :key="row.ID + j"
              tabindex="-1"
              @click="edit(row, editableCells[0])"
              @keydown.13="edit(row, editableCells[0])"
              class="faux-btn bg-primary text-white"
              :class="key"
            >Edit</td>
          </template>
        </template>
      </tr>
    </tbody>
  </table>
</template>
<script>
import AppTextArea from "@atoms/Textarea.vue";
import AppFilteredContent from "@atoms/FilteredContent.vue";
import SortIcon from "@atoms/icons/Sort.vue";
import { mixin as clickaway } from "vue-clickaway";
export default {
  mixins: [clickaway],
  components: {
    SortIcon,
    AppTextArea,
    AppFilteredContent
  },
  data() {
    return {
      valueToEdit: "",
      keyToEdit: "",
      selectedRow: null
    };
  },
  props: [
    "tableRules",
    "tableHeaders",
    "value",
    "displayedRows",
    "editableCells"
  ],
  computed: {
    tableHeadersNames() {
      return [
        ...new Set(
          this.tableHeaders
            .map(header => {
              return header.name;
            })
            .flat()
        )
      ];
    }
  },
  methods: {
    getFilter(dataType) {
      if (!dataType) {
        return "";
      }
      const filterObj = this.tableHeaders.find(header => {
        return header.name == dataType;
      });
      return filterObj ? filterObj.filter : "";
    },
    editingCell(row, key) {
      return row.Edit && this.keyToEdit == key ? true : false;
    },
    editingRow(row) {
      return row.Edit ? true : false;
    },
    sortRows(column) {
      if (column == this.tableRules.sortByColumn) {
        this.$emit("reverseOrder");
        return;
      }
      this.$emit("updateSorted", column);
    },
    edit(selectedRow, selectedCell) {
      this.selectedRow = selectedRow;
      this.keyToEdit = selectedCell;
      this.valueToEdit = selectedRow[selectedCell];
      const setEditableRow = this.value.map(row => {
        if (row.ID == selectedRow.ID) {
          row.Edit = true;
        } else {
          row.Edit = false;
        }
        return row;
      });
      this.$emit("input", [...setEditableRow]);
    },
    quitEdit() {
      const setEditableRow = this.value.map(row => {
        row.Edit = false;
        return row;
      });
      this.$emit("input", [...setEditableRow]);
    },
    save(e) {
      const updatedRow = Object.assign({}, this.selectedRow);
      updatedRow[this.keyToEdit] = this.valueToEdit;
      this.$emit("updateCell", updatedRow);
    }
  },
  watch: {
    valueToEdit: function(valueToEdit) {
      const updatedRow = Object.assign({}, this.selectedRow);
      updatedRow[this.keyToEdit] = this.valueToEdit;
      this.$emit("updateCell", updatedRow);
    }
  }
};
</script>