import firebase from 'firebase/app'

export default {
  state: {
    users: []
  },
  mutations: {
    loadUsers (state, payload) {
      state.users = payload
    }
  },
  actions: {
    async loadUsers ({commit}) {
      try {
        const user = await firebase.database().ref('users').once('value')
        const users = user.val()
        const usersArray = []
        Object.keys(users).forEach(key => {
          const u = users[key]
          usersArray.push({
            email: u.email,
            password: u.password
          })
        })
        commit('loadUsers', usersArray)
      } catch (e) {
        console.log(e)
        throw e
      }
    }
  },
  getters: {
    getUser (state) {
      return state.users
    }
  }
}
