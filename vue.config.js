const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // Relativo: funciona na raiz do Netlify e servido de subpasta.
  publicPath: '',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      css: {
        // Assets de public/ são referenciados por caminho absoluto no CSS
        // (ex.: url('/marca/hamburguer.webp')). Sem o filtro o css-loader
        // tenta resolver como módulo e o build quebra.
        url: { filter: (url) => !url.startsWith('/') }
      }
    }
  },
  pluginOptions: {
    vuetify: {}
  }
})
