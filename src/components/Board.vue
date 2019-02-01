<template>
  <v-layout row>
    <SvgBase />
    <v-flex xs6>
      <ActionBoard :id="G.actionBoards[0].id" />
      <ActionBoard :id="G.actionBoards[2].id" />
      <ActionBoard :id="G.actionBoards[4].id" />
    </v-flex>
    <v-flex xs6>
      <ActionBoard :id="G.actionBoards[1].id" />
      <ActionBoard :id="G.actionBoards[3].id" />
      <ActionBoard :id="G.actionBoards[5].id" />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import ActionBoard from './ActionBoard.vue';
import SvgBase from './SvgBase.vue';
import { GameState } from '@/engine/engine';

@Component({
  components: {
    ActionBoard,
    SvgBase
  }
})
export default class Board extends Vue {
  get G(): GameState {
    return this.$store.state.foodstock.game;
  }
}
</script>
