<template>
  <v-layout row>
    <v-flex xs4>
      <v-btn color="primary" @click="add()">Agregar</v-btn>
      <v-btn flat icon>
        <v-icon @click="refresh()">refresh</v-icon>
      </v-btn>
    </v-flex>
    <v-flex offset-xs4 xs4>
      <v-text-field
        append-icon="search"
        label="Buscar..."
        single-line
        hide-details
        clearable
        @input="search"
      />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'BaseButtonsList',  
  props: {
    add: Function,
    refresh: Function,
    search: Function
  }
};
</script>
