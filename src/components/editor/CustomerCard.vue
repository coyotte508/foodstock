<template>
  <v-card hover width="300">
    <v-layout column>
    <v-card-title>
      <h2>Customer</h2>
    </v-card-title>
    
    <v-card-text>
      <v-form dense>
        <v-text-field height="30" label="Name" v-model="customer.name" />
        <v-text-field height="30" label="Food" v-model="customer.food" />
        <v-select height="30" label="Food type" :items="foodTypes" v-model="customer.foodType" />
        <v-text-field height="30" v-model="customer.money" type="number" label="Money gained" />
        <v-combobox chips label="Ingredients" :items=ingredientTypes multiple v-model="customer.ingredients"/>
        <v-checkbox height="1" label="Vegetarian" v-model="customer.veggie" />
        <v-checkbox height="1" label="Blogger" v-model="customer.blogger" />
        <v-checkbox height="1" label="Special" v-model="customer.special" />
      </v-form>
    </v-card-text>
    <v-card-actions bottom>
      <v-spacer></v-spacer>
      <v-btn color="error" icon @click="$emit('removeCustomer')"><v-icon>remove</v-icon></v-btn>
      <v-btn icon @click="$emit('addCustomer', customer)"><v-icon>add</v-icon></v-btn>
    </v-card-actions>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import { FoodType, ingredientTypes } from '@/engine/enums';
import { Customer } from '@/engine/customer';

@Component({
})
export default class CustomerCard extends Vue {
  @Prop()
  customer: Customer;

  foodTypes = Object.values(FoodType);
  ingredientTypes = ingredientTypes;
}

</script>
