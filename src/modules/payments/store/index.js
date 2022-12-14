
export default {
  state: {
    editingLoanPaymentId: null,
    addingLoanPayment: true,
    isFormMounted: false,
    isDepositFormMounted: false,
  },
  mutations: {
    setLoanPaymentEditingId(state, editingLoanPaymentId) {
      state.editingLoanPaymentId = editingLoanPaymentId
    },
    setLoanPaymentActionPerform(state, addingLoanPayment) {
      state.addingLoanPayment = addingLoanPayment
    },
    setIsFormMounted(state, isFormMounted) {
      state.isFormMounted = isFormMounted
    },
    setIsDepositFormMounted(state, isDepositFormMounted) {
      state.isDepositFormMounted = isDepositFormMounted
    },
  },
  actions: {
    setLoanPaymentEditingId(context, editingLoanPaymentId) {
      context.commit('setLoanPaymentEditingId', editingLoanPaymentId)
    },
    setLoanPaymentActionPerform(context, addingLoanPayment) {
      context.commit('setLoanPaymentActionPerform', addingLoanPayment)
    },
    setIsFormMounted(context, isFormMounted) {
      context.commit('setIsFormMounted', isFormMounted)
    },
    setIsDepositFormMounted(context, isDepositFormMounted) {
      context.commit('setIsDepositFormMounted', isDepositFormMounted)
    },
  },

}