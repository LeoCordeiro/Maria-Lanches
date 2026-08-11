// Sem `import 'vuetify/styles'`: o bundle global custa ~244 KB de CSS e este
// site usa o Vuetify como shell + alguns componentes. O webpack-plugin-vuetify
// injeta o CSS só dos componentes realmente usados; a identidade vem do
// theme.css. Se um dia precisar das classes utilitárias do Vuetify
// (d-flex, ma-4, text-h4), aí sim o import global passa a ser necessário.
import { createVuetify } from 'vuetify'

// Paleta oficial, tirada do SVG da logo. Nenhum componente hardcoda hex:
// aqui e no theme.css são os dois únicos lugares onde a cor é escrita.
export const paleta = {
  vermelho: '#E61010',
  vermelhoEscuro: '#B70A0A',
  laranja: '#FF9112',
  amarelo: '#FFC629',
  escuro: '#181510',
  creme: '#FFF8F0',
  branco: '#FFFFFF',
}

export default createVuetify({
  theme: {
    defaultTheme: 'mari',
    themes: {
      mari: {
        dark: false,
        colors: {
          primary: paleta.vermelho,
          secondary: paleta.laranja,
          accent: paleta.amarelo,
          background: paleta.creme,
          surface: paleta.branco,
          escuro: paleta.escuro,
          amarelo: paleta.amarelo,
          error: paleta.vermelhoEscuro,
          success: '#2E7D32',
          'on-primary': paleta.branco,
          'on-secondary': paleta.escuro,
          'on-accent': paleta.escuro,
          'on-background': paleta.escuro,
          'on-surface': paleta.escuro,
          'on-escuro': paleta.creme,
          'on-amarelo': paleta.escuro,
        },
      },
    },
  },
  defaults: {
    VBtn: { rounded: 'lg', ripple: true },
    VTextField: { variant: 'outlined', density: 'comfortable', color: 'primary', hideDetails: 'auto' },
    VTextarea: { variant: 'outlined', density: 'comfortable', color: 'primary', hideDetails: 'auto' },
    VSelect: { variant: 'outlined', density: 'comfortable', color: 'primary', hideDetails: 'auto' },
  },
})
