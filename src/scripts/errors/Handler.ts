// src/scripts/ErrorHandler.ts
import { ref } from 'vue'
import { AxiosError } from 'axios'

export const errorMessage = ref('')

export const handleError = (error: unknown) => {
  console.error('Caught Error:', error)

  if (isAxiosError(error)) {
    if (error.response) {
      // اگه سرور پیام داده
      errorMessage.value =
        (error.response.data as { message?: string }).message || 'خطای سرور رخ داد'
    } else if (error.request) {
      errorMessage.value = 'عدم ارتباط با سرور'
    } else {
      errorMessage.value = error.message
    }
  } else if (error instanceof Error) {
    // خطای معمولی JS
    errorMessage.value = error.message
  } else {
    // اگه اصلا Error نیست
    errorMessage.value = 'خطای ناشناخته'
  }
}

// Type guard برای AxiosError
function isAxiosError(err: unknown): err is AxiosError {
  return (err as AxiosError).isAxiosError !== undefined
}
