import Vue from "vue";
import Vuex from 'vuex';
import { GameState } from './engine/engine';
import { HelperPlacement } from './engine/commands';
import { Ingredient } from './engine/enums';

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
        dropZones: [],
        dragged: ""
      }
    };
  },
  mutations: {
    stateChanged(state, newState) {
      if (newState) {
        newState = JSON.parse(JSON.stringify(newState));

        state.game = newState.G;
        state.context = newState.ctx;
      }
    },
    dropZones(state, ids) {
      state.extra.dropZones = ids;
    },
    clearHighlights(state) {
      state.extra.dropZones = [];
    },
    pickIngredientFromPool(state, color: string) {

    },
    dragged(state, what: string) {
      console.log("set drag", what);
      state.extra.dragged = what;
    },
    clearDrag(state) {
      console.log("clear drag");
      state.extra.dragged = null;
    }
  },
  actions: {
    // No body, used for signalling with store.subscribeAction
    boardZoneClick(context, zone: HelperPlacement) {},
    chooseIngredient({state, commit}, color: Ingredient) {
      commit("dragged", color);

      const id = state.context.currentPlayer;
      commit("dropZones", [`plate-${id}-0`, `plate-${id}-1`, `plate-${id}-2`]);
    },
    clickPlate({state, commit}, plate: number) {

    }
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
