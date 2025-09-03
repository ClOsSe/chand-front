<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-t from-orange-100 to-gray-100">
  <AppHeader title="Now Chand?!" />
  <main ref="content" class="flex flex-col items-center  flex-grow w-full">
    <div v-show="loading" class="flex justify-center items-center">
      <VueSpinnerTail size="90" class="mt-10" :loading="false" color="gray" />
    </div>

    <div v-if="checkyourNetwork && !loading" class="flex flex-col items-center">
      <h1>Network Connectivity Issues</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 bounce-svg mt-2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
      </svg>
      <h6 class="mt-2">Fix the issue and pull down to refresh</h6>
    </div>

    <div v-if="!loading && !checkyourNetwork" class="flex flex-col items-center w-full">
      <AppContent class="flex-grow" />
    </div>
  </main>

  <footer class="mt-auto flex justify-center items-center w-full fixed bottom-2.5">
    <AppFooter class="w-11/12 md:w-3/4" />
  </footer>
  <div v-if="state.getShowChart" ref="chart"  class=" w-full fixed bottom-0 ">
    <PriceChart  />
  </div>
</div>

</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppContent from '@/components/layout/AppContent.vue'
import { getLatestPrice } from '@/scripts/common/GetPrices';
import { usePrice } from '@/stores/PriceStore';
import { onMounted ,onUnmounted,ref} from 'vue'
import { lastUpdate } from '@/stores/UpdateTime';
import { lang } from '@/stores/LanguageStore';
import { setLocalstorageLang } from '@/scripts/functions/GeneralFunction';
import { toast } from 'vue3-toastify';
import { VueSpinnerTail } from 'vue3-spinners'
import PriceChart from '@/components/UI/PriceChart.vue';

const timeState = lastUpdate();
const useLang = lang();

const state = usePrice()

const loading = ref(true)
const checkyourNetwork = ref(false)

const content = ref<HTMLElement | null>(null);
const chart = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node
  if (state.getShowChart) {
    if (chart.value?.contains(target)) return
    if (content.value?.contains(target)) {
      state.toggleChart(false)
    }
  }
}


onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

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
