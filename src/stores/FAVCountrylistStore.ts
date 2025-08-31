// PriceStore.ts
import { defineStore } from 'pinia'

export const countryList = defineStore('countryies', {
  state: () => ({
    countryFAVList: JSON.parse(localStorage.getItem('favoriteCountries') || '[]') as string[],
  }),

  getters: {
    getCountryFAVList: (state) => state.countryFAVList,
    // بررسی اینکه یک کشور توی لیست هست یا نه
    isFavorite: (state) => (country: string) => state.countryFAVList.includes(country),

    // مرتب‌سازی لیست الفبایی
    sortedFavorites: (state) => [...state.countryFAVList].sort(),

    // تعداد کشورها
    favoritesCount: (state) => state.countryFAVList.length,
  },
  actions: {
    addRemoveCountry(country: string) {
      if (!this.countryFAVList) {
        this.countryFAVList = []
      }
      console.log(this.countryFAVList)
      if (this.countryFAVList.includes(country)) {
        this.countryFAVList = this.countryFAVList.filter((c) => c !== country)
      } else {
        this.countryFAVList.push(country)
      }
      // به‌روز کردن localStorage بعد از هر تغییر
      localStorage.setItem('favoriteCountries', JSON.stringify(this.countryFAVList))
    },
  },
})
