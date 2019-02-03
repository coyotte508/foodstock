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
      <Game />

      <p>Current player: {{ctx.currentPlayer}}</p>
      <p>Phase: {{ctx.phase}}</p>
      <p>Round: {{G.round}}</p>

      <pre style="text-align: left">players: {{JSON.stringify(G.players, null, 2)}}</pre>
      <pre style="text-align: left">pendingResources: {{JSON.stringify(G.pendingResources, null, 2)}}</pre>
      <pre style="text-align: left">ctx: {{JSON.stringify(ctx, null, 2)}}</pre>
    </div>
    <div v-if="active === 'editor'">
      <Editor />
    </div>
    <div style="height: 65px" />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Client } from 'boardgame.io/client';
import Engine, { GameState } from './engine/engine';
import Editor from '@/components/Editor.vue';
import { possibleHelperPlacements } from '@/engine/commands';
import Context from '@/engine/context';
import Game from '@/components/Game.vue';

// let client = null;

@Component({
  components: {
    Editor,
    Game
  },
})
export default class App extends Vue {
  launched = false;
  editor = false;
  active = "game";

  get G(): GameState {
    return this.$store.state.foodstock.game;
  }

  get ctx(): Context {
    return this.$store.state.foodstock.context;
  }

  get player() {
    return  this.G.players[this.ctx.currentPlayer];
  }
}
</script>
