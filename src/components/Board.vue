<template>
  <v-layout row wrap>
    <SvgBase />
    <v-flex xs12 v-for="i in [0,1,2,3,4,5]" :key=i>
      <ActionBoard :id="G.actionBoards[i].id" />
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
