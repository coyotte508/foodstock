<template>
  <div id="app" class="foodstock">
    <v-btn v-if="!client" @click="createGame" class="mb-4">Create game</v-btn>
    <div v-if="client">
      <Board />

      <v-layout row wrap>
        <v-flex xs6>
          <PlayerBoard id="0" />
        </v-flex>
        <v-flex xs6>
          <PlayerBoard id="1" />
        </v-flex>
      </v-layout>

      <v-btn @click="placeHelper">Place Helper</v-btn>
      <v-btn @click="levelUp">Level Up</v-btn>

      <p>Current player: {{state.ctx.currentPlayer}}</p>
      <p>Round: {{state.G.round}}</p>

      <pre style="text-align: left">players: {{JSON.stringify(state.G.players, null, 2)}}</pre>
      <pre style="text-align: left">ctx: {{JSON.stringify(state.ctx, null, 2)}}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Client } from 'boardgame.io/client';
import Engine from './engine';
import Board from '@/components/Board.vue';
import PlayerBoard from '@/components/PlayerBoard.vue';

@Component({
  components: {
    Board,
    PlayerBoard
  },
  watch: {
    /** Update global state when the game state changes */
    state(newVal) {
      this.$store.commit("foodstock/stateChanged", newVal);
    }
  }
})
export default class App extends Vue {
  client: any = null;

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

    // console.log(JSON.stringify(this.client.getState()));
  }

  placeHelper() {
    this.client.moves.placeHelper();
  }

  levelUp() {
    this.client.moves.levelUp();
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}
</style>
