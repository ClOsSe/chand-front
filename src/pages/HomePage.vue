<template>
  <div class="flex flex-col min-h-screen bg-linear-to-t from-orange-100 to-gray-100 ">
    <AppHeader title="Chand?!" />
    <div>
      <div class="flex justify-center items-center" v-show="loading">
        <VueSpinnerTail size="90" class="mt-10" :loading="false" color="gray" /><br/>
      </div>
      <div v-if="checkyourNetwork && !loading" >
        <div class="flex justify-center">
          <h1>Network Connectivity Issues</h1>
        </div>
        <br>
         <div class="flex flex-row justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 bounce-svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
            />
          </svg>
        </div>
        <div class="flex flex-row justify-center mt-2">
          <h6>Fix the issue and pull down to refresh</h6>
        </div>
      </div>
      <div v-if="!loading && !checkyourNetwork">
        <AppContent class="flex-grow" />
        <footer class="footer footerbox-pos full-width flex justify-center items-center">
          <AppFooter class="width90" />
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppContent from '@/components/layout/AppContent.vue'
import { getLatestPrice } from '@/scripts/common/GetPrices';
import { usePrice } from '@/stores/PriceStore';
import { onMounted ,ref} from 'vue'
import { lastUpdate } from '@/stores/UpdateTime';
import { lang } from '@/stores/LanguageStore';
import { setLocalstorageLang } from '@/scripts/functions/GeneralFunction';
import { toast } from 'vue3-toastify';
import { VueSpinnerTail } from 'vue3-spinners'
const timeState = lastUpdate();
const useLang = lang();

const state = usePrice()

const loading = ref(true)
const checkyourNetwork = ref(false)

const getPrice = async () => {
  try{

    const pricesList = await getLatestPrice();
    state.setPrice(pricesList)
    timeState.setLastTimeUpdate(new Date().getTime());
    setTimeout(() => {
      checkyourNetwork.value=false
      loading.value=false;
      toast(useLang.getlang === 'fa' ? 'لیست بروز شد' : 'List successfuly updated', {
        "type": "success",
      })
    }, 900);
  }catch(err){
    console.log('err',err)
    loading.value=false;
    checkyourNetwork.value=true
  }

}

onMounted(async () => {
  loading.value=true;
  await getPrice();
  initPullToRefresh();
  if(localStorage.getItem('lang')){
    useLang.setlang(localStorage.getItem('lang')+'')
    setLocalstorageLang(useLang.getlang)
  }else{
    useLang.setlang('en')
    setLocalstorageLang(useLang.getlang)
  }
})

let startY = 0;
let isPulling = false;
let hasRefreshed = false; // برای جلوگیری از چند بار اجرا

const initPullToRefresh = () => {
  const threshold = 150; // پیکسل لازم برای فعال شدن رفرش

  window.addEventListener('touchstart', (e) => {
    if (window.scrollY === 0) { // فقط وقتی صفحه بالاست
      startY = e.touches[0].clientY;
      isPulling = true;
      hasRefreshed = false; // ریست هنگام شروع لمس جدید
    }
  });

  window.addEventListener('touchmove', async (e) => {
    if (!isPulling || hasRefreshed) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;

    if (diff > threshold) {
      hasRefreshed = true; // حالا شرط دیگر اجرا نمی‌شود
      loading.value=true;
      await getPrice();
    }
  });

  window.addEventListener('touchend', () => {
    isPulling = false;
  });
}


initPullToRefresh();


</script>

<style>
@keyframes bounce {
  200% {
    transform: translateY(0);
    opacity: 1;
  }
  0% {
    transform: translateY(-10px); /* ارتفاع حرکت */
    opacity: 0.7;
  }
}

.bounce-svg {
  animation: bounce 1s ease-in-out infinite;
} 
</style>
