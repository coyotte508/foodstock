<template>
  <div>
    <v-layout row>
      <v-flex xs4>
        <Board class="mx-2" />
      </v-flex>
      <v-flex xs4>
        <PlayerBoard id="0" />
        <PlayerBoard id="1" />
      </v-flex>
      <v-flex xs4>
        <Commands @levelUp="levelUp" @placeHelper="placeHelper" />
      </v-flex>
    </v-layout>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Client } from 'boardgame.io/client';
import Engine, { GameState } from '@/engine/engine';
import Board from '@/components/Board.vue';
import PlayerBoard from '@/components/PlayerBoard.vue';
import { possibleHelperPlacements } from '@/engine/commands';
import Context from '@/engine/context';
import Commands from '@/components/Commands.vue';

// let client = null;

@Component({
  components: {
    Board,
    PlayerBoard,
    Commands
  },
  watch: {
  },
  created(this: Game) {
    this.createGame();

    this.$store.subscribeAction(({type, payload}) => {
      if (type === 'foodstock/boardZoneClick') {
        this.client.moves.placeHelper(payload);
      }
    });
  }
})
export default class Game extends Vue {
  client: any = null;
  launched = false;
  editor = false;
  active = "game";

  createGame() {
    this.client = new Client({
      game: Engine,
      numPlayers: 2,
    });

    this.$store.commit("foodstock/stateChanged", this.client.getState());

    this.client.subscribe(state => {
      console.log("new state");
      this.$store.commit("foodstock/stateChanged", this.client.getState());
      this.$store.commit("foodstock/clearHighlights");
    });

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
