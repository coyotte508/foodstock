<template>
  <v-layout row>
    <vflex xs6>
      <ActionBoard :id="0" />
      <ActionBoard :id="4" />
      <ActionBoard :id="8" />
    </vflex>
    <vflex xs6>
      <ActionBoard :id="2" />
      <ActionBoard :id="6" />
      <ActionBoard :id="10" />
    </vflex>
  </v-layout>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import ActionBoard from './ActionBoard.vue';

@Component({
  components: {
    ActionBoard
  }
})
export default class Board extends Vue {

}
</script>
