<template>
  <gt :x=x :y=y :scale=scale>
    <rect x=-1 y=-1 width=2 height=2 :fill=color />
  </gt>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import {playerColor} from "../graphics/player-color";
import SvgG from '@/components/library/SvgG.vue';

@Component
export default class Helper extends SvgG {
  @Prop()
  id: string;

  get color(): string {
    return playerColor(this.id);
  }
}

</script>
