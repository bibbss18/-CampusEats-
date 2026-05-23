<template>
  <div class="min-h-screen bg-zinc-950 text-white">
    <Navbar />
    <main class="max-w-4xl mx-auto p-6">
      <h2 class="text-3xl font-black mb-8 italic tracking-tighter text-amber-500">SĂPTĂMÂNA ACEASTA</h2>
      
      <div class="space-y-4">
        <div v-for="day in menu" :key="day.nume" class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex shadow-lg">
          <div class="bg-amber-500 text-black p-4 flex items-center justify-center w-24 font-black text-sm vertical-text">
            {{ day.nume }}
          </div>
          <div class="p-6 flex-1 grid grid-cols-2 gap-8">
            <div>
              <p class="text-[10px] font-black text-zinc-500 uppercase mb-2">Prânz</p>
              <p class="text-sm font-medium whitespace-pre-line">{{ day.pranz }}</p>
            </div>
            <div>
              <p class="text-[10px] font-black text-zinc-500 uppercase mb-2">Cină</p>
              <p class="text-sm font-medium">{{ day.cina }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue';

const menu = [
  { nume: 'LUNI', pranz: `FELUL 1: Ciorbă Rădăuțeană
  FELUL 2: Șnițel de pui cu piure`, cina: 'Paste Carbonara' },
  { nume: 'MARȚI', pranz: `FELUL 1: Supă cremă de legume 
  FELUL 2: Tocăniță de porc`, cina: 'Pilaful de orez cu pui' },
  { nume: 'MIERCURI', pranz: `FELUL 1: Ciorbă de văcuță 
  FELUL 2: Grătar de pui cu cartofi`, cina: 'Mămăliguță cu brânză' },
  { nume: 'JOI', pranz: `FELUL 1: Ciorbă de perișoare 
  FELUL 2: Chifteluțe marinate`, cina: 'Salată Caesar' },
  { nume: 'VINERI', pranz: `FELUL 1: Supă de tăiței 
  FELUL 2: Pește la cuptor`, cina: 'Pizza Prosciutto' }
];
</script>

<style scoped>
.vertical-text { writing-mode: vertical-rl; transform: rotate(180deg); }
</style>