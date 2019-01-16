<template>
  <div id="concepto-list">        
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex>
          <v-widget title="Conceptos">
            <div slot="widget-content">
              <base-list
                ref="list"
                :fields="headers"
                namespace="conceptoCompra"
                :add="add"
                :edit="edit"
                :remove="remove"
              />
              <concepto-form ref="form"/>
            </div>     
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>    
  </div>
</template>

<script>
import VWidget from '@/components/VWidget';
import ConceptoForm from './ConceptoForm';
import BaseList from '@/components/base/BaseList';
import { deleteQuestion } from '@/util/dialogs';
import { DELETE } from '@/store/modules/compras/concepto';

export default {
  components: { VWidget, ConceptoForm, BaseList },
  data() {
    return {
      headers: [        
        { text: 'Concepto', value: 'concepto', width: '250px' },
        { text: 'Descripción', value: 'descripcion', width: '250px' },        
        { text: 'F. Creación', value: 'created_at', width: '100px', filter: 'date' },
        { text: 'Status', value: 'inactivo', align: 'center', width: '80px', type: Boolean, textTrue: 'Activo', textFalse: 'Inactivo', sortable: false }        
      ]
    };
  },

  methods: {    
    
    add() {
      this.$refs.form.open().then((response) => {        
        if (response) {          
          this.$toast.success('Registro creado con éxito!', { icon: 'check' });
          this.$refs.list.getList();
        }
      });
    },

    edit(item) {
      this.$refs.form.open(item.id).then((response) => {        
        if (response) {
          this.$toast.success('Registro guardado con éxito!', { icon: 'check' });
          this.$refs.list.getList();
        }        
      });
    },

    async remove(item) {             
      const question = `¿Desea eliminar el registro <strong>${item.concepto}</strong>?`;
      const ok = await deleteQuestion(this, question);

      if (ok) {
        try{
          await this.$store.dispatch(`conceptoCompra/${DELETE}`, item.id);
          this.$refs.list.getList();
          this.$toast.success('Registro eliminado con éxito!', { icon: 'check' });
        } catch(error) {
          console.log(error);
        }        
      }
    }

  }
};
</script>
