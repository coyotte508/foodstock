<template>
  <svg viewBox="0 0 58 19" class="action-board">
    <defs>
      <image xlink:href="../assets/board1.png" height="100" width="60" id="board1" />
      <image xlink:href="../assets/board2.png" height="100" width="60" id="board2" />
    </defs>
    <use :href="'#' + board" :y=offset />
  </svg>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";

@Component
export default class ActionBoard extends Vue {
  @Prop({default: 1})
  id: number;

  get board() {
    return this.number <= 3 ? "board1" : "board2";
  }

  // returns 1-6
  get number() {
    return Math.floor(this.id / 2) + 1;
  }

  get offset() {
    return -10 + - (2 - ((this.number - 1) % 3)) * 23;
  }
}
</script>

<style lang="scss">
.foodstock {
  .action-board {
    border: 1px dotted gray;
  }
}
  
</style>
