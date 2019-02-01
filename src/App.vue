<template>
  <v-app id="app" class="foodstock">
    <v-toolbar app dense dark color="primary">
      <v-toolbar-title>Foodstock</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat  @click="active='game'">Game</v-btn>
        <v-btn flat  @click="active='editor'">Editor</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <div style="height: 55px" />
    <div v-if="active === 'game'">
      <Board />

      <div class="text-xs-center">
        <v-btn @click="placeHelper">Place Helper</v-btn>
        <v-btn @click="levelUp">Level Up</v-btn>
      </div>

      <v-layout row wrap>
        <v-flex xs6>
          <PlayerBoard id="0" />
        </v-flex>
        <v-flex xs6>
          <PlayerBoard id="1" />
        </v-flex>
      </v-layout>

      <p>Current player: {{state.ctx.currentPlayer}}</p>
      <p>Round: {{state.G.round}}</p>

      <pre style="text-align: left">players: {{JSON.stringify(state.G.players, null, 2)}}</pre>
      <pre style="text-align: left">ctx: {{JSON.stringify(state.ctx, null, 2)}}</pre>
    </div>
    <div v-if="active === 'editor'">
      <Editor />
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Client } from 'boardgame.io/client';
import Engine, { GameState } from './engine';
import Board from '@/components/Board.vue';
import PlayerBoard from '@/components/PlayerBoard.vue';
import Editor from '@/components/Editor.vue';
import { possibleHelperPlacements } from '@/engine/commands';
import Context from '@/engine/context';

@Component({
  components: {
    Board,
    PlayerBoard,
    Editor
  },
  watch: {
    /** Update global state when the game state changes */
    state(newVal) {
      console.log("state changed");
      this.$store.commit("foodstock/stateChanged", newVal);
      this.$store.commit("foodstock/clearHighlights");
    }
  },
  created(this: App) {
    this.createGame();

    this.$store.subscribeAction(({type, payload}) => {
      if (type === 'foodstock/boardZoneClick') {
        this.client.moves.placeHelper(payload);
      }
    });
  }
})
export default class App extends Vue {
  client: any = null;
  launched = false;
  editor = false;
  active = "game";

  get state() {
    if (!this.client) {
      return null;
    }
    return this.client.getState();
  }

  createGame() {
    this.client = new Client({
      game: Engine,
      numPlayers: 2,
    });

    this.$store.commit("foodstock/stateChanged", this.state);

    // console.log(JSON.stringify(this.client.getState()));
  }

  get G(): GameState {
    return this.$store.state.foodstock.game;
  }

  get ctx(): Context {
    return this.$store.state.foodstock.context;
  }

  get player() {
    return  this.G.players[this.ctx.currentPlayer];
  }

  placeHelper() {
    this.$store.commit("foodstock/highlightBoardZones", possibleHelperPlacements(this.G, this.player));
    // this.client.moves.placeHelper();
  }

  levelUp() {
    this.client.moves.levelUp();
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
