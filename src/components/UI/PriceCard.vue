<template>
  <div class="flex justify-center items-center m-1">
    <div class="bg-white dark:bg-white-100 rounded-3xl px-3 py-6 ring shadow-xl ring-gray-900/5 w-75 " :class="[viewModel === 'Grid' ? 'w-75' : 'w-100']">
      <div class="flex justify-between" >
        <span class="">
          <img  :src="`src/assets/icons/${flag}.jpg`"  :alt="flag.toUpperCase()" class="w-6 h-6 rounded-full bg-cover bg-center" />
        </span>
        <div class="">
          <p class="text-gray-500 dark:text-gray-400 mt-0 r-0 text-xs text-right">
            <span v-if="useLang.getlang === 'en'">
              {{ entitle }}
            </span>
            <span v-if="useLang.getlang === 'fa'">
              {{ fatitle }}
            </span>
          </p>
          <p class="uppercase text-gray-500 dark:text-gray-400 mt-0 r-0 text-xs text-right" >
            {{ flag}}
          </p>
        </div>
      </div>
      <h3 class="text-red-500 dark:text-red mt-9 text-base font-medium tracking-tight ">{{ summary(priceList)?.change }}</h3>
      <p class="text-black dark:text-black mt-0 text-3xl font-medium">
        {{ formatNumber(summary(priceList)?.last) }}
      </p>
    </div>
  </div>
  <!-- <div class="flex justify-center items-center ">
    <GoogleAds class="mt-8 mb-8 ml-1 mr-1 w-133" v-if="(index >1 && index%4===0)" :image-u-r-l="'asd'" :index="1"/>
  </div> -->
</template>

<script setup lang="ts">


import { formatNumber } from '@/scripts/functions/GeneralFunction';
import { summary } from '@/scripts/functions/PriceChange';
import { lang } from '@/stores/LanguageStore';
import { usePanel } from '@/stores/PanelStore';
import { computed } from 'vue';
const panelState = usePanel();


const useLang = lang();

const viewModel = computed(() => {
    return panelState.getViewModel;
});
type Price = {
  bp: number
  sp: number
  ts: string
}

defineProps<{
  country: string
  flag: string  // می‌تونه ایموجی باشه
  entitle:string
  fatitle:string
  sambol:string
  priceList:Price[]
}>()
</script>
