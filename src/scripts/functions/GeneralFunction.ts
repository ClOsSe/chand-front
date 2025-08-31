export const formatNumber = (num?: number) => {
  if (num == null || isNaN(num)) return '-' // اگر مقدار نبود یا NaN بود

  if (num < 1_000_000) {
    return num.toLocaleString('en-US') // 123456 => "123,456"
  } else {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
    // 14800000 => "14.8M"
    // 2000000 => "2M" (بدون .0 اضافی)
  }
}

export const formatNumberChange = (num: number) => {
  if (num < 1_000) {
    return num.toFixed(2) // عدد کوچیک بدون تغییر
  } else if (num < 1_000_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K' // هزارها
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M' // میلیون‌ها
  }
  return num.toFixed(2)
}

export const getFormattedDate = () => {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0') // ماه +1 چون از 0 شروع میشه
  const day = String(now.getDate()).padStart(2, '0')

  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')

  return `${year}/${month}/${day} ${hours}:${minutes}`
}

// تاریخ و زمان شمسی
export const getPersianDate = () => {
  const now = new Date()
  const persianFormatter = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const parts = persianFormatter.formatToParts(now)
  return `${parts[0].value}/${parts[2].value}/${parts[4].value} ${parts[6].value}:${parts[8].value}`
}
// --- تابع انگلیسی با timestamp ---
export const timeAgoEn = (pastTimestamp: number) => {
  const now = Date.now()
  const diff = (now - pastTimestamp) / 1000 // تفاوت به ثانیه

  if (diff < 60) return 'moments ago'
  if (diff < 3600) {
    const mins = Math.floor(diff / 60)
    return mins === 1 ? 'a minute ago' : `${mins} minutes ago`
  }
  if (diff < 7200) return 'about an hour ago'
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600)
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`
  }
  if (diff < 172800) return 'yesterday'
  if (diff < 604800) {
    const days = Math.floor(diff / 86400)
    return days === 1 ? '1 day ago' : `${days} days ago`
  }
  const weeks = Math.floor(diff / 604800)
  return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
}

// --- تابع فارسی با timestamp ---
export const timeAgoFa = (pastTimestamp: number) => {
  const now = Date.now()
  const diff = (now - pastTimestamp) / 1000 // تفاوت به ثانیه

  if (diff < 60) return 'لحظاتی پیش'
  if (diff < 3600) {
    const mins = Math.floor(diff / 60)
    return mins === 1 ? 'یک دقیقه پیش' : `${mins} دقیقه پیش`
  }
  if (diff < 7200) return 'حدود یک ساعت پیش'
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600)
    return hours === 1 ? 'یک ساعت پیش' : `${hours} ساعت پیش`
  }
  if (diff < 172800) return 'دیروز'
  if (diff < 604800) {
    const days = Math.floor(diff / 86400)
    return days === 1 ? 'یک روز پیش' : `${days} روز پیش`
  }
  const weeks = Math.floor(diff / 604800)
  return weeks === 1 ? 'یک هفته پیش' : `${weeks} هفته پیش`
}

export const setLocalstorageLang = (lang: string) => {
  if (!lang) return
  switch (lang) {
    case 'en':
      localStorage.setItem('lang', 'en')
      break
    default:
      localStorage.setItem('lang', 'fa')
      break
  }
}
