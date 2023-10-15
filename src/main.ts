import 'uno.css'
import '@/styles/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { setupI18n } from './utils'

const app = createApp(App)

async function setupApp() {
  await setupI18n(app)
  app.use(createPinia())
  app.use(router)
  app.mount('#app')
}

setupApp()
