<template>
  <svg style="display: none">
    <defs>
      <defs>
        <image xlink:href="../assets/board1.png" height="100" width="60" id="board1" />
        <image xlink:href="../assets/board2.png" height="100" width="60" id="board2" />
        <image xlink:href="../assets/player-board.png" width="113" height="80" id="player-board" />

        <image xlink:href="../assets/customers/basic/basicCard-0.jpg" width="76" height="104" id="customer-basic-0" />
        <image xlink:href="../assets/customers/basic/basicCard-1.jpg" width="76" height="104" id="customer-basic-1" />
        <image xlink:href="../assets/customers/basic/basicCard-2.jpg" width="76" height="104" id="customer-basic-2" />

        <image xlink:href="../assets/customers/special/card-0.jpg" width="76" height="104" id="customer-special-0" />
        <image xlink:href="../assets/customers/special/card-1.jpg" width="76" height="104" id="customer-special-1" />
        <image xlink:href="../assets/customers/special/card-2.jpg" width="76" height="104" id="customer-special-2" />
      </defs>
    </defs>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({

});
</script>

<style lang="scss">
.foodstock {
  svg {
    text {
      user-select: none;
      pointer-events: none;
    }
    .t {
      dominant-baseline: central;
      text-anchor: middle;
    }
  }

  .draggable {
    cursor: pointer;
  }
}
</style>