<template>
  <svg viewBox="0 0 58 19" class="action-board">
    <image xlink:href="../assets/board1.png" height="100" width="60" :y=offset>
      <desc>board</desc>
    </image>
  </svg>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";

@Component
export default class ActionBoard extends Vue {
  @Prop({default: 1})
  id: number;

  get fileName() {
    return "board1.png";
  }

  get offset() {
    return -10 + -((this.id - 1) % 3) * 23;
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
