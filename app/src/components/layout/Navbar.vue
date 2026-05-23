<template>
  <nav class="bg-zinc-950 border-b border-zinc-900 sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
      
      <RouterLink to="/" class="flex items-center gap-2 group">
          <img 
            src="/icons/CampusEatsLogoBlack.png" 
            alt="Logo" 
            class="w-15 h-15 object-contain" 
          />
        
        <span class="text-xl font-black tracking-tighter text-white">
          Campus<span class="text-amber-500">Eats</span>
        </span>
      </RouterLink>

      <div class="flex items-center gap-8">
        <div class="hidden md:flex items-center gap-6 border-r border-zinc-800 pr-6">
          <RouterLink to="/home" class="text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors" active-class="text-amber-500">
            Calendar
          </RouterLink>
          <RouterLink to="/meals" class="text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors" active-class="text-amber-500">
            Solicitări Mese
          </RouterLink>
          <RouterLink to="/menu" class="text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors" active-class="text-amber-500">
            Meniu Săptămânal
          </RouterLink>
          <RouterLink to="/inbox" class="text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors" active-class="text-amber-500">
            Inbox
          </RouterLink>
          <RouterLink to="/about" class="text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors" active-class="text-amber-500">
            Despre
          </RouterLink>
        </div>

        <div class="flex items-center gap-4 text-white">
          <RouterLink to="/stats" class="text-zinc-500 hover:text-amber-500 transition-colors" title="Statistici">
            <i class="bi bi-graph-up text-xl"></i>
          </RouterLink>

          <RouterLink to="/settings" class="text-zinc-500 hover:text-white transition-colors" title="Setări">
            <i class="bi bi-gear text-xl"></i>
          </RouterLink>

          <RouterLink to="/qr" class="text-zinc-500 hover:text-white transition-colors" title="Codul meu QR">
            <i class="bi bi-qr-code-scan text-xl"></i>
          </RouterLink>

          <RouterLink to="/profile" class="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:border-amber-500 hover:text-amber-500 transition-all">
            <i class="bi bi-person-fill"></i>
          </RouterLink>

          <button @click="handleLogout" class="bg-zinc-900 hover:bg-red-500/10 hover:text-red-500 p-2.5 rounded-xl transition-all border border-zinc-800">
            <i class="bi bi-box-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  
  await auth.logout();
  router.push('/');
};
</script>
