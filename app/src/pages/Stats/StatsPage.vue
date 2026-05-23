<template>
  <div class="min-h-screen bg-zinc-950 text-white p-6 font-inter">
    <header class="flex justify-between items-center mb-10">
      <div>
        <h1 class="text-3xl font-black italic text-amber-500 tracking-tighter uppercase">Statistici</h1>
        <p class="text-zinc-500 text-xs font-bold uppercase tracking-widest">Performanța ta în CampusEats</p>
      </div>
      <RouterLink to="/home" class="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 text-amber-500">
        <i class="bi bi-house-door-fill"></i>
      </RouterLink>
    </header>

    <div class="grid grid-cols-1 gap-4">
      <div class="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-[2.5rem] text-black">
        <p class="text-[10px] font-black uppercase tracking-widest opacity-80">Status Utilizator</p>
        <p class="text-4xl font-black italic">{{ statsStore.userLevel }}</p>
      </div>

      <div class="grid grid-cols-2 gap-4 mt-2">
        <div class="bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem]">
          <p class="text-zinc-500 text-[10px] font-black uppercase mb-1">Donate</p>
          <p class="text-2xl font-black">{{ statsStore.myDonatedMeals }}</p>
        </div>
        <div class="bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem]">
          <p class="text-zinc-500 text-[10px] font-black uppercase mb-1">Primite</p>
          <p class="text-2xl font-black">{{ statsStore.myReceivedMeals }}</p>
        </div>
      </div>

      <div class="bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] flex items-center justify-between">
        <div>
          <p class="text-zinc-500 text-[10px] font-black uppercase mb-1">Rată Succes Sistem</p>
          <p class="text-2xl font-black text-amber-500">{{ statsStore.successRate.toFixed(1) }}%</p>
        </div>
        <i class="bi bi-graph-up-arrow text-3xl text-zinc-800"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStatsStore } from '@/stores/stats'
const statsStore = useStatsStore()
</script>
