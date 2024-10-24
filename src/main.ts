import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { mockEntityApi } from '@/api/mockEntity'

const app = createApp(App, {
  apiLoader: mockEntityApi,
})

app.use(router)

app.mount('#app')
