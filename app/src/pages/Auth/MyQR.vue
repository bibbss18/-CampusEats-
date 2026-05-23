<template>
  <div class="min-h-screen bg-zinc-950 text-white p-6 flex flex-col items-center">
    <div class="w-full max-w-md mb-12">
      <h1 class="text-3xl font-black tracking-tighter italic">
        CODUL MEU <span class="text-amber-500">QR</span>
      </h1>
      <p class="text-zinc-500 text-xs uppercase tracking-widest">Acces Cantină • 2026</p>
    </div>

    <div class="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 flex flex-col items-center shadow-2xl">
      <div class="bg-white p-6 rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.05)]">
        <qrcode-vue 
          :value="studentId" 
          :size="220" 
          level="H" 
          render-as="svg"
        />
      </div>

      <div class="mt-8 text-center">
        <p class="text-zinc-400 text-sm mb-1">Nume Student</p>
        <p class="text-xl font-bold text-white">{{ auth.user?.name }}</p>
        <div class="mt-4 px-4 py-2 bg-zinc-950 rounded-full border border-zinc-800">
           <p class="text-amber-500 font-mono font-bold tracking-widest text-sm">
             {{ studentId }}
           </p>
        </div>
      </div>
    </div>

    <div class="mt-10 flex items-center gap-3 text-zinc-500 bg-zinc-900/50 px-6 py-3 rounded-full border border-zinc-800/50">
      <i class="bi bi-info-circle text-amber-500"></i>
      <p class="text-xs font-medium uppercase tracking-tight">Prezintă codul la scanerul de la intrare</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";

import QrcodeVue from "qrcode.vue";

const auth = useAuthStore();


const studentId = computed(() => {
  return auth.user?.student_id || "GUEST";
});
</script>