// // هر رکورد قیمت در بازه زمانی
export interface PriceSnapshot {
  bp: number // Buy Price
  sp: number // Sell Price
  ts: string // ISO Timestamp
}

// اطلاعات کلی یک ارز
export interface currency {
  ab: string // Abbreviation (e.g. "usd")
  av: string // Flag (e.g. "🇺🇸")
  en: string // English Name (e.g. "US Dollar")
  fa: string // Persian Name (e.g. "دلار آمریکا")
  ty: 'cu' | string // Type (cu = currency)
  ps: PriceSnapshot[] // List of price snapshots
}

export default class CurrencyModel {
  currencyList?: Currency[] = []
  constructor(data: Currency[]) {
    if (!data) return
    data.forEach((item) => {
      this.currencyList?.push(new Currency(item))
    })
  }
}
export class Currency {
  ab!: string
  av!: string
  en!: string
  fa!: string
  ty!: 'cu'
  ps!: PriceSnapshot[]

  constructor(data: currency) {
    Object.assign(this, data)
  }
}
