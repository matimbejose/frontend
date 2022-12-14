<template>
    <div class="row">
        <div class="col-4">
            <div class="form-group">
                <label class="font-weight-normal" for="test">Data: * <small class="text-danger" ></small></label>
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text rounded-0 "><i class="fas fa-calendar"></i></span>
                    </div>
                    <v-date-picker v-model="formData.created_at" :model-config="modelConfig">
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

        <div class="col-4">
            <div class="form-group">
                <label class="font-weight-normal" for="test">Maturidade (Meses): * <small class="text-danger"></small></label>
                    <div class="input-group mb-3">
                    <div class="input-group-prepend bg-light">
                        <span class="input-group-text rounded-0 "><i class="fas fa-calendar"></i></span>
                    </div>
                    <InputNumber mode="decimal" class="form-control form-control-sm rounded-0 " :step="1"  v-model="formData.maturity"  />
                </div>
            </div>
            </div>

        <div class="col-4">
            <button class="btn btn-success btn-xs float-right"><i class="fas fa-save"></i> Reestruturar</button>

        </div>
    </div>
</template>

<script>
import moment from 'moment'
import InputNumber from 'primevue/inputnumber'

export default {
    name: 'DisbursingForm',
    props: ['loan_id', 'accounts'],
    components: {
        InputNumber
    },
    data() {
        return {
            modelConfig: {
                type: 'string',
                mask: 'YYYY-MM-DD', // Uses 'iso' if missing
            },
            formData: {
                created_at: moment(JSON.stringify(new Date()).split("T")[0], "YYYY-MM-DD").format("YYYY-MM-DD"),
                maturity: 0,
            },
        } 
    },
    mounted() {
        
    },
}
</script>

