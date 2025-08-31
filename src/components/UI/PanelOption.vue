<template>
  <div 
      v-if="showPanel" 
       class="absolute bottom-full right-1 mb-2 w-50 bg-white shadow-lg rounded-xl border border-gray-200 z-50"
    >
      <ul class="divide-y divide-gray-200">
        <li @click="toggleView('activeMenue')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between">
          <div class="flex">
            <svg v-if="activeMenue != 'activeMenue'" xmlns="http://www.w3.org/2000/svg" fill="none" 
              viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3 m-1 ml-0" 
              :class="[activeMenue === 'activeMenue' ?'text-black':'']"> 
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <svg v-if="activeMenue === 'activeMenue'" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3 m-1 ml-0" 
               :class="[activeMenue === 'activeMenue' ?'text-black':'']">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
            <p :class="[activeMenue === 'activeMenue' ?'text-black':'']">
              View Mode
            </p>
          </div>
          <svg :class="[activeMenue === 'activeMenue' ?'text-black':'']" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 m-1 mr-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </li>

        <!-- ساب‌منو -->
        <li v-if="ViewMode" class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between relative">
          <div class="absolute top-0 right-0 w-50 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
            <ul class="divide-y divide-gray-200">
              <li @click="addSettingToState('Grid')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex" :class="[panelState.getViewModel === 'Grid'? 'text-black':'']">
                <svg v-if="panelState.getViewModel === 'Grid'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mr-1" >
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Grid
              </li>
              
              <li @click="addSettingToState('List')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex" :class="[panelState.getViewModel === 'List'? 'text-black':'']">
                <svg v-if="panelState.getViewModel === 'List'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mr-1" >
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                List
              </li>
            </ul>
          </div>
        </li>

        <li @click="togglePriceChange('PriceChangeColor')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between">
          <div class="flex">    
            <svg v-if="activeMenue != 'PriceChangeColor'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3 m-1 ml-0 " 
            :class="[activeMenue === 'PriceChangeColor' ?'text-black':'']"> 
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <svg v-if="activeMenue === 'PriceChangeColor'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3 m-1 ml-0 "
            :class="[activeMenue === 'PriceChangeColor' ?'text-black':'']" >
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
            <p :class="[activeMenue === 'PriceChangeColor' ?'text-black':'']">
              Price Change Color
            </p>
          </div>
          <svg :class="[activeMenue === 'PriceChangeColor' ?'text-black':'']" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3 m-1 mr-0 " > 
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
          </svg>
        </li>
        <!-- ساب‌منو -->
        <li v-if="PriceChangeColor" class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between relative">
          <div class="absolute top-0 right-0 w-50 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
            <ul class="divide-y divide-gray-200">
              <li @click="addSettingToState('Normal')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex" :class="[panelState.getPriceChangeColor === 'Normal' ? 'text-black':'']">
                <svg v-if="panelState.getPriceChangeColor === 'Normal'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mr-1" >
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Normal
              </li>
              <li @click="addSettingToState('Reversed')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex" :class="[panelState.getPriceChangeColor === 'Reversed'? 'text-black':'']">
                <svg v-if="panelState.getPriceChangeColor === 'Reversed'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mr-1" >
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Reversed
              </li>
            </ul>
          </div>
        </li>

        <li @click="toggleBuyPrice('BuyPrice')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between">
          <div class="flex">
            <svg v-if="activeMenue != 'BuyPrice'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3 m-1 ml-0 " 
            :class="[activeMenue === 'BuyPrice' ?'text-black':'']"> 
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <svg v-if="activeMenue === 'BuyPrice'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3 m-1 ml-0 "
            :class="[activeMenue === 'BuyPrice' ?'text-black':'']" >
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
            <p :class="[activeMenue === 'BuyPrice' ?'text-black':'']">
              Buy Price
            </p>
          </div>
          <svg :class="[activeMenue === 'BuyPrice' ?'text-black':'']" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3 m-1 mr-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
          </svg>
        </li>
        <!-- ساب‌منو -->
        <li v-if="BuyPrice" class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between relative">
          <div class="absolute top-0 right-0 w-50 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
            <ul class="divide-y divide-gray-200">
              <li @click="addSettingToState('Hidden')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex" :class="[panelState.getBuyPrice === 'Hidden'? 'text-black':'']">
                <svg v-if="panelState.getBuyPrice === 'Hidden'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mr-1" >
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Hidden
              </li>
              <li @click="addSettingToState('Show if Available')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex" :class="[panelState.getBuyPrice === 'Show if Available' ? 'text-black':'']">
                <svg v-if="panelState.getBuyPrice === 'Show if Available'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mr-1" >
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Show if Available
              </li>
            </ul>
          </div>
        </li>

        <li @click="toggleCalender('Calender')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between">
          <div class="flex">
            <svg :class="[activeMenue === 'Calender' ?'text-black':'']" v-if="activeMenue != 'Calender'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3 m-1 ml-0 " > 
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <svg :class="[activeMenue === 'Calender' ?'text-black':'']" v-if="activeMenue === 'Calender'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3 m-1 ml-0 " >
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
            <p :class="[activeMenue === 'Calender' ?'text-black':'']">
              Calender
            </p>
          </div>
          <svg :class="[activeMenue === 'Calender' ?'text-black':'']" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 m-1 mr-0 ">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
        </li>
        <!-- ساب‌منو -->
        <li v-if="Calender" class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between relative">
          <div class="absolute top-0 right-0 w-50 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
            <ul class="divide-y divide-gray-200">
              <li @click="addSettingToState('Georgian')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex" :class="[panelState.getCalender === 'Georgian'? 'text-black':'']">
                <svg v-if="panelState.getCalender === 'Georgian'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mr-1" >
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Georgian
              </li>
              <li @click="addSettingToState('Persian')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex" :class="[panelState.getCalender === 'Persian'? 'text-black':'']">
                <svg v-if="panelState.getCalender === 'Persian'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mr-1" >
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Persian
              </li>
            </ul>
          </div>
        </li>

        <li @click="toggleLanguage('Language')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between">
          <div class="flex">
            <svg :class="[activeMenue === 'Language' ?'text-black':'']" v-if="activeMenue != 'Language'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3 m-1 ml-0 " > 
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <svg :class="[activeMenue === 'Language' ?'text-black':'']"  v-if="activeMenue === 'Language'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3 m-1 ml-0 " >
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
              <p :class="[activeMenue === 'Language' ?'text-black':'']">
              Language
            </p>
          </div>
          <svg :class="[activeMenue === 'Language' ?'text-black':'']"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 m-1 mr-0 ">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
        </li>
        <!-- ساب‌منو -->
         <li v-if="Language" class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between relative">
          <div class="absolute top-0 right-0 w-50 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
            <ul class="divide-y divide-gray-200">
              <li @click="addSettingToState('English')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex" :class="[panelState.getLanguage === 'English'? 'text-black':'']">
                <svg v-if="panelState.getLanguage === 'English'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mr-1" >
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <svg class="w-6 h-6" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" fill="#f0f0f0" r="256"/><g fill="#d80027"><path d="m244.87 256h267.13c0-23.106-3.08-45.49-8.819-66.783h-258.311z"/><path d="m244.87 122.435h229.556c-15.671-25.572-35.708-48.175-59.07-66.783h-170.486z"/><path d="m256 512c60.249 0 115.626-20.824 159.356-55.652h-318.712c43.73 34.828 99.107 55.652 159.356 55.652z"/><path d="m37.574 389.565h436.852c12.581-20.529 22.338-42.969 28.755-66.783h-494.362c6.417 23.814 16.174 46.254 28.755 66.783z"/></g><path d="m118.584 39.978h23.329l-21.7 15.765 8.289 25.509-21.699-15.765-21.699 15.765 7.16-22.037c-19.106 15.915-35.852 34.561-49.652 55.337h7.475l-13.813 10.035c-2.152 3.59-4.216 7.237-6.194 10.938l6.596 20.301-12.306-8.941c-3.059 6.481-5.857 13.108-8.372 19.873l7.267 22.368h26.822l-21.7 15.765 8.289 25.509-21.699-15.765-12.998 9.444c-1.301 10.458-1.979 21.11-1.979 31.921h256c0-141.384 0-158.052 0-256-50.572 0-97.715 14.67-137.416 39.978zm9.918 190.422-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822l-21.7 15.765zm-8.289-100.083 8.289 25.509-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822zm100.115 100.083-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822l-21.7 15.765zm-8.289-100.083 8.289 25.509-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822zm0-74.574 8.289 25.509-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822z" fill="#0052b4"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>
                <p class="m-1" :class="[false ? 'text-black':'']">
                  English
                </p>
              </li>
              <li @click="addSettingToState('فارسی')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex" :class="[panelState.getLanguage === 'فارسی'? 'text-black':'']">
                <svg v-if="panelState.getLanguage === 'فارسی'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mr-1" >
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <p class="m-1" :class="[false ? 'text-black':'']">
                  فارسی
                </p>
                <svg class="w-6 h-6" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" fill="#f0f0f0" r="256"/><path d="m339.147 189.217h-33.494c.277 3.681.434 7.395.434 11.13 0 24.764-6.19 48.767-16.981 65.853-3.329 5.27-8.923 12.712-16.411 17.732v-94.716h-33.391v94.716c-7.487-5.02-13.082-12.461-16.411-17.732-10.792-17.086-16.981-41.089-16.981-65.853 0-3.735.158-7.45.434-11.13h-33.494c-.215 3.663-.332 7.373-.332 11.13 0 68.656 36.668 122.435 83.478 122.435s83.478-53.779 83.478-122.435c.002-3.757-.115-7.467-.329-11.13z" fill="#d80027"/><path d="m105.739 122.435h33.391v22.261h33.391v-22.261h33.391v22.261h33.391v-22.261h33.391v22.261h33.391v-22.261h33.391v22.261h33.391v-22.261h33.391v22.261h80.337c-41.405-85.631-129.102-144.696-230.595-144.696s-189.19 59.065-230.598 144.696h80.337z" fill="#6da544"/><path d="m406.261 367.304v22.261h-33.391v-22.261h-33.391v22.261h-33.391v-22.261h-33.391v22.261h-33.391v-22.261h-33.391v22.261h-33.391v-22.261h-33.394v22.261h-33.391v-22.261h-80.337c41.408 85.631 129.104 144.696 230.598 144.696s189.19-59.065 230.598-144.696z" fill="#d80027"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>
              </li>
            </ul>
          </div>
        </li>

        <SubMenu title="Widgets Guide" />

        <SubMenu title="Website" />

        <SubMenu :title="'Version: '+version " />

      </ul>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { APP_VERSION } from '../../config/AppVersion';
