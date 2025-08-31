// PriceStore.ts
import { defineStore } from 'pinia'
import type { Currency } from '@/scripts/models/CurrencyInfo'

export const usePrice = defineStore('price', {
  state: () => ({
    currencies: [] as Currency[], // reactive array
  }),
  getters: {
    getPrice: (state) => state.currencies,
  },
  actions: {
    setPrice(prices: Currency[]) {
      this.currencies = prices
    },
  },
})
