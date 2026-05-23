<template>
  <form @submit.prevent="handleLogin" class="space-y-4">
    <div class="space-y-2">
      <label class="text-[10px] font-black text-zinc-600 uppercase ml-2 tracking-widest">Email Utilizator</label>
      <input 
        v-model="emailInput" 
        type="email" 
        placeholder="nume@student.upt.ro" 
        class="w-full bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl focus:border-amber-500 transition-all outline-none text-white font-medium" 
        required 
      />
    </div>
    
    <div class="space-y-2">
      <label class="text-[10px] font-black text-zinc-600 uppercase ml-2 tracking-widest">Parolă</label>
      <input 
        v-model="passwordInput" 
        type="password" 
        placeholder="••••" 
        class="w-full bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl focus:border-amber-500 transition-all outline-none text-white tracking-[0.3em]" 
        required 
      />
    </div>

    <button 
      type="submit" 
      :disabled="loading"
      class="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-black font-black py-4 rounded-2xl uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-amber-500/20 mt-4"
    >
      {{ loading ? 'Se verifică...' : 'Autentificare' }}
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from "@/stores/auth";

const emit = defineEmits(['login-success']);
const auth = useAuthStore();

const emailInput = ref(''); // Folosim email, conform rutei din Backend
const passwordInput = ref('');
const loading = ref(false);

async function handleLogin() {
  loading.value = true;
  
  try {
    // Apelăm acțiunea 'login' din Store-ul nostru actualizat anterior
    const result = await auth.login(emailInput.value, passwordInput.value);

    if (result.success) {
      // Dacă login-ul a reușit în Store, datele sunt deja salvate în localStorage
      // Emitem succesul către LoginPage.vue pentru navigație
      emit('login-success', auth.user);
    } else {
      alert(result.error || "Email sau parolă incorectă!");
    }
  } catch (err) {
    console.error("Eroare Login:", err);
    alert("Nu s-a putut contacta serverul.");
  } finally {
    loading.value = false;
  }
}
</script>