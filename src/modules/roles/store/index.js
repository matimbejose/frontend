
export default {
  state: {
      editingRoleId: null,
      addingRole: true,
  },
  mutations: {
    setRoleEditingId(state, editingRoleId) {
      state.editingRoleId = editingRoleId
    },
    setRoleActionPerform(state, addingRole) {
      state.addingRole = addingRole
    }
  },
  actions: {
    setRoleEditingId(context, editingRoleId) {
      context.commit('setRoleEditingId', editingRoleId)
    },
    setRoleActionPerform(context, addingRole) {
      context.commit('setRoleActionPerform', addingRole)
    },
   
  },

}