import './assets/main.css'

import { createApp, h, provide } from 'vue'
import App from './App.vue'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: '/bitrix/services/rbx.graphql/'
})

// const apolloProvider = createApolloProvider({
//   defaultClient: apolloClient
// })

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.mount('#app')
