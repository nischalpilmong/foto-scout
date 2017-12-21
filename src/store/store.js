import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// Load vuex i18n module
import vuexI18n from 'vuex-i18n'

import getters from './getters'
import setters from './setters'
import mutations from './mutations'

const store = new Vuex.Store({
  state: {
    language: 'en',
    location: {}
  },

  getters,
  setters,
  mutations
})

// Initialize the internationalization plugin on the vue instance
Vue.use(vuexI18n.plugin, store)

const translationsEn = {
  'searchText': 'Enter location to search'
}

// translations can be kept in separate files for each language
// i.e. resources/i18n/de.json.
const translationsDe = {
  'searchText': 'Geben Sie den zu suchenden Ort ein'
}

// Add translations directly to the application
Vue.i18n.add('en', translationsEn)
Vue.i18n.add('de', translationsDe)

// Set English as the default locale
Vue.i18n.set('en')

export default store