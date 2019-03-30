import FirebaseApi from "@api/FirebaseApi";
import Vue from "vue";
import Vuex from "vuex";
import { forceOrder, originalOrder, setOrder } from "@/consts";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rows: null,
    columns: null,
    loading: false,
    saving: false
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    saving(state) {
      return state.saving;
    }
  },
  mutations: {
    setHeaders(state) {
      state.columns = [
        ...new Set(
          state.rows
            .map(row => {
              return Object.keys(row);
            })
            .flat()
        )
      ].map(column => {
        return {
          name: column,
          filter: `format${column.charAt(0).toUpperCase() + column.substr(1)}`
        };
      });
    },
    loadRows(state, payload) {
      state.rows = forceOrder(payload);
      this.commit("setHeaders");
      state.loading = false;
    },
    saveRows(state) {
      setTimeout(() => {
        // for effect
        state.saving = false;
      }, 700);
    }
  },
  actions: {
    LOAD(context) {
      context.state.loading = true;
      return new FirebaseApi().fetchTable(this.rows).then(res => {
        context.commit("loadRows", res);
        return res;
      });
    },
    SAVE(context, payload) {
      context.state.saving = true;
      const firebaseState = setOrder(payload, originalOrder);
      return new FirebaseApi().putTable(firebaseState).then(() => {
        context.commit("saveRows");
      });
    }
  }
});
