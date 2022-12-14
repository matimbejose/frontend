
export default {
  state: {
    editingLoanId: null,
    showingLoanId: null,
    addingLoan: true,
    isMounted: false,
    loan: { laon: {} }
  },
  mutations: {
    setLoanEditingId(state, editingLoanId) {
      state.editingLoanId = editingLoanId
    },
    setLoanShowingId(state, showingLoanId) {
      state.showingLoanId = showingLoanId
    },
    setLoanActionPerform(state, addingLoan) {
      state.addingLoan = addingLoan
    },
    setLoanInfo(state, loan) {
      state.loan = loan
    },
    setIsMounted(state, isMounted) {
      state.isMounted = isMounted
    },
  },
  actions: {
    setLoanEditingId(context, editingLoanId) {
      context.commit('setLoanEditingId', editingLoanId)
    },
    setLoanShowingId(context, showingLoanId) {
      context.commit('setLoanShowingId', showingLoanId)
    },
    setLoanActionPerform(context, addingLoan) {
      context.commit('setLoanActionPerform', addingLoan)
    },
    setLoanInfo(context, loan) {
      context.commit('setLoanInfo', loan)
    },
    setIsMounted(context, isMounted) {
      context.commit('setIsMounted', isMounted)
    },

  },

}