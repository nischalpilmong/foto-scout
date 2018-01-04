import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Load vuex i18n module
import vuexI18n from 'vuex-i18n'

import getters from './getters'
import setters from './setters'
import mutations from './mutations'
import actions from './actions'

// load translation files
import translationsEn from './translations/en.json'
import translationsDe from './translations/de.json'

// Initialize the Vuex store
const store = new Vuex.Store({
  state: {
    language: 'en',
    search: {
      location: {
        lat: 51.1657,
        lng: 10.4515,
        name: '',
      },
      options: {
        categories: {},
        radius: 50 // in km
      }
    },
    user: {},
    images: [],
    imageCategories: {
      'all': 'All',
      'architecture': 'Architecture',
      'landscape': 'Landscape',
      'portait': 'Portait',
      'cityscape': 'Cityscape'
    },
    groups: []
  },

  getters,
  setters,
  mutations,
  actions
})

// Initialize the internationalization plugin on the vue instance
Vue.use(vuexI18n.plugin, store)

// Add translations directly to the application
Vue.i18n.add('en', translationsEn)
Vue.i18n.add('de', translationsDe)

// Set English as the default locale
Vue.i18n.set('en')

export default store
