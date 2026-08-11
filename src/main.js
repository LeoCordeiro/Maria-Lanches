import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './assets/theme.css'
import revelar from './directives/revelar'

createApp(App)
  .directive('revelar', revelar)
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .mount('#app')
