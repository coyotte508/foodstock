<template>
  <v-toolbar dense top right style="top: 60px; right: 0; position: fixed" floating>
    <v-btn 
      flat @click="$emit('levelUp')"
    >
      <span>Level up</span>
    </v-btn>

    <v-btn
      flat @click="$emit('placeHelper')"
    >
      <span>Place helper</span>
    </v-btn>
  </v-toolbar>
</template>