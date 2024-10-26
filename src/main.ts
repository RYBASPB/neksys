import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { mockEntityApi } from '@/api/mockEntity'

const app = createApp(App, {
  apiLoader: import.meta.env.DEV ? mockEntityApi : undefined,
})

app.use(router)
app.config.performance = true

app.mount('#app')
