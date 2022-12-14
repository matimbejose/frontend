
export default {
  state: {
    editingAccountId: null,
    addingAccount: true,
  },
  mutations: {
    setAccountEditingId(state, editingAccountId) {
      state.editingAccountId = editingAccountId
    },
    setAccountActionPerform(state, addingAccount) {
      state.addingAccount = addingAccount
    }
  },
  actions: {
    setAccountEditingId(context, editingAccountId) {
      context.commit('setAccountEditingId', editingAccountId)
    },
    setAccountActionPerform(context, addingAccount) {
      context.commit('setAccountActionPerform', addingAccount)
    },

  },

}