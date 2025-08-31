// PriceStore.ts
import { defineStore } from 'pinia'

export const lang = defineStore('lang', {
  state: () => ({
    lang: (localStorage.getItem('language') || 'en') as string,
  }),
  getters: {
    getlang: (state) => state.lang,
  },
  actions: {
    setlang(lang: string) {
      this.lang = lang
      localStorage.setItem('lang', this.lang)
    },
  },
})
