<template>
  <svg viewBox="0 0 17 2.4" class="ingredient-pool">
    <Ingredient :color=color :count=count(color) :y=1.2 :x="i*2.4 + 1.2" v-for="(color,i) in colors" :key="color" :draggable=draggable(color) />
  </svg>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import Ingredient from './Ingredient.vue';
import {ingredientTypes} from '../engine/enums';
import {isPendingResource} from '../engine/commands';
import _ from "lodash";

@Component({
  components: {
    Ingredient
  }
})
export default class IngredientPool extends Vue {
  range = _.range;

  model(color) {
    return _.range(this.count(color)).map(x => color);
  }

  get colors() {
    return ingredientTypes.filter(ing => ing !== 'grey');
  }

  draggable(color) {
    return isPendingResource(this.$game, color);
  }

  count(color) {
    // console.log(color);
    return this.$game.ingredients[color];
  }
}
</script>

<style lang="scss">
.foodstock {
  .ingredient-pool {
    border: 1px solid gray;
  }
}
  
</style>
