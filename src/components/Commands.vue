<template>
  <div class="text-xs-center" dense floating>
    <v-btn :disabled="$context.phase !== 'main'"
       @click="$emit('levelUp')" 
    >
      <span>Level up</span>
    </v-btn>

    <v-btn :disabled="$context.phase !== 'main'"
       @click="$emit('placeHelper')"
    >
      <span>Place helper</span>
    </v-btn>
  </div>
</template>