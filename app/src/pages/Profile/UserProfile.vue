<template>
  <div class="min-h-screen bg-zinc-950 text-white p-6 font-inter">
    <div class="max-w-md mx-auto">
      <header class="text-center mb-10">
        <div class="w-24 h-24 bg-zinc-900 border-2 border-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <i class="bi bi-person-fill text-4xl text-amber-500"></i>
        </div>
        <h1 class="text-2xl font-black uppercase tracking-tighter">{{ authStore.user?.nume }}</h1>
        <p class="text-zinc-500 text-xs font-bold uppercase tracking-widest">Student ID: {{ authStore.user?.student_id }}</p>
      </header>

      <div class="space-y-4">
        <div class="bg-zinc-900/50 border border-zinc-800 p-5 rounded-[2rem]">
          <label class="text-[10px] font-black text-zinc-600 uppercase tracking-widest block mb-2">Email Institutie</label>
          <p class="font-bold text-zinc-300">{{ authStore.user?.email || 'Nespecificat' }}</p>
        </div>

        <div class="bg-zinc-900/50 border border-zinc-800 p-5 rounded-[2rem]">
          <label class="text-[10px] font-black text-zinc-600 uppercase tracking-widest block mb-2">Tip Masa Alocat</label>
          <p class="font-bold text-amber-500 uppercase">{{ authStore.user?.tipbon }}</p>
        </div>

        <button @click="handleLogout" class="w-full py-4 bg-red-500/10 border border-red-500/20 text-red-500 font-black rounded-2xl uppercase text-xs tracking-[0.2em] mt-8 hover:bg-red-500 hover:text-white transition-all">
          Deconectare Cont
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout() 
  router.push('/')
}
</script>
