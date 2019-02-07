<template>
  <gt :x=x :y=y :scale=scale>
    <DropZone :id="`plate-${player}-${number}`" :radius=5.8 @click="drop(number)" /> 
  </gt>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import SvgG from '@/components/library/SvgG.vue';

@Component
export default class Plate extends SvgG {
  @Prop()
  player: number;

  @Prop()
  number: number;

  drop(plate: number) {
    this.$store.dispatch("foodstock/clickPlate", plate);
  }
}

</script>
