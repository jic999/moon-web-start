import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'uno.css'
import '@/styles/index.scss'
// import 'default-passive-events';

// const meta = document.createElement('meta')
// meta.name = 'naive-ui-style'
// document.head.appendChild(meta)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
