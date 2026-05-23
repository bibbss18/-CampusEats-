<template>
  <div class="min-h-screen bg-zinc-950 text-white p-6 font-inter">
    <h1 class="text-3xl font-black italic text-amber-500 mb-8 uppercase tracking-tighter">Setări</h1>

    <div class="space-y-4">
      <div class="flex items-center justify-between bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800">
        <div>
          <p class="font-black uppercase text-xs">Notificări Push</p>
          <p class="text-zinc-500 text-[10px]">Primește alerte pentru donații noi</p>
        </div>
        <div class="w-12 h-6 bg-amber-500 rounded-full relative">
          <div class="absolute right-1 top-1 w-4 h-4 bg-black rounded-full"></div>
        </div>
      </div>

      <div @click="uiStore.toggleSidebar" class="flex items-center justify-between bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 cursor-pointer">
        <div>
          <p class="font-black uppercase text-xs">Meniu Lateral</p>
          <p class="text-zinc-500 text-[10px]">Stare actuală: {{ uiStore.isSidebarOpen ? 'Deschis' : 'Închis' }}</p>
        </div>
        <i class="bi bi-layout-sidebar-inset text-amber-500 text-xl"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUiStore } from '@/stores/ui'
const uiStore = useUiStore()
</script>
