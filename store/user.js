export const state = () => ({
  user: {}
})

export const mutations = {
  setUser(state, data) {
    state.user = data
  },
}
