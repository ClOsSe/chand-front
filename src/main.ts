import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import './assets/styles/main.css'
import { VueSpinnersPlugin } from 'vue3-spinners'

const options: ToastContainerOptions = {
  autoClose: 2000,
  // گزینه‌های دلخواه دیگه...
  transition: 'slide',
  closeButton: false,
  closeOnClick: true,
  bodyClassName: 'bg-green',
  multiple: false,
  dangerouslyHTMLString: true,
  limit: 1,
  style: {
    // background: '#4CAF50', // رنگ دلخواه
    color: '#fff', // رنگ متن
  },
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Toastify, options)
app.use(VueSpinnersPlugin)

app.mount('#app')
