// PriceStore.ts
import { defineStore } from 'pinia'

export const lastUpdate = defineStore('time', {
  state: () => ({
    lastTimeUpdate: 0, // reactive array
  }),
  getters: {
    getLastTimeUpdate: (state) => state.lastTimeUpdate,
  },
  actions: {
    setLastTimeUpdate(date: number) {
      this.lastTimeUpdate = date
    },
  },
})
