<template>
  <div id="app">
    <button v-if="!client" @click="createGame">Create game</button>
    <div v-if="client">
      <p>Players: {{state.ctx.numPlayers}}</p>
      <p>Current player: {{state.ctx.currentPlayer}}</p>
      <p>Round: {{state.G.round}}</p>
      <p>Turn: {{state.ctx.turn}}</p>

      <button @click="placeHelper">Place Helper</button>
      <button @click="levelUp">Level Up</button>

      <pre style="text-align: left">players: {{JSON.stringify(state.G.players, null, 2)}}</pre>
      <pre style="text-align: left">ctx: {{JSON.stringify(state.ctx, null, 2)}}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Client } from 'boardgame.io/client';
import Engine from './engine';

@Component({
})
export default class App extends Vue {
  client: any = null;

  get state() {
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
  margin-top: 60px;
}
</style>
