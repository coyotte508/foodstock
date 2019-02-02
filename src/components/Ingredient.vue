<template>
  <gt :x=x :y=y :scale=scale class="ingredient">
    <circle :r=1 :fill=color stroke="#444" stroke-width=0.05 />
    <text class="t" style="font-size: 0.8px" v-if="count">{{count}}</text>
  </gt>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import SvgG from '@/components/library/SvgG.vue';

@Component
export default class Ingredient extends SvgG {
  @Prop()
  color: string;

  @Prop({default: 0})
  count: number;
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
  }
}
</style>