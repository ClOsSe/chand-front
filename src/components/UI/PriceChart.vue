<template>
  <div class="w-full p-0 m-0 flex justify-center grid shadow-lightgray rounded-tl-2xl rounded-tr-2xl bg-white">
    <div class="h-20 w-100 flex justify-between ml-3">
      <!-- info -->
      <div class="flex">
        <img  :src="`/icons/${priceState.getChartPriceList.ab}.jpg`"  :alt="priceState.getChartPriceList.ab.toUpperCase()" class=" rounded-full bg-cover bg-center w-12 h-12 mr-5 mt-5" />
        <div class="mt-5">
          <p v-if="lantState.getlang === 'en'">{{priceState.getChartPriceList.en}}</p>
          <p v-if="lantState.getlang === 'fa'">{{priceState.getChartPriceList.fa}}</p>
          <p class="uppercase text-gray-500">{{priceState.getChartPriceList.ab}}</p>
        </div>
      </div>
      <!-- close -->
      <div @click="priceState.toggleChart(false)" class="mt-5">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 text-gray-600">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
    <!-- price -->
    <div class="ml-3 mb-2">
      <!-- change -->
       <h3 class="dark:text-red text-base font-medium tracking-tight" :class="[panelState.getPriceChangeColor === 'Normal' ? 'text-red-500' : 'text-green-600']">
        {{ summary(priceState.chartPriceList.ps)?.changeWithSeparate }}
      </h3>
       <!-- price -->
        <span class="text-black dark:text-black mt-0 f-s-48 f-f-vazir-bold">{{separateThousands(parseInt(summary(priceState.chartPriceList.ps)?.last+'')) }}</span>
       <!-- min / max -->
        <span class="flex">
          <p class="mr-2 text-gray-500 f-f-vazir-light">H: <span class="text-black">
            {{separateThousands(parseInt(summary(priceState.chartPriceList.ps)?.high+'') )}} 
          </span>
        </p>
          <p class="mr-2 text-gray-500 f-f-vazir-light">L: <span class="text-black">
            {{separateThousands(parseInt(summary(priceState.chartPriceList.ps)?.low+'')) }}
          </span>
        </p>
        </span>
    </div>
    <!-- chart -->
    <div class="w-full">
      <Line v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  type ChartData,
  type ChartOptions
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { ref, onMounted, watch } from 'vue'
import { usePrice } from '@/stores/PriceStore';
import { lang } from '@/stores/LanguageStore';
import { summary } from '@/scripts/functions/PriceChange';
import { usePanel } from '@/stores/PanelStore';
import { separateThousands } from '@/scripts/functions/GeneralFunction';
const priceState = usePrice();
const lantState = lang();
const panelState = usePanel();


ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
)

const chartData = ref<ChartData<'line'>>()
const chartOptions = ref<ChartOptions<'line'>>({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  elements: {
    point: {
      radius: 0 
    }
  },
  scales: {
    x: {
      grid: { display: false }
    },
    y: {
      grid: { display: false },
      ticks: { display: false } 
    }
  }
})
const hours = priceState.chartPriceList.ps.map(price=>price.ts).map(ts => {
  const date = new Date(ts);
  return date.getUTCHours().toString().padStart(2, '0');
});

onMounted(() => {
  showChart()
})
const lightColor = ref('');
const color = ref('');
const chartLineBorder = ref('');
const showChart = ()=> {
  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) return

  const gradient = ctx.createLinearGradient(0, 0, 0, 400)
  color.value = panelState.getPriceChangeColor === 'Normal' ? 'rgba(239, 68, 68, 0.3)':  'rgba(16, 185, 129, 0.3)'
  lightColor.value = panelState.getPriceChangeColor === 'Normal' ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0)'
  chartLineBorder.value = panelState.getPriceChangeColor === 'Normal' ? '#ef4444' : '#10b981'
  gradient.addColorStop(0, color.value) // قرمز روشن
  gradient.addColorStop(1, lightColor.value) // شفاف

  chartData.value = {
    labels: hours,
    datasets: [
      {
        data: priceState.chartPriceList.ps.map(price => price.sp),
        borderColor: chartLineBorder.value,
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        backgroundColor: gradient
      }
    ]
  }
}
watch(
  () => priceState.chartPriceList.ps,
  () => {
    showChart()
  },
  { deep: true } // برای اینکه تغییرات داخل آرایه هم دیده شوند
)


</script>

