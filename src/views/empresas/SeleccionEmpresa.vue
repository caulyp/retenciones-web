<template>
  <v-app id="seleccion-empresa">
    <v-container grid-list-xl fluid>    
      <v-layout row wrap align-center justify-center>
        <v-flex lg8 sm12 xs12>
          <v-card>
            <v-toolbar color="primary" dark>              
              <v-toolbar-title v-if="!show">Selección de Empresa</v-toolbar-title>              
              <v-spacer class="hidden-xs-only" v-if="!show"></v-spacer>
              <v-btn icon v-if="!show" @click="show = true">
                <v-icon>search</v-icon>
              </v-btn>
              <!-- BUSCADOR -->
              <v-text-field
                v-if="show"                
                append-icon="close"
                label="Buscar..."
                single-line
                flat
                large
                solo-inverted
                hide-details
                autofocus
                @click:append="clearSearch"
                @input="search"
                @keyup.esc="clearSearch"              
              />

            </v-toolbar>
            <v-divider/>
            <v-list two-line>                
              <v-list-tile v-for="(item, index) in items" :key="index" @click="selectItem(item)">
                <v-list-tile-avatar>
                  <img :src="getLogo(item.logo)">
                </v-list-tile-avatar>
                
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.nombre }}</v-list-tile-title>                                    
                  <v-list-tile-sub-title>{{ item.rif }}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon large color="grey lighten-1">keyboard_arrow_right</v-icon>
                  </v-btn>
                </v-list-tile-action>               
              </v-list-tile>          
            </v-list>
          </v-card>

        </v-flex>
      </v-layout>

    </v-container>   
  </v-app>
</template>

<script>
/* eslint-disable prettier/prettier */
// import { fetchList } from '@/api/general/empresa';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      show: false
    };
  },

  created() {        
    this.getList();
  },

  computed: mapState('empresa', ['items']),

  methods: {
    
    getList(params) {       
      const q = { 
        sort: 'nombre',
        append: 'rif',
        'fields[empresas]': 'id,tipo_persona,codigo,nombre,logo,activo',
        ...params
      };

      this.$store.dispatch('empresa/getList', q);
    },
    
    selectItem(item) {      
      const empresa = { id: item.id, nombre: item.nombre }; 
      this.$store.dispatch('empresa/SET_EMPRESA', empresa);      
      this.$router.push('/dashboard');   
    },    

    getLogo(image) {      
      const photo = image ? image : '/static/avatar/camera.png';
      return photo;
    },

    clearSearch() {
      this.show = false;
      this.getList();
    },

    search(val) {
      this.getList({ 'filter[query]': val, sort: 'nombre' });
    }
  }
};
</script>
