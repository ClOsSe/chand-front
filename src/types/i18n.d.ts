// src/types/i18n.d.ts
export interface PanelTranslations {
  'view-model': string
  'view-model-option': {
    grid: string
    list: string
  }
  'price-change-color': string
  'price-change-color-option': {
    normal: string
    reversed: string
  }
  'buy-price': string
  'buy-price-option': {
    Hidden: string
    'show-if-available': string
  }
  calender: string
  'calender-option': {
    georgian: string
    persian: string
  }
  language: string
  'language-option': {
    english: string
    persian: string
  }
  "'widgets-guide'": string
  version: string
}

export interface Translations {
  panel: PanelTranslations
}
