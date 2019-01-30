<template>
  <g>
    <rect x=-1 y=-1 width=2 height=2 :fill=color />
  </g>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import {playerColor} from "../graphics/player-color";

@Component
export default class Helper extends Vue {
  @Prop()
  id: string;

  get color(): string {
    return playerColor(this.id);
  }
};

</script>