import { usePanel } from '@/stores/PanelStore';
import SubMenu from './footer/SubMenu.vue';
import { lang } from '@/stores/LanguageStore';
const panelState = usePanel();
const useLang = lang();

const version = APP_VERSION

const activeMenue = ref('')

const ViewMode = ref(false)
const toggleView =(menue:string)=>{
  ViewMode.value = !ViewMode.value;
  activeMenue.value = ViewMode.value ? menue : '';
  PriceChangeColor.value = false;
  BuyPrice.value = false;
  Language.value = false;
  Calender.value = false;

}

const PriceChangeColor = ref(false)
const togglePriceChange =(menue:string)=>{
  PriceChangeColor.value = !PriceChangeColor.value;
  activeMenue.value = PriceChangeColor.value ? menue : '';
  ViewMode.value = false;
  BuyPrice.value = false;
  Language.value = false;
  Calender.value = false;

}

const BuyPrice = ref(false)
const toggleBuyPrice =(menue:string)=>{
  BuyPrice.value = !BuyPrice.value;
  activeMenue.value = BuyPrice.value ? menue : '';
  ViewMode.value = false;
  PriceChangeColor.value = false;
  Language.value = false;
  Calender.value = false;

}

const Calender = ref(false)
const toggleCalender =(menue:string)=>{
  Calender.value = !Calender.value;
  activeMenue.value = Calender.value ? menue : '';
  ViewMode.value = false;
  PriceChangeColor.value = false;
  BuyPrice.value = false;
  Language.value = false;
}

