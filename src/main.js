// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Uimini from 'uimini/dist/css/uimini.min.css'
import Animate from 'animate.css'

import App from './App'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'

Vue.config.productionTip = false

Vue.use(
  Vuelidate,
  Uimini,
  Animate
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    let config = {
      apiKey: 'AIzaSyDlIrz5THo8eDbON2STUOcxLeux18lw8LQ',
      authDomain: 'film-labrary.firebaseapp.com',
      databaseURL: 'https://film-labrary.firebaseio.com',
      projectId: 'film-labrary',
      storageBucket: 'film-labrary.appspot.com',
      messagingSenderId: '753392222711',
      appId: '1:753392222711:web:79578f8acf646ab7'
    }
    // Initialize Firebase
    firebase.initializeApp(config)

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('loggedUser', user)
        console.log(user.uid)
      }
      this.$store.dispatch('loadTasks')
    })
  }
})
