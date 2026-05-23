<template>
  <div class="min-h-screen bg-zinc-950 text-white font-inter">
    <Navbar />

    <main class="max-w-5xl mx-auto p-6">
      <div class="flex justify-between items-end mb-8">
        <div>
          <h2 class="text-3xl font-bold italic tracking-tight text-amber-500 uppercase">Meal Exchange</h2>
          <p class="text-zinc-500 text-sm italic">Comunitatea ta de food-sharing</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-1 space-y-6">
          <div v-if="hasSubscription" class="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
            <h3 class="text-[10px] font-black mb-4 text-zinc-500 uppercase tracking-widest italic">Oferă o masă</h3>
            <div class="grid grid-cols-2 gap-3 italic font-black">
              <button @click="handleAction('donate', 'Prânz')" class="p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-pink-500 text-[9px] transition-all uppercase text-pink-500">PRÂNZ</button>
              <button @click="handleAction('donate', 'Cină')" class="p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-pink-500 text-[9px] transition-all uppercase text-pink-500">CINĂ</button>
            </div>
          </div>

          <div class="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
            <h3 class="text-[10px] font-black mb-4 text-zinc-500 uppercase tracking-widest italic">Solicită o masă</h3>
            <div class="grid grid-cols-2 gap-3 italic font-black">
              <button @click="handleAction('request', 'Prânz')" class="p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-amber-500 text-[9px] transition-all uppercase text-amber-500">PRÂNZ</button>
              <button @click="handleAction('request', 'Cină')" class="p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-amber-500 text-[9px] transition-all uppercase text-amber-500">CINĂ</button>
            </div>
          </div>

          <div v-if="myActiveItems.length > 0" class="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
            <h3 class="text-[10px] font-black mb-4 text-amber-500 uppercase italic">Activitatea ta</h3>
            <div class="space-y-3">
              <div v-for="item in myActiveItems" :key="item.id" class="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex justify-between items-center">
                <div>
                  <p class="text-[9px] font-black uppercase">{{ item.meal_type }}</p>
                  <p class="text-[8px] text-zinc-600 uppercase">{{ item.status }}</p>
                </div>
                <button @click="cancelItem(item.id)" class="px-3 py-1 bg-red-500/10 text-red-500 text-[8px] font-black rounded-lg hover:bg-red-500 uppercase transition-all">ANULEAZĂ</button>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2">
          <div class="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl min-h-[500px]">
            <div class="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800/50">
              <span class="text-[10px] font-black uppercase text-zinc-500 italic tracking-widest">Live Feed (MySQL)</span>
            </div>

            <div class="space-y-4">
              <div v-for="meal in filteredMeals" :key="meal.id" 
                class="flex items-center justify-between p-4 bg-zinc-950/40 border border-zinc-800 rounded-2xl transition-all">
                
                <div class="flex items-center gap-4">
                  <div :class="['w-10 h-10 rounded-xl flex items-center justify-center text-lg', meal.status === 'available' ? 'bg-pink-500/10 text-pink-500' : 'bg-amber-500/10 text-amber-500']">
                    <i :class="meal.status === 'available' ? 'bi bi-heart-fill' : 'bi bi-person-raised-hand'"></i>
                  </div>
                  <div>
                    <p class="text-[10px] font-black uppercase tracking-tighter">
                      {{ meal.status === 'available' ? 'Donație disponibilă' : 'Solicitare activă' }}
                    </p>
                    <p class="text-[8px] text-zinc-500 uppercase tracking-widest">{{ meal.meal_type }}</p>
                  </div>
                </div>

                <div>
                  <button v-if="meal.status === 'available'" @click="handleAction('claim', meal)" class="px-5 py-2 rounded-xl bg-white text-black text-[9px] font-black hover:bg-amber-500 uppercase transition-all">CLAIM</button>
                  <button v-else-if="meal.status === 'requested'" @click="handleAction('fulfill', meal)" class="px-5 py-2 rounded-xl bg-pink-500 text-white text-[9px] font-black hover:bg-pink-600 uppercase transition-all">DONEAZĂ</button>
                </div>
              </div>
              <div v-if="filteredMeals.length === 0" class="text-center py-20 opacity-20 italic">Nu sunt mese momentan...</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Navbar from '@/components/layout/Navbar.vue';
import { useAuthStore } from "@/stores/auth";
import Swal from 'sweetalert2';

const auth = useAuthStore();
const donations = ref([]);

// Verificăm dacă are dreptul să doneze (Subscription)
const hasSubscription = computed(() => {
  const tip = auth.user?.tipbon?.toLowerCase() || '';
  return tip !== 'none' && tip !== '';
});

// REGLA DE AUR: Fetch date din Backend-ul nostru (MySQL)
const fetchDonations = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/donations');
    if (res.ok) {
      donations.value = await res.json();
    }
  } catch (err) {
    console.error("Eroare fetch:", err);
  }
};

// LOGICA DE RESTRICȚIE (Lunch/Dinner)
const checkMealRestriction = (targetType) => {
  const target = targetType.toLowerCase();
  
  // Verificăm în lista de donații dacă userul are deja ceva pe tipul opus
  const hasOpposite = donations.value.some(d => {
    const isMe = d.UserId === auth.user.id; // Atenție: UserId din MySQL
    const type = d.meal_type?.toLowerCase();
    
    if (isMe) {
      if (target.includes('cin') && type.includes('pranz')) return true;
      if (target.includes('pranz') && type.includes('cin')) return true;
    }
    return false;
  });

  if (hasOpposite) {
    Swal.fire({
      title: 'Restricție Masă',
      text: 'Ai deja o masă de tip opus (Prânz/Cină). Nu poți solicita sau dona ambele tipuri.',
      icon: 'error',
      background: '#09090b',
      color: '#fff',
      confirmButtonColor: '#f59e0b'
    });
    return false;
  }
  return true;
};

// Gestionare acțiuni (Donate, Request, Claim)
const handleAction = async (actionType, payload) => {
  const mealType = typeof payload === 'string' ? payload : payload.meal_type;

  // 1. Verificăm restricția Lunch/Dinner
  if (!checkMealRestriction(mealType)) return;

  // 2. Apelăm API-ul nostru conform acțiunii
  let url = 'http://localhost:3000/api/donations';
  let method = 'POST';
  let body = {};

  if (actionType === 'donate' || actionType === 'request') {
    body = {
      UserId: auth.user.id,
      meal_type: mealType,
      status: actionType === 'donate' ? 'available' : 'requested'
    };
  } else if (actionType === 'claim' || actionType === 'fulfill') {
    url = `http://localhost:3000/api/donations/${payload.id}`;
    method = 'PUT';
    body = { status: 'claimed' };
  }

  try {
    const res = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      Swal.fire({ title: 'Succes!', icon: 'success', background: '#09090b', color: '#fff' });
      fetchDonations();
    }
  } catch (err) {
    alert("Eroare la procesarea cererii.");
  }
};

const cancelItem = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/donations/${id}`, { method: 'DELETE' });
    if (res.ok) fetchDonations();
  } catch (err) { console.error(err); }
};

onMounted(fetchDonations);

// Computeds pentru filtrare interfață
const myActiveItems = computed(() => donations.value.filter(d => d.UserId === auth.user?.id));
const filteredMeals = computed(() => donations.value.filter(d => d.UserId !== auth.user?.id && d.status !== 'claimed'));
</script>