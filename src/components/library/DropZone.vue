<template>
  <gt :x=x :y=y class="dropzone">
    <circle :cx=0 :cy=0 :r="radius" fill="transparent" stroke="green" @click="$emit('click')" v-if="highlighted" />
  </gt>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import SvgG from '@/components/library/SvgG.vue';

@Component
export default class DropZone extends SvgG {
  @Prop({default: 2})
  radius: number;

  @Prop()
  id: string;

  get highlighted() {
    return this.$store.state.foodstock.extra.dropZones.includes(this.id);
  }
}

</script>
