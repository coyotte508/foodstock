<template>
  <v-layout row>
    <vflex xs6>
      <ActionBoard :id="1" />
      <ActionBoard :id="2" />
      <ActionBoard :id="3" />
    </vflex>
    <vflex xs6>
      <ActionBoard :id="3" />
      <ActionBoard :id="2" />
      <ActionBoard :id="1" />
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
