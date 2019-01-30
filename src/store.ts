import Vue from "vue";
import Vuex from 'vuex';
import { GameState } from './engine';

Vue.use(Vuex);

const foodstockStoreModule = {
  namespaced: true,
  state() {
    return {
      context: {

      },
      game: {

      } as GameState,
      extra: {

      }
    };
  },
  mutations: {
    stateChanged(state, newState) {
      state.game = newState.G;
      state.context = newState.ctx;
    }
  },
  actions: {
    // No body, used for signalling with store.subscribeAction
  },
  getters: {
  }
};

const store = new Vuex.Store({
  modules: {
    foodstock: foodstockStoreModule
  },
  state: {
  },
  mutations: {
  }
});

export default store;
export {foodstockStoreModule};
