<template>
  <div  v-if="showCountryList"   
    class="absolute bottom-full left-1 mb-2 w-52 bg-white 
    shadow-lg rounded-xl border border-gray-200 z-50 max-h-[calc(100vh-6rem)] overflow-y-auto">
    <div v-for="(item,index) in state.getPrice" :key="index">
      <ul class="divide-y divide-gray-200">
        <li @click="addCountry(item.ab)" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <div class="flex justify-between" :class="[countries.getCountryFAVList.includes(item.ab) ? 'text-black' :'']">
            <div class="flex">
              <svg v-if="countries.getCountryFAVList.includes(item.ab)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mr-1" >
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              <span v-if="useLang.getlang === 'en'" >
                {{ item.en }}
              </span>
              <span v-if="useLang.getlang === 'fa'">
                {{ item.fa }}
              </span>
            </div>
            <div>
              <span class="">
                <img v-if="flagCdnMap[item.ab]" :src="`https://flagcdn.com/24x18/${flagCdnMap[item.ab]}.png`"  :alt="item.ab.toUpperCase()" class="w-6 h-6 rounded-full bg-cover bg-center" />
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    </div>
</template>
<script setup lang="ts">
import { flagCdnMap } from '@/scripts/const/const';
import { countryList } from '@/stores/FAVCountrylistStore';
import { lang } from '@/stores/LanguageStore';
import { usePrice } from '@/stores/PriceStore';
const state = usePrice()
const useLang = lang();
const countries = countryList();

const addCountry = (countryName:string) =>{
  countries.addRemoveCountry(countryName)
}

defineProps<{
  showCountryList:boolean
}>()
</script>

