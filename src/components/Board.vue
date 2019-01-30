<template>
  <v-layout row>
    <v-flex xs6>
      <ActionBoard :id="+G.actionBoards[0].id" />
      <ActionBoard :id="+G.actionBoards[2].id" />
      <ActionBoard :id="+G.actionBoards[4].id" />
    </v-flex>
    <v-flex xs6>
      <ActionBoard :id="+G.actionBoards[1].id" />
      <ActionBoard :id="+G.actionBoards[3].id" />
      <ActionBoard :id="+G.actionBoards[5].id" />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import ActionBoard from './ActionBoard.vue';
import { GameState } from '@/engine';

@Component({
  components: {
    ActionBoard
  }
})
export default class Board extends Vue {
  @Prop()
  G: GameState;
}
</script>
