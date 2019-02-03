<template>
  <gt :x=x :y=y :scale=scale class="ingredient">
    <circle :r=1 :cx=0 :cy=0 :fill=color stroke="#444" stroke-width=0.05 :class={draggable} @click="drag=true" @start=notifyDragStart />
    <text class="t" style="font-size: 0.8px" v-if="count">{{count}}</text>
  </gt>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Vue, Component, Prop} from "vue-property-decorator";
import SvgG from '@/components/library/SvgG.vue';
import draggable from './library/draggable';

@Component
export default class Ingredient extends mixins(SvgG, draggable) {
  @Prop()
  color: string;

  @Prop({default: 0})
  count: number;

  @Prop({default: false})
  draggable: boolean;

  notifyDragStart() {
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

    circle.draggable {
      stroke: green;
      cursor: pointer;
    }
  }
}
</style>