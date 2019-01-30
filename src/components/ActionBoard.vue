<template>
  <svg viewBox="0 0 58 19" class="action-board">
    <use :href="'#' + board" :y=offset />
  </svg>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";

@Component
export default class ActionBoard extends Vue {
  @Prop({default: "1-1"})
  id: string;

  get board() {
    return this.number <= 3 ? "board1" : "board2";
  }

  // returns 1-6
  get number(): number {
    return +this.id[0];
  }

  get variant(): number {
    return +this.id[2];
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
