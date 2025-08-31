<template>
  <header class="p-4 text-center mt-5">
    <div class="flex justify-between ">
      <h1 class="text-4xl text-black font-bold text-4xl  ">
        {{ title }}
      </h1>
      <p v-if="panelState.getCalender === 'Persian'" class="text-xs font-medium mt-5 dark:text-gray-500">{{getPersianDate()}}</p>
      <p v-else class="text-xs font-medium mt-5 dark:text-gray-500">{{getFormattedDate()}}</p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { getFormattedDate, getPersianDate } from '@/scripts/functions/GeneralFunction';
import { usePanel } from '@/stores/PanelStore';
const panelState = usePanel();

defineProps<{ title: string }>()
</script>
