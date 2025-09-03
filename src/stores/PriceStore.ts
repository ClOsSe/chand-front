// PriceStore.ts
import { defineStore } from 'pinia'
import type { Currency } from '@/scripts/models/CurrencyInfo'

export const usePrice = defineStore('price', {
  state: () => ({
    currencies: [] as Currency[], // reactive array;
    chartPriceList: {} as Currency,
    showChart: false as boolean,
  }),
  getters: {
    getPrice: (state) => state.currencies,
    getChartPriceList: (state) => state.chartPriceList,
    getShowChart: (state) => state.showChart,
  },
  actions: {
    setPrice(prices: Currency[]) {
      this.currencies = prices
    },
    setChartPriceList(currency: Currency) {
      this.chartPriceList = currency
    },
    toggleChart(visible: boolean) {
      this.showChart = visible
    },
  },
})