const Language = ref(false)
const toggleLanguage =(menue:string)=>{
  Language.value = !Language.value;
  activeMenue.value = Language.value ? menue : '';

  PriceChangeColor.value = false;
  ViewMode.value = false;
  BuyPrice.value = false;
  Calender.value = false;
}

const addSettingToState=(setting:string) =>{
  switch (setting) {
    case 'Grid':
      panelState.setViewModel('Grid');
      panelState.removeSetting('List')
      break;
    case 'List':
      panelState.setViewModel('List');
      panelState.removeSetting('Grid')
      break;
    case 'Normal':
      panelState.setPriceChangeColor('Normal');
      panelState.removeSetting('Reversed')
      break;
    case 'Reversed':
      panelState.setPriceChangeColor('Reversed');
      panelState.removeSetting('Normal')
      break;
    case 'Hidden':
      panelState.setBuyPrice('Hidden');
      panelState.removeSetting('Show if Available')
      break;
      case 'Show if Available':
        panelState.setBuyPrice('Show if Available');
      panelState.removeSetting('Hidden')
      break;
    case 'Georgian':
      panelState.setCalender('Georgian');
      panelState.removeSetting('Persian')
      break;
      case 'Persian':
        panelState.setCalender('Persian');
      panelState.removeSetting('Georgian')
      break;
    case 'English':
      panelState.setLanguage('English');
      panelState.removeSetting('فارسی');
      useLang.setlang('en')
      break;
    case 'فارسی':
      panelState.setLanguage('فارسی');
      panelState.removeSetting('English');
      useLang.setlang('fa')
      break;
    default:
      break;
  }
  panelState.addSetting(setting)
}

const props = defineProps<{
  showPanel:boolean
}>()

watch(()=>props.showPanel,(newVal)=>{
  if(newVal===false){
    activeMenue.value = '';
    ViewMode.value = false;
    PriceChangeColor.value = false;
    BuyPrice.value = false;
    Calender.value = false;
    Language.value = false;

  }
})

</script>

