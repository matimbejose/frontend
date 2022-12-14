
export default {
  state: {
      editingManagerId: null,
      addingManager: true,
  },
  mutations: {
    setManagerEditingId(state, editingManagerId) {
      state.editingManagerId = editingManagerId
    },
    setManagerActionPerform(state, addingManager) {
      state.addingManager = addingManager
    }
  },
  actions: {
    setManagerEditingId(context, editingManagerId) {
      context.commit('setManagerEditingId', editingManagerId)
    },
    setManagerActionPerform(context, addingManager) {
      context.commit('setManagerActionPerform', addingManager)
    },
   
  },

}