<template>
  <gt :x=x :y=y :scale=scale v-draggable >
    <DropZone :id="`plate-${player}-${number}`" :radius=5.8 @click="drop(number)" /> 
    <Ingredient :color="ingredient" :scale="2" v-for="(ingredient, i) in ingredients" :y="((ingredients.length-1)/2 - i) * 1.5" :draggable=false :key=i />
  </gt>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import SvgG from '@/components/library/SvgG.vue';
import Ingredient from './Ingredient.vue';

@Component({
  components: {
    Ingredient
  }
})
export default class Plate extends SvgG {
  @Prop()
  player: number;

  @Prop()
  number: number;

  get ingredients() {
    return this.$game.players[this.player].plates[this.number].ingredients;
  }

  drop(plate: number) {
    this.$store.dispatch("foodstock/clickPlate", plate);
  }
}

</script>
