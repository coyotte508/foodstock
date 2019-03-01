<template>
  <gt :x=x :y=y :scale=scale :class="['card', {active}]" :v-draggable='active'>
    <slot />
  </gt>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Vue, Component, Prop} from "vue-property-decorator";
import SvgG from '@/components/library/SvgG.vue';

@Component
export default class Card extends SvgG {
  @Prop({default: 0})
  w: number;

  @Prop({default: 0})
  h: number;

  @Prop({default: false})
  active: boolean;
}

</script>

<style lang="scss">
.card {
  &.active {
    cursor: pointer;
  }
}
</style>
