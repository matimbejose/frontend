<template>
  <div class="elevation-1 sidebar-light-primary p-3 transparent">
    <div class="clearfix">
       <span class="text-uppercase float-left">utilizadores</span>
      <div class="float-right mb-2">
        <GoBackButton :length="-1" />
      </div>
    </div>
      <hr class="pt-0 pb-1 mt-0 mb-1">
       <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
           
            <!-- /.card -->
        <form ref="roleForm" action="#" @submit.prevent="save"> 
            <div class="card card-secondary">             
              <div class="card-header pl-4 pt-1 pb-2">
                  <h3 class="card-title"><i class="fas fa-briefcase "></i> <small>Adicionar Cargos</small></h3>                
              </div>
              <!-- /.card-header -->
              <div :class="loading ? 'card-body overlay-wrapper' : 'card-body'">
                <div v-if="loading" class="overlay"><i class="fas fa-3x fas fa-circle-notch text-grey fa-spin"></i></div>
                  <div class="row">
                      <div class="col-6">
                        <div class="form-group">
                            <label class="font-weight-normal" for="test">Nome: * <span class="text-danger" ></span> </label>
                                <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text rounded-0 "><i class="fas fa-pen"></i></span>
                                </div>
                                <input type="text" v-model="name" class="form-control rounded-0 form-control-sm" placeholder="Ex: Admin">
                            </div>
                        </div>
                      </div>
                      </div>
                      <div class="col-12">
                        <label class="font-weight-normal" for="">Selecione as permissões</label>
                        <div class="checkbox"><label><input type="checkbox" v-model="selectAll" @click="select" class="check_all input-icheck" /> Selecionar Tudo</label></div>
                        <div class="row">
                          <label v-for="permission in permissionsList" :key="permission.id" :for="permission.name" class="btn btn-info btn-xs mr-1 mb-1 ">{{ permission.name_to_show }} <input type="checkbox" v-model="selected" :id="permission.name" :value="permission.id" class="badgebox"><span class="badge">&check;</span></label>
                            
                        </div>
                      </div>
        
             
                <!-- table begin -->
                
              </div>
              <!-- /.card-body -->

              <!-- /.card-footer -->
              <div class="card-footer">
                  <div class="d-flex justify-content-end">
                      <button type="submit" :disabled="loading" class="btn btn-success mr-1 btn-sm"><i class="fas fa-save"></i> Guardar</button>
                  </div>
              </div>
              
            </div>
            </form>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import store from '../store'
import Axios from 'axios'

import { useVuelidate } from '@vuelidate/core'
import GoBackButton from '../../../components/GoBackButton.vue'

import token from '../../users/store'
import { baseApiUrl } from '../../../global'

Axios.defaults.baseURL = baseApiUrl


export default { 
  name: 'ListUsers',
  props:['id'],
  components: {
    GoBackButton,
    },
  data() {
    return {
      loading: false,
      name: '',     
      selected: [], 
      selectAll: false,
      permissionsList: [],
      preSelected: []
    }
  },
  methods: {
    select() {
			this.selected = [];
			if (!this.selectAll) {
				for (let i in this.permissionsList) {
					this.selected.push(this.permissionsList[i].id);
        }
			}
		},
    getPermissions() {
      Axios.get('/permissions', {headers: {'Authorization': `Bearer ${token.state.token}` }})
        .then((response)=>{
          this.permissionsList = response.data.permissions
        })
        .catch((error)=> {
          console.log('Processing...');
        })
    },
     showAlert(msg,type) {
      this.$swal({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          type: type,
          title: msg,
          icon: type,
        }); 
    },
    save() {
      Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.state.token

      if (this.name == '') {
        return this.showAlert('Insira um nome.', 'error')
      }
      this.loading = true
      if (store.state.editingRoleId == null) {
        Axios.post('/roles', {name: this.name, permissions: this.selected})
            .then((response)=>{
                if(response.data.success) {
                  this.showAlert(response.data.success, 'success')
                  this.loading = false
                }
            })
            .catch((error)=> {
                console.log('Processing...');
                this.loading = false
            })
      } else {
        for (let i in this.preSelected) {
          if (!this.selected.includes(this.preSelected[i])) {
            this.selected.push(this.preSelected[i]);
          }
        }

        Axios.put(`/roles/${store.state.editingRoleId}`,{name: this.name, permissions: this.selected})
            .then((response)=>{
                if(response.data.success) {
                  this.showAlert(response.data.success, 'success')
                  this.$store.dispatch('setRoleEditingId', true)
                  this.loading = false
                }
            })
            .catch((error)=> {
                console.log('Processing...');
                this.loading = false
            })
      }

    },
    fillFormInputs(id) {
      this.loading = true
      Axios.get(`/roles/${id}`, {headers: {'Authorization': `Bearer ${token.state.token}` }})
        .then((response)=>{
          this.name = response.data.role.name
          let permissions = response.data.permissions
          this.loading = false
          
          for (let i in permissions) {
            this.selected.push(permissions[i].id);
          }
          this.preSelected = this.selected
        })
        .catch((error)=> {
          console.log('Processing...');
        })
    }
  },
  mounted() {
 
    this.getPermissions()
    if (store.state.editingRoleId == null && store.state.addingRole == false) {
      this.$router.replace(`/roles`)
    } 
    if (store.state.editingRoleId != null && store.state.addingRole == false) {
      this.fillFormInputs(store.state.editingRoleId)
    }
    if (store.state.addingRole == true) {
      this.$refs.roleForm.reset();
    }
  },

}



</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.input-group-text{
  background-color: white !important;
  font-size: 10px !important;
}
.badgebox{
  opacity: 0;
}
.badgebox + .badge{
  text-indent: -999999px; 

}
.badgebox:focus + .badge{
  box-shadow: inset 0px 0px 5px;
}
.badgebox:checked + .badge{
	text-indent: 0;
}
</style>