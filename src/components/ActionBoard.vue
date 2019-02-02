<template>
  <svg viewBox="0 0 58 19" class="action-board">
    <use :href="'#' + boardFile" :y=offset />

    <g v-for="(chain, i) in chains" :key=i>
      <gt v-for="(c, j) in chain" :key=j :x=c[0] :y=c[1]>
        <circle v-if="highlighted(i,j)" :cx=0 :cy=0 :r="action(i,j).unlimited ? 4 : 2" fill="transparent" stroke="green" @click="click(i,j)" />
        <Helper v-if="action(i,j).helpers.length > 0" :id="action(i,j).helpers[0]" />
      </gt>
    </g>

    <Helper :id=id :x=2 :y="i*3 + 1.7" v-for="(id,i) in players" :key="'player-' + i" />
  </svg>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import boardZones from '../graphics/board-zones';
import Helper from './Helper.vue';
import { Level } from '@/engine/enums';
import { Player } from '@/engine/player';

@Component({
  components: {
    Helper
  }
})
export default class ActionBoard extends Vue {
  @Prop({default: "1-1"})
  id: string;

  get boardFile() {
    return this.number <= Level.Level3 ? "board1" : "board2";
  }

  highlighted(i, j): boolean {
    return this.$store.state.foodstock.extra.highlight.boardZones.some(zone => zone[0] === this.number && zone[1] === i && zone[2] === j);
  }

  get players() {
    return ['0', '1', '2', '3'].filter(id => this.player(id) && this.player(id).level === this.number);
  }

  player(id): Player {
    return this.$store.state.foodstock.game.players[id];
  }

  action(i, j) {
    if (!this.board.actions[i] || !this.board.actions[i][j]) {
      console.log("impossible to find action", i, j, this.id, JSON.parse(JSON.stringify(this.board.actions)));
    }

    return this.board.actions[i][j];
  }

  click(i, j) {
    this.$store.dispatch("foodstock/boardZoneClick", [this.number, i, j]);
  }

  get board() {
    return this.$store.state.foodstock.game.actionBoards[this.number];
  }

  get chains() {
    return boardZones[this.id] || [];
  }

  circles(i) {
    const chains = boardZones[this.id];

    if (!chains) {
      return [];
    }

    return [].concat(...chains);
  }

  // returns 1-6
  get number(): number {
    return +this.id[0] - 1;
  }

  get variant(): number {
    return +this.id[2];
  }

  get offset() {
    return -10 + - (2 - ((this.number) % 3)) * 23;
  }
}
</script>

<style lang="scss">
.foodstock {
  .action-board {
    border: 1px solid gray;

    circle {
      cursor: pointer;
    }
  }
}
  
</style>
