<template>
  <div class="card direct-chat direct-chat-primary">
    <div class="card-header ui-sortable-handle" style="cursor: move">
      <h3 class="card-title"><small>Lançamento</small></h3>
       <div class="float-right mr-2">
          <button type="submit" class="btn btn-success mr-1 btn-xs">
            <i class="fas fa-save"></i> Guardar
          </button>
          <button type="submit" class="btn btn-danger mr-1 btn-xs">
            <i class="fas fa-times"></i> Cancelar
          </button>
        </div>
    </div>
    <!-- /.card-header -->
    <div class="card-body" style="display: block">
      <hr class="mt-0" />
      <div class="row p-2">
        <div class="col-3">
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-4 col-form-label font-weight-normal"
              >Lançamento:</label
            >
            <div class="col-sm-8">
              <input class="form-control form-control-sm" >
              
            </div>
          </div>
        </div>
        <div class="col-2">
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-4 col-form-label font-weight-normal"
              >Diários:</label
            >
            <div class="col-sm-8">
              <select
                class="form-control select-doctype rounded-0 select2"
                style="width: 100%"
              >
                <option value="id" selected="selected">00</option>
                <option value="passport">Passaporte</option>
              </select>
            </div>
          </div>
        </div>
                <div class="col-3">
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-6 col-form-label font-weight-normal"
              >Documentos:</label
            >
            <div class="col-sm-6">
              <select
                class="form-control select-doctype rounded-0 select2"
                style="width: 100%"
              >
                <option value="id" selected="selected">000</option>
                <option value="passport">Passaporte</option>
              </select>
            </div>
          </div>
        </div>
                <div class="col-3">
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-5 col-form-label font-weight-normal"
              >C. de custos:</label
            >
            <div class="col-sm-7">
              <select
                class="form-control select-doctype rounded-0 select2"
                style="width: 100%"
              >
                <option value="id" selected="selected">Projecto gaza</option>
                <option value="passport">Passaporte</option>
              </select>
            </div>
          </div>
        </div> 

      </div>
      <div class="row p-2">
          <table class="table table-sm table-bordered">
                  <thead>                  
                    <tr>
                      <th style="width: 13%">Conta</th>
                      <th style="width: 13%">Débito</th>
                      <th style="width: 13%">Crédito</th>
                      <th style="width: 13%">IVA</th>
                      <th >Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input class="form-control form-control-sm" ></td>
                      <td><input class="form-control form-control-sm" ></td>
                      <td>
                        <input class="form-control form-control-sm" >
                      </td>
                      <td><input class="form-control form-control-sm" ></td>
                      <td><input class="form-control form-control-sm" ></td>
                    </tr>
               
                  </tbody>
                </table>
      </div>
    </div>
    <!-- /.card-body -->
    <div class="card-footer" style="display: block"></div>
    <!-- /.card-footer-->
  </div>
  <!-- /.content -->
</template>

<script>
import store from "../store";
import Axios from "axios";
import $ from 'jquery'
import 'select2'
import token from "../../users/store";
import { baseApiUrl } from '../../../global';

Axios.defaults.baseURL = baseApiUrl;

export default {
  name: "ListUsers",
  props: ["id"],
  data() {
    return {
      loading: false,
      name: "",
      selected: [],
      selectAll: false,
      permissionsList: [],
      preSelected: [],
    };
  },
  methods: {
    showAlert(msg, type) {
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        type: type,
        title: msg,
        icon: type,
      });
    },
  },
  mounted() {
      $('.select2').select2()
  },
};
</script>
