<template>
  <main class="grid mb-20" :class="[viewModel === 'Grid' ? 'grid-cols-2' : 'grid-cols-1']">
    <div v-for="(item, index) in priceList" :key="index" >
      <PriceCard
        class="m-1"
        :index="index"
        :country="item.en" 
        :flag="item.ab" 
        :sambol="item.av" 
        :entitle="item.en" 
        :priceList="item.ps"
        :ty="item.ty"
        :fatitle="item.fa"  />
      </div>
    </main>
   
</template>


<script setup lang="ts">
import { usePrice } from '@/stores/PriceStore';
import PriceCard from '../UI/PriceCard.vue';
import { computed} from 'vue';
import { countryList } from '@/stores/FAVCountrylistStore';
import { usePanel } from '@/stores/PanelStore';
const state = usePrice();
const countries = countryList();
const panelState = usePanel();

const priceList = computed(() => {
  if (countries.favoritesCount>=1) {
    return state.getPrice.filter(item =>
      countries.getCountryFAVList.includes(item.ab)
    );
  }
  return state.getPrice;
});
const viewModel = computed(() => {
    return panelState.getViewModel;
});
</script>
