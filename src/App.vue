<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Client } from 'boardgame.io/client';
import HelloWorld from './components/HelloWorld.vue';
import Engine from './engine';

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  createGame() {
    const gameInstance = new Client({
      game: Engine,
      numPlayers: 2
    })
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
