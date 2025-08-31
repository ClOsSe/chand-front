// PriceStore.ts
import { defineStore } from 'pinia'

export const usePanel = defineStore('usePanel', {
  state: () => ({
    panelSelection: [] as string[],
    viewModel: (localStorage.getItem('viewModel') || '') as string,
    priceChangeColor: (localStorage.getItem('priceChangeColor') || '') as string,
    buyPrice: (localStorage.getItem('buyPrice') || '') as string,
    calender: (localStorage.getItem('calender') || '') as string,
    language: (localStorage.getItem('language') || '') as string,
  }),

  getters: {
    getPanelSelection: (state) => state.panelSelection,
    isSelected: (state) => (item: string) => state.panelSelection.includes(item),

    getViewModel: (state) => state.viewModel,
    getPriceChangeColor: (state) => state.priceChangeColor,
    getBuyPrice: (state) => state.buyPrice,
    getCalender: (state) => state.calender,
    getLanguage: (state) => state.language,
  },
  actions: {
    addSetting(setting: string) {
      if (!this.panelSelection) {
        this.panelSelection = []
      }
      if (this.panelSelection.includes(setting)) {
        console.log('This setting is active')
      } else {
        this.panelSelection.push(setting)
        localStorage.setItem('panelSelection', JSON.stringify(this.panelSelection))
      }
    },
    removeSetting(setting: string) {
      if (!this.panelSelection) {
        this.panelSelection = []
      }
      if (this.panelSelection.includes(setting)) {
        this.panelSelection = this.panelSelection.filter((c) => c !== setting)
        localStorage.setItem('panelSelection', JSON.stringify(this.panelSelection))
      }
    },

    setViewModel(state: string) {
      if (!state) return
      this.viewModel = state
      localStorage.setItem('viewModel', this.viewModel)
    },
    setPriceChangeColor(state: string) {
      if (!state) return
      this.priceChangeColor = state
      localStorage.setItem('priceChangeColor', this.priceChangeColor)
    },
    setBuyPrice(state: string) {
      if (!state) return
      this.buyPrice = state
      localStorage.setItem('buyPrice', this.buyPrice)
    },
    setCalender(state: string) {
      if (!state) return
      this.calender = state
      localStorage.setItem('calender', this.calender)
    },
    setLanguage(state: string) {
      if (!state) return
      this.language = state
      localStorage.setItem('language', this.language)
    },
  },
})
