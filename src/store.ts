import Vue from "vue";
import Vuex from 'vuex';
import { GameState } from './engine';
import { HelperPlacement } from './engine/commands';

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
        highlight: {
          boardZones: []
        }
      }
    };
  },
  mutations: {
    stateChanged(state, newState) {
      if (newState) {
        state.game = newState.G;
        state.context = newState.ctx;
      }
    },
    highlightBoardZones(state, placements) {
      state.extra.highlight.boardZones = placements;
    },
    clearHighlights(state) {
      state.extra.highlight = {
        boardZones: []
      };
    }
  },
  actions: {
    // No body, used for signalling with store.subscribeAction
    boardZoneClick(context, zone: HelperPlacement) {}
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
