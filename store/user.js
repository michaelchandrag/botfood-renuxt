export const state = () => ({
  user: {},
  dropdown: ''
})

export const mutations = {
  setUser(state, data) {
    state.user = data
  },
  setDropdown(state,data) {
    state.dropdown = data
  }
}

