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
        <IngredientPool class="mx-2" />
        <svg viewBox="0 0 80 120" class="mt-2">
          <g>
            <Card>
              <rect width=20 height=27.5 fill=grey />
              <text :y=13.7 class="t" font-size=5 x=10>Basic</text>
            </Card>
            <Card :scale=0.26 :y=30>
              <use href="#customer-basic-0" />
            </Card>
          </g>
          <gt :x=22>
            <Card>
              <rect width=20 height=27.5 fill=grey />
              <text :y=13.7 class="t" font-size=5 x=10>Special</text>
            </Card>
            <Card :scale=0.26 :y=30 :active=true>
              <use href="#customer-special-0" />
            </Card>
            <Card :scale=0.26 :y=40 :active=true>
              <use href="#customer-special-1" />
            </Card>
            <Card :scale=0.26 :y=50 :active=true>
              <use href="#customer-special-2" />
            </Card>
          </gt>
        </svg>
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
import IngredientPool from '@/components/IngredientPool.vue';
import Card from '@/components/library/Card.vue';

// let client = null;

@Component({
  components: {
    Board,
    PlayerBoard,
    Commands,
    IngredientPool,
    Card
  },
  watch: {
  },
  created(this: Game) {
    this.createGame();

    this.$store.subscribeAction(({type, payload}) => {
      console.log("Receive action", type, payload);
      if (type === 'foodstock/boardZoneClick') {
        this.client.moves.placeHelper(payload);
      } else if (type === 'foodstock/clickPlate') {
        const plate = payload;
        const color = this.$dragged;

        this.client.moves.gainIngredient({plate, color});
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
      this.$clearDrag();
      this.$clearHighlights();
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
    this.$store.commit("foodstock/dropZones", possibleHelperPlacements(this.G, this.player).map(pl => `board-${pl[0]}-${pl[1]}-${pl[2]}`));
    // this.client.moves.placeHelper();
  }

  levelUp() {
    this.client.moves.levelUp();
  }
}

</script>
