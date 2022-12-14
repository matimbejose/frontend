<template>
<!-- End table Units -->

    <!--Begin Form modal used for create and edit -->

    <div class="modal fade" tabindex="-1" role="dialog" id="createNewWarranty">
      <div class="modal-dialog " role="document">
        <div class="modal-content">
            <div class="card card-info">             
              <div class="card-header pl-2 pt-1 pb-2">
                  <h3 class="card-title"><i class="fa fas fa-coins mr-2"></i> <small>Adicionar Garantias</small></h3>                
              </div>
              <!-- /.card-header -->
              <div :class="loading ? 'card-body overlay-wrapper' : 'card-body'">
                <div v-if="loading" class="overlay"><i class="fas fa-3x fas fa-circle-notch text-grey fa-spin"></i></div>
                  <div class="row">
                      <div class="col-12">
                        <div class="form-group">
                            <label> Descrição *</label>
                            <textarea v-model="warrantyForm.description" cols="2" rows="2" class="form-control"></textarea>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group">
                            <label class="font-weight-normal" for="test">Valor de compra: *  <small class="text-danger" v-if="errorsValidation.cost">{{ errorsValidation.cost[0]}}</small></label>
                                <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text rounded-0 "><i class="fas fa-dollar-sign"></i></span>
                                </div>
                                <InputNumber class="form-control form-control-sm rounded-0 " :min="0" v-model="warrantyForm.cost" mode="currency" currency="MZN"  />
                            </div>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group">
                            <label class="font-weight-normal" for="test">Valor actual: * <small class="text-danger" v-if="errorsValidation.value">{{ errorsValidation.value[0]}}</small></label>
                                <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text rounded-0 "><i class="fas fa-dollar-sign"></i></span>
                                </div>
                                <InputNumber class="form-control form-control-sm rounded-0 " :min="0"  v-model="warrantyForm.value" mode="currency" currency="MZN"  />
                            </div>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group">
                          <label class="font-weight-normal" for="test">Ano de compra: * <small class="text-danger" ></small></label>
                                <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text rounded-0 "><i class="fas fa-calendar"></i></span>
                                </div>
                                <v-date-picker v-model="warrantyForm.acquisition_date" :model-config="modelConfig">
                                  <template v-slot="{ inputValue, inputEvents }">
                                    <input
                                      class="bg-white border px-2 py-1 rounded"
                                      :value="inputValue"
                                      v-on="inputEvents"
                                    />
                                  </template>
                                </v-date-picker>
                            </div>
                        </div>
                      </div>
                  </div>
                  
                  <hr>
                   
                <!-- table begin -->
                
              </div>
              <!-- /.card-body -->
              <!-- /.card-footer -->
              <div class="card-footer">
                  <div class="d-flex justify-content-end">
                      <button :disabled="loading" data-dismiss="modal" class="btn btn-danger mr-1 btn-sm"><i class="fas fa-times-circle"></i> Fechar</button>
                      <button type="button" @click="saveWarranty()" :disabled="loading" class="btn btn-success mr-1 btn-sm"><i class="fas fa-save"></i> Gravar</button>
                  </div>
              </div>
              
            </div>
        </div>
      </div>
    </div>

    <!-- End form modal -->
</template>

<script>

import $ from 'jquery'
import 'select2'
import store from '../../store'
import token from '../../../users/store'
import Axios from 'axios'
import moment from "moment-timezone"
import InputNumber from 'primevue/inputnumber'
import { baseApiUrl } from '../../../../global'

// import GoBackButton from '../../../../components/GoBackButton.vue'

Axios.defaults.baseURL = baseApiUrl


export default { 

  name: 'AddWarranty',
  props:['id'],
  emits: ["add-warranty"],
  data() {
    return {
      loading: false, val: '',
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD', // Uses 'iso' if missing
      },
      warrantyForm: {
        value: 0, 
        description: '', 
        id: null, cost: 0, 
        acquisition_date: moment(JSON.stringify(new Date()).split("T")[0], "YYYY-MM-DD").format("YYYY-MM-DD"),
        business_id: token.state.business_id
      },
      credit_type: store.state.credit_typeInfo || {},
      errorsValidation: {}
      
    }
  },
    components: {
    InputNumber
  },
  methods: {
    setwarrantyForm(newData) {
      return this.warrantyForm = {...newData}
    }, 
    showAlert(msg,type) {
      this.$swal({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          title: msg,
          icon: type,
        }); 
    },
    saveWarranty() {
      if (this.warrantyForm.description == "" || this.warrantyForm.value < 0 || this.warrantyForm.amount < 0 ) {
        return this.showAlert("Preencha os campos obrigatorios", 'error')
      }
      this.$emit('add-warranty', this.warrantyForm)
      this.warrantyForm = {
        value: 0, description: '', id: null, cost: 0
      }
      this.showAlert('Adicionado com sucesso!', 'success')
    },


   
  },
  
 
}



</script>

