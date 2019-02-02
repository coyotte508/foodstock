<template>
  <g :transform="`translate(${x},${y}), scale(${scale})`">
    <slot />
  </g>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";

@Component
export default class SvgG extends Vue {
  @Prop({default: 0})
  x: number;
  @Prop({default: 0})
  y: number;
  @Prop({default: 1})
  scale: number;
}
</script>