<template>
  <div>
    <!-- MODAL -->
    <v-dialog v-model="dialog" persistent max-width="600px">      
      <v-card>
        <v-card-title primary-title class="primary white--text">
          <span class="headline">Ficha de Conceptos de Compras</span>
          <v-spacer/>
          <v-btn flat dark icon @click="cancel">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="form">
            <v-layout wrap>              
              <v-flex xs12>                
                <!-- CÓDIGO -->
                <v-text-field
                  ref="codigo"
                  name="codigo"
                  v-model="form.concepto"
                  label="Concepto"
                  v-validate="'required'"
                  :error-messages="errors.first('codigo')"
                  autofocus
                />

                <!-- DESCRIPCIÓN -->
                <v-text-field
                  name="descripcion"
                  v-model="form.descripcion"
                  label="Descripción"
                  v-validate="'required'"
                  :error-messages="errors.first('descripcion')"
                />

                <!-- CUENTA CONTABLE -->
                <v-autocomplete
                  name="cuenta" 
                  :items="cuentas"
                  v-model="form.cuenta"
                  clearable
                  return-object
                  item-text="codigo"
                  label="Cuenta Contable"
                  placeholder="Escriba para buscar..."
                  :loading="searching"                  
                  :search-input.sync="search"
                  v-validate="'required'"
                  :error-messages="errors.first('cuenta')"
                  >
                  <template slot="selection" slot-scope="data">                      
                    {{ data.item.codigo | maskAccount }} - {{ data.item.descripcion }}
                  </template>
                  <template slot="item" slot-scope="data">                    
                    {{ data.item.codigo | maskAccount }} - {{ data.item.descripcion }}
                  </template>                    
                </v-autocomplete>
                <v-switch v-model="form.inactivo" label="Inactivo" color="warning" />

                <v-alert
                  :value="true"
                  color="error"
                  icon="error"
                  outline                  
                  v-if="error"
                >
                  {{ error }}
                </v-alert>

              </v-flex>                        
            </v-layout>
            </v-form>
          </v-container>
        </v-card-text>

        <v-divider/>
        <v-card-actions>
          <v-btn color="primary darken-1" flat @click="cancel">Cancelar</v-btn>
          <v-spacer></v-spacer>          
          <v-btn color="primary" :loading="loading" @click="submit">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--./MODAL -->
    </div>
</template>

<script>
/* eslint-disable no-return-assign */
import { fetchConcepto, createConcepto, updateConcepto } from '@/api/compras/concepto';
import { mapState } from 'vuex';
import { GET, SAVE } from '@/store/modules/compras/concepto';

export default {
  name: 'ConceptoForm',
  data() {
    return {            
      form: {
        id: null,
        concepto: '',
        descripcion: '',
        cuenta: null,
        inactivo: false
      },      
      resolve: null,
      reject: null,
      // loading: false,
      // searching: false,
      dialog: false,
      search: null,
      error: null,
      // cuentas: [],
      id: 0
    };
  },  
  watch: {
    search(val) {
      val && this.queryCuentas(val);  
    }
  }, 

  computed: {
    ...mapState('cuentaContable', {
      cuentas: state => state.items,
      searching: state => state.loading
    }),
    ...mapState('conceptoCompra', {
      // form: state => state.model,
      loading: state => state.loading
    })
  },

  methods: {
    queryCuentas(val) {           
      const query = { 'filter[query]': val, 'filter[tipo]': 'A', 'sort': 'codigo' } 
      this.$store.dispatch('cuentaContable/fetchList', query);
    },

    async open(id) {
      // this.form.id = null;
      this.$refs.form.reset();      
      // Le damos focus al campo Código
      this.$nextTick(this.$refs.codigo.focus);
      this.$validator.reset();

      this.queryCuentas('');

      // Buscamos el Registro
      if (id > 0) {
        try {
          this.form = await this.$store.dispatch(`conceptoCompra/${GET}`, id);          
        } catch (error) {
          this.$toast.error(error.response.data);
          console.log(error.response);
        }
      }      
     
      this.dialog = true;      
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },

    async submit() {            
      const canSubmit = await this.$validator.validateAll();
    
      if (!canSubmit) {
        return false;
      }      

      // this.loading = true;
      /*
      if (this.id > 0) {
        this.updateData();
      } else {
        this.createData();
      }
      */
      this.saveData();                
    },

    cancel() {      
      this.resolve(false);      
      this.dialog = false;      
    },

    async saveData() {      
      try {
        const data = await this.$store.dispatch('conceptoCompra/SAVE', this.form);
        console.log('DATA: ', data);
        this.resolve(data);
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
      
      /*
      createConcepto(this.form).then(response => {                                       
        this.resolve(response.data);
        this.dialog = false;        
      })
        .catch(error => this.catchError(error))                     
        .finally(() => (this.loading = false));
      */
    },


    catchError(error) {      
      const { errorCode, message } = error.response.data;
      this.error = message;
      setTimeout(() => { 
        this.error = null; 
      }, 3000);
    }

  }
};
</script>
