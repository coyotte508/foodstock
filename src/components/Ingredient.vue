<template>
  <gt :x=x :y=y :scale=scale :class="['ingredient', {draggable}]" v-draggable="draggable">
    <circle :r=1 :cx=0 :cy=0 :fill=color stroke="#444" stroke-width=0.08 />
    <text class="t" style="font-size: 0.8px" v-if="count">{{count}}</text>
  </gt>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Vue, Component, Prop} from "vue-property-decorator";
import SvgG from '@/components/library/SvgG.vue';
import draggable from './library/draggable';

@Component({
  created() {
    this.$on("dragStart", () => this.notifyDragStart());
  }
})
export default class Ingredient extends SvgG {
  @Prop()
  color: string;

  @Prop({default: 0})
  count: number;

  @Prop({default: true})
  draggable: boolean;

  notifyDragStart() {
    console.log("Dispatching chooseIngredient");
    this.$store.dispatch("foodstock/chooseIngredient", this.color);
  }
}

</script>
<style lang="scss">
.foodstock {
  .ingredient {
    text {
      // paint-order: stroke;
      font-size: 0.8px;
      // fill: none;
      // stroke-width: 0.05px;
      // stroke-linecap: butt;
      // stroke-linejoin: miter;
    }

    &.draggable circle {
      stroke: green;
      stroke-width: 0.2;
      cursor: pointer;
    }
  }
}
</style>