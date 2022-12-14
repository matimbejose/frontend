
export default {
  state: {
      editingAccountId: null,
      addingAccount: true,
  },
  mutations: {
    setEditingAccountIdId(state, editingAccountId) {
      state.editingAccountId = editingAccountId
    },
    setAccountActionPerform(state, addingAccount) {
      state.addingAccount = addingAccount
    }
  },
  actions: {
    setEditingAccountIdId(context, editingAccountId) {
      context.commit('setEditingAccountIdId', editingAccountId)
    },
    setAccountActionPerform(context, addingAccount) {
      context.commit('setAccountActionPerform', addingAccount)
    },
   
  },

}