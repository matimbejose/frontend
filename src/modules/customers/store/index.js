
export default {
  state: {
      editingCustomerId: null,
      addingCustomer: true,
  },
  mutations: {
    setCustomerEditingId(state, editingCustomerId) {
      state.editingCustomerId = editingCustomerId
    },
    setCustomerActionPerform(state, addingCustomer) {
      state.addingCustomer = addingCustomer
    }
  },
  actions: {
    setCustomerEditingId(context, editingCustomerId) {
      context.commit('setCustomerEditingId', editingCustomerId)
    },
    setCustomerActionPerform(context, addingCustomer) {
      context.commit('setCustomerActionPerform', addingCustomer)
    },
   
  },

}