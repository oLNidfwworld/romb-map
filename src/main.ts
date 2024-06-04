import './assets/main.css'

import { createApp, h, provide } from 'vue'
import App from './App.vue'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VSelect } from 'vuetify/components'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { createYmaps } from 'vue-yandex-maps'

const vuetify = createVuetify({
  components: { VSelect },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
})

const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  cache,
  uri: '/bitrix/services/rbx.graphql/'
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app
  .use(
    createYmaps({
      apikey: 'a316fa7a-d938-437a-a585-972dba857f0a',
      initializeOn: 'onPluginInit'
    })
  )
  .use(vuetify)
  .mount('#app')
