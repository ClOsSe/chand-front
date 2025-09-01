import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import './assets/styles/main.css'
import { VueSpinnersPlugin } from 'vue3-spinners'

import { createI18n } from 'vue-i18n'

import { enLang } from './locales/en'
import { faLang } from './locales/fa'

const messages = {
  en: enLang,
  fa: faLang,
}

const i18n = createI18n({
  legacy: false, // برای استفاده از Composition API
  locale: 'en', // زبان پیش‌فرض
  fallbackLocale: 'en', // زبان جایگزین اگر ترجمه‌ای نبود
  messages,
})
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
app.use(i18n)

app.mount('#app')
