<template>
  <v-card class="player-info mx-2 mb-2 pt-2 text-xs-center" :style="`border: solid 1px ${color}`" :flat="true">
    <h3>Player {{+id + 1}} - ${{player.money}}</h3>
    <svg viewBox="0 0 113 80" class="player-board">
      <use href="#player-board" :x=0 :y=0 />
      <Helper :x="3.4+4.56*h" :y="77" v-for="h in helpers" :key="'helper-' + h" :id=id />
      <Plate v-for="i in [0, 1, 2]" :key="`p${id}-plate${i}`" :player=id :number=i :x="plateX(i)" :y=47.7 />
    </svg>
  </v-card>
</template>

<script lang="ts">
import Helper from './Helper.vue';
import Plate from './Plate.vue';
import {Vue, Component, Prop} from "vue-property-decorator";
import { Player } from '@/engine/player';
import _ from "lodash";
import { playerColor } from '@/graphics/player-color';

@Component({
  components: {
    Helper, Plate
  }
})
export default class PlayerBoard extends Vue {
  @Prop()
  id: string;

  get player(): Player {
    return this.$game.players[this.id];
  }

  plateX(index: number) {
    return [8.7, 24, 44.7][index];
  }

  get helpers(): number[] {
    return _.range(0, this.player.helpers);
  }

  get color() {
    return playerColor(this.id);
  }

  get active() {
    return this.$store.state.foodstock.context.currentPlayer === this.id;
  }
}

</script>
