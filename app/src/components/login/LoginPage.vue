<template>
  <div class="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 font-inter text-white">
    <div class="w-full max-w-md">
      
      <div class="flex flex-col items-center gap-4 mb-12">
        <img 
          src="/icons/CampusEatsLogoBlack.png" 
          alt="CampusEats Logo" 
          class="w-30 h-30 object-contain" 
        />
        <div class="text-center">
          <h1 class="text-4xl font-black text-white tracking-tighter">
            Campus<span class="text-amber-500">Eats</span>
          </h1>
          <p class="text-zinc-500 text-sm font-medium tracking-widest mt-1 uppercase">
            Gustul vieții de student
          </p>
        </div>
      </div>

      <LoginForm @login-success="handleNavigation" />

      <p class="text-center text-zinc-600 text-[10px] mt-12 tracking-[0.2em] uppercase font-bold">
        © 2026 CampusEats. All rights reserved.
      </p>
      
    </div>
  </div>
</template>

<script setup>
import LoginForm from "@/components/login/LoginForm.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();

function handleNavigation(userData) {
  if (!userData) return;

  // IMPORTANT: Acum userData vine direct din API-ul nostru Node.js
  // conținând: id, email și role (student sau staff)
  auth.setUser(userData); 

  if (userData.role === 'student') {
    router.push("/home");
  } else if (userData.role === 'staff') {
    // Salvăm numele pentru interfața de staff dacă există
    sessionStorage.setItem('staffName', userData.email.split('@')[0]);
    router.push("/staff-scanner");
  } else {
    // Default fallback
    router.push("/");
  }
}
</script>