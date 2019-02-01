<template>
  <div>
    <v-layout row wrap>
      <CustomerCard v-for="(customer,index) in customerCards" :key="index" :customer=customer @addCustomer="addCustomer($event, index)" @removeCustomer="removeCustomer(index)" />
    </v-layout>
    <pre>
{{data}}
    </pre>
    <v-btn fab dark bottom fixed right color="primary" @click="save">
      <v-icon dark>save</v-icon>
    </v-btn>

  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import CustomerCard from './editor/CustomerCard.vue';
import { customerCards, createCustomer } from '@/engine/customer';
import _ from 'lodash';

@Component({
  components: {
    CustomerCard
  }
})
export default class Editor extends Vue {
  customerCards = customerCards;
  data = '';

  addCustomer(val, index) {
    this.customerCards = [...this.customerCards.slice(0, index + 1),  _.cloneDeep(val), ...this.customerCards.slice(index + 1)];
  }

  removeCustomer(index) {
    this.customerCards = [...this.customerCards.slice(0, index), ...this.customerCards.slice(index + 1)];
  }

  save() {
    this.data = JSON.stringify(this.customerCards, null, 2);
  }
}

</script>
