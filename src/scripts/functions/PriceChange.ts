type Price = {
  bp: number
  sp: number
  ts: string
}

// export const summary = (data: Price[]) => {
//   if (!data || data.length === 0) return null

//   const minPrice = Math.min(...data.map((d) => d.bp))
//   const maxPrice = Math.max(...data.map((d) => d.bp))

//   const first = data[data.length - 1] // قدیمی‌ترین
//   const last = data[0] // جدیدترین

//   const change = last.bp - first.bp
//   const trend = change > 0 ? '↑' : change < 0 ? '↓' : '→'

//   return {
//     high: maxPrice,
//     low: minPrice,
//     last: last.bp,
//     change: `${trend}${Math.abs(change)}`,
//   }
// }
export const summary = (data: Price[]) => {
  if (!data || data.length === 0) return null

  const getValue = (d: Price) => (d.bp !== undefined ? d.sp : d.bp)
  const prices = data.map(getValue).filter((v) => v !== undefined) as number[]
  if (prices.length === 0) return null

  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  const latestValue = getValue(data[0])! // جدیدترین
  const oldestValue = getValue(data[data.length - 1])! // قدیمی‌ترین

  const change = latestValue - oldestValue
  const trend = change > 0 ? '↑' : change < 0 ? '↓' : '→'

  return {
    high: maxPrice,
    low: minPrice,
    last: latestValue,
    change: `${trend}${Math.abs(change)}`,
  }
}
