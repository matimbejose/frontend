
export default {
  state: {
      editingCredit_typeId: null,
      addingCreditType: true,
  },
  mutations: {
    setCreditTypeEditingId(state, editingCredit_typeId) {
      state.editingCredit_typeId = editingCredit_typeId
    },
    setCreditTypeActionPerform(state, addingCreditType) {
      state.addingCreditType = addingCreditType
    }
  },
  actions: {
    setCreditTypeEditingId(context, editingCredit_typeId) {
      context.commit('setCreditTypeEditingId', editingCredit_typeId)
    },
    setCreditTypeActionPerform(context, addingCreditType) {
      context.commit('setCreditTypeActionPerform', addingCreditType)
    },
   
  },

}