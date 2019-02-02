<template>
  <svg viewBox="0 0 17 2.4" class="ingredient-pool">
    <Ingredient :color=color :count=count(color) :y=1.2 :x="i*2.4 + 1.2" v-for="(color,i) in colors" :key="'player-' + i"  @click="colorClick(color)"/>
  </svg>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import Ingredient from './Ingredient.vue';
import {ingredientTypes} from '../engine/enums';

@Component({
  components: {
    Ingredient
  }
})
export default class IngredientPool extends Vue {
  get colors() {
    return ingredientTypes.filter(ing => ing !== 'grey');
  }

  count(color) {
    // console.log(color);
    return this.$game.ingredients[color];
  }

  colorClick(color) {
    // this.$store.dispatch("foodstock/boardZoneClick", [this.number, i, j]);
  }
}
</script>

<style lang="scss">
.foodstock {
  .ingredient-pool {
    border: 1px solid gray;

    .higlight {
      cursor: pointer;
    }
  }
}
  
</style>
