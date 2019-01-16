<template>
  <div>
    <base-buttons-List :add="add" :refresh="getList" :search="getList"/>

    <v-data-table
      :headers="fields"
      :loading="loading"
      :items="items"
      :total-items="totalItems"
      :rows-per-page-items="[ 10, 20, 30, 50]"
      :pagination.sync="pagination"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate/>
      <template slot="items" slot-scope="props">
        <td v-for="item in fields" :key="item.id">
          <div v-if="item.type === Boolean" class="text-xs-center">            
            <v-chip v-if="props.item[item.value]" color="secondary" text-color="white" small>{{ item.textFalse || 'inactivo' }}</v-chip>
            <v-chip v-if="!props.item[item.value]" color="success" text-color="white" small>{{ item.textTrue || 'activo' }}</v-chip>
          </div>  
          <span v-else-if="item.filter">
            {{ getFilter(item.filter, props.item[item.value], item.arg) }}
          </span>        
          <span v-else>
            {{ props.item[item.value] }}
          </span>          

          <div v-if="item.isAction === true" class="text-xs-center">            
            <v-tooltip top>
              <v-btn flat icon small slot="activator" @click="edit(props.item)">
                <v-icon>edit</v-icon>
              </v-btn>
              <span>Modificar el Registro</span>
            </v-tooltip>
            <v-tooltip top>
              <v-btn flat icon color="error" slot="activator" small @click="remove(props.item)">
                <v-icon>delete</v-icon>
              </v-btn>
              <span>Eliminar el registro</span>
            </v-tooltip>  
          </div>
        </td>    
      </template>
    </v-data-table>

    <div class="text-xs-center pt-2" v-if="pages > 1">
      <v-pagination v-model="pagination.page" :length="pages" :total-visible="8"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import BaseButtonsList from './BaseButtonsList';

export default {
  components: { BaseButtonsList },

  props: {
    fields: Array,
    add: Function,    
    edit: Function,
    remove: Function,
    namespace: String,
    sortField: String
  },

  data() {
    return {
      pagination: {},
      q: ''
    };
  },
  
  computed: {
    state: function() {      
      return this.$store.state[this.namespace]
    },    
    ...mapState({      
      items: function () {
        return this.state.items
      },      
      loading: function() { return this.state.loading },
      totalItems: function() { return this.state.totalItems },      
      pages: function() { return this.state.pages }
    })
  },

  watch: {
    pagination: {
      handler() { this.getList(this.q) },
      deep: true
    }
  },

  created() {    
    this.getList();
    if (typeof this.edit === 'function' || typeof this.remove === 'function') {
      this.fields.push({ text: 'Acciones', align: 'center', value: 'action', width: '150px', isAction: true, sortable: false });
    }
  },

  methods: {
    getFilter(filterName, ...arg) {
      const filter = Vue.filter(filterName);            
      return filter(...arg);
    },

    getList(q) { 
      this.q = q;
      let query = {};
      const { sortBy, descending, page, rowsPerPage } = this.pagination;      

      if (q && q.length > 2) {        
        query = {
          page: page,
          sort: this.sortField || '',
          limit: rowsPerPage,
          'filter[query]': q
        };
      } else if (!q || q.length === 0) {
        query = {
          page: page,
          sort: this.sortField || '',
          limit: rowsPerPage
        };      
      }
      
      this.$store.dispatch(`${this.namespace}/FETCH_ALL`, query);     
    },
  }

};
</script>
