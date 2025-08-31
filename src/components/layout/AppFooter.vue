<template>
    <div class="flex justify-between text-center bg-white dark:bg-white-100 rounded-2xl px-5 py-3 mb-3  shadow-xl w-100 relative">
      <div>
        <!-- list -->
        <button  ref="countryBtnRef" @click="showCuntryList">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
        <!-- list btn -->
        <div ref="countryListRef">
          <CountryList  :showCountryList="showCountryList" />
        </div>
      </div>
      
      <!-- last update status -->
      <h3 class="text-gray-500 dark:text-gray-400 mt-0 r-0 text-xs text-right">
        {{lastUpdateTime}}
      </h3>
      <div>
        <!-- panel btn -->
        <button ref="panelBtnRef" @click="togglePanel">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </button>
        <!-- panel -->
        <div  ref="panelRef">
          <PanelOption :showPanel="showPanel" />
        </div>
      </div>
    </div>

    
</template>

<script setup lang="ts">
import { timeAgoEn, timeAgoFa } from '@/scripts/functions/GeneralFunction';
const state = lastUpdate();
import { lang } from '@/stores/LanguageStore';
import { lastUpdate } from '@/stores/UpdateTime';
import { onMounted ,ref ,onUnmounted, watch} from 'vue';
import  PanelOption  from '../UI/PanelOption.vue'
import  CountryList  from '../UI/CountryList.vue'

const useLang = lang();


const lastUpdateTime = ref('')
const intervalId = ref(-1);
const lastTimeUpdateTimer = ref(60000); // timer for last update status

const showPanel = ref(false)
const showCountryList = ref(false)

const togglePanel = () => {
  showPanel.value = !showPanel.value
  showCountryList.value = false

}

onMounted(()=>{
  updateStatus();
  intervalId.value = setInterval(updateStatus, lastTimeUpdateTimer.value);
})
onUnmounted(() =>clearInterval(intervalId.value))

const updateStatus =()=>{
  if(useLang.getlang === 'en'){
    lastUpdateTime.value = timeAgoEn(state.getLastTimeUpdate)
  }else if(useLang.getlang === 'fa'){
    lastUpdateTime.value = timeAgoFa(state.getLastTimeUpdate)
  }
}

watch(()=>state.getLastTimeUpdate,()=>{
  updateStatus();
})


const showCuntryList = () => {
  showCountryList.value = !showCountryList.value
  showPanel.value = false
}



// رفرنس برای خود کانتینر لیست و دکمه
const countryListRef = ref<HTMLElement | null>(null);
const countryBtnRef = ref<HTMLElement | null>(null);

const panelBtnRef = ref<HTMLElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);

// تابع برای چک کردن کلیک خارج از هر ۴ المان
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;

  // برای لیست کشور
  if (
    countryListRef.value &&
    !countryListRef.value.contains(target) &&
    countryBtnRef.value &&
    !countryBtnRef.value.contains(target)
  ) {
    showCountryList.value = false;
  }

  // برای پنل
  if (
    panelRef.value &&
    !panelRef.value.contains(target) &&
    panelBtnRef.value &&
    !panelBtnRef.value.contains(target)
  ) {
    showPanel.value = false;
  }
};



onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

</script>
