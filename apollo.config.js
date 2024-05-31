module.exports = {
  client: {
    service: {
      name: 'my-app',
      // URL to the GraphQL API
      url: 'https://romb-art.ru/bitrix/services/rbx.graphql/'
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.js']
  }
}
