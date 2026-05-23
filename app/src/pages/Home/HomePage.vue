<template>
  <div class="min-h-screen bg-zinc-950 text-white font-inter">
    <Navbar />
   
    <main v-if="auth.user" class="max-w-6xl mx-auto p-6">
      <header class="mb-10 flex justify-between items-end">
        <div>
          <h1 class="text-3xl font-black italic text-amber-500 uppercase tracking-tighter leading-none">
            {{ numeLunaCurenta }} 2026
          </h1>
          <p class="text-zinc-500 text-xs mt-2 font-mono uppercase tracking-widest">
            {{ selectedDayName }} • Live Sync Enabled • {{ isWeekend ? 'Weekend' : 'Program Cantină' }}
          </p>
        </div>
        
        <div class="relative">
          <input 
            v-model="search" 
            type="text" 
            placeholder="Caută tip masă..." 
            class="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs focus:border-amber-500 outline-none transition-all"
          />
        </div>
      </header>

      <div class="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl overflow-x-auto">
        <div class="grid grid-cols-5 gap-4 min-w-[850px]">
          <div v-for="day in ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri']" :key="day"
               class="text-[10px] font-black uppercase text-zinc-600 mb-4 tracking-widest text-center italic">
            {{ day }}
          </div>
         
          <div v-for="empty in offsetZile" :key="'empty-' + empty"></div>

          <div v-for="dateObj in zileLucratoare" :key="dateObj.dayNumber"
               @click="calendarStore.setSelectedDate(new Date(2026, new Date().getMonth(), dateObj.dayNumber))"
               class="bg-zinc-950 border border-zinc-800/50 rounded-3xl p-4 min-h-[140px] flex flex-col justify-between transition-all hover:border-zinc-700 cursor-pointer"
               :class="{'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.15)]': isToday(dateObj.dayNumber)}">
           
            <div class="flex justify-between items-start mb-4">
              <span class="text-[9px] font-black uppercase tracking-tighter" :class="isToday(dateObj.dayNumber) ? 'text-amber-500' : 'text-zinc-800'">
                Ziua {{ dateObj.dayNumber }}
              </span>
              <span v-if="isToday(dateObj.dayNumber)" class="text-[7px] bg-amber-500 text-black px-2 py-0.5 rounded-full font-black uppercase">Azi</span>
            </div>

            <div class="flex flex-col gap-2.5">
              <div v-for="masaType in getMeseForDay(dateObj.dayNumber - 1)" :key="masaType"
                   class="flex items-center justify-between bg-zinc-900/40 p-2.5 rounded-2xl border border-zinc-800/30">
                <span class="text-[9px] font-black text-zinc-500 uppercase italic">{{ masaType }}</span>
                <div :class="['w-8 h-8 rounded-xl flex items-center justify-center', getStatusClasses(dateObj.dayNumber - 1, masaType)]">
                  <i :class="['text-[12px]', getStatusIcon(dateObj.dayNumber - 1, masaType)]"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer v-if="!hasAvailableMeals && search" class="mt-6 text-center text-zinc-600 text-[10px] uppercase font-bold tracking-widest">
        Nicio masă găsită pentru filtrul: "{{ search }}"
      </footer>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import Navbar from '@/components/layout/Navbar.vue';
import { useAuthStore } from "@/stores/auth";
import { useRequestsStore } from '@/stores/requests';
import { useCalendarStore } from '@/stores/calendar';
import { apiFetch } from '@/lib/api.js';

const auth = useAuthStore();
const requestsStore = useRequestsStore();
const calendarStore = useCalendarStore();

const logs = ref([]);
const donations = ref([]);
const search = ref('');

const filteredMeals = computed(() => {
  return donations.value.filter(m => m.meal_type.toLowerCase().includes(search.value.toLowerCase()))
})

const todayMealsCount = computed(() => filteredMeals.value.length)
const hasAvailableMeals = computed(() => todayMealsCount.value > 0)

const selectedDayName = computed(() => {
  return calendarStore.selectedDate.toLocaleDateString('ro-RO', { weekday: 'long' })
})

const isWeekend = computed(() => {
  const day = calendarStore.selectedDate.getDay()
  return day === 0 || day === 6
})

watch(() => calendarStore.selectedDate, () => {
  refreshAllData();
})

watch(search, (newVal) => {
  console.log(`Utilizatorul caută: ${newVal}`);
})

watch(todayMealsCount, (newCount) => {
  if (newCount === 0 && search.value !== '') {
    console.warn("Nu mai sunt mese disponibile pentru această căutare!");
  }
})

const offsetZile = computed(() => {
  const an = 2026;
  const luna = new Date().getMonth();
  const primaZi = new Date(an, luna, 1).getDay();
  if (primaZi === 0 || primaZi === 6) return 0;
  return primaZi - 1;
});

const zileLucratoare = computed(() => {
  const an = 2026;
  const luna = new Date().getMonth();
  const zile = [];
  const numarZileInLuna = new Date(an, luna + 1, 0).getDate();

  for (let i = 1; i <= numarZileInLuna; i++) {
    const data = new Date(an, luna, i);
    const ziSapt = data.getDay();
    if (ziSapt >= 1 && ziSapt <= 5) {
      zile.push({ dayNumber: i });
    }
  }
  return zile;
});

const isToday = (day) => {
  const azi = new Date();
  return azi.getDate() === day && azi.getMonth() === new Date().getMonth() && azi.getFullYear() === 2026;
};

const numeLunaCurenta = computed(() => {
  return new Intl.DateTimeFormat('ro-RO', { month: 'long' }).format(new Date());
});

const cleanText = (t) => t ? t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";

const getMeseForDay = (dayIndex) => {
  const tip = cleanText(auth.user?.tipbon);
  let baseMese = [];
  if (tip === 'ambele') baseMese = ['Prânz', 'Cină'];
  else if (tip === 'cina') baseMese = ['Cină'];
  else if (tip === 'pranz') baseMese = ['Prânz'];

  const claimedToday = donations.value
    .filter(d => d.day_index === dayIndex && d.receiver_id === auth.user?.id)
    .map(d => d.meal_type);
 
  return [...new Set([...baseMese, ...claimedToday])];
};

const refreshAllData = async () => {
  if (!auth.user?.id) return;
  try {
    const [logsRes, donsRes] = await Promise.all([
      apiFetch(`http://localhost:3000/api/meals/logs?user_id=${auth.user.id}`),
      apiFetch('http://localhost:3000/api/donations')
    ]);
    if (logsRes.ok) logs.value = await logsRes.json();
    if (donsRes.ok) donations.value = await donsRes.json();
  } catch (err) {
    console.error('Eroare refresh data:', err);
  }
};

onMounted(() => {
  refreshAllData();
  const ws = new WebSocket('ws://localhost:3000');
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'DONATION_UPDATE') refreshAllData();
  };
});

const getStatus = (dayIndex, type) => {
  const typeClean = cleanText(type);
  const me = auth.user.id;
  const currentDayInGrid = dayIndex + 1;
  const todayDate = new Date().getDate();

  const asDonor = donations.value.find(d => d.day_index === dayIndex && cleanText(d.meal_type) === typeClean && d.donor_id === me);
  if (asDonor) return asDonor.status === 'completed' ? 'donated_done' : 'donated_pending';

  const asReceiver = donations.value.find(d => d.day_index === dayIndex && cleanText(d.meal_type) === typeClean && d.receiver_id === me);
  if (asReceiver) {
    const scanned = logs.value.find(l => new Date(l.createdAt).getDate() === currentDayInGrid && cleanText(l.meal_type) === typeClean);
    return scanned ? 'claimed_done' : 'claimed_pending';
  }

  const hasEaten = logs.value.find(l => new Date(l.createdAt).getDate() === currentDayInGrid && cleanText(l.meal_type) === typeClean);
  if (hasEaten) return 'consumed';
  if (currentDayInGrid < todayDate) return 'missed';
  return 'pending';
};

const getStatusClasses = (day, type) => {
  const s = getStatus(day, type);
  switch (s) {
    case 'donated_done': return "bg-pink-500/10 text-pink-500 border border-pink-500/20";
    case 'donated_pending': return "bg-pink-500/5 text-pink-500/20 border border-pink-500/10";
    case 'claimed_done': return "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20";
    case 'claimed_pending': return "bg-yellow-500/5 text-yellow-500/20 border border-yellow-500/10";
    case 'consumed': return "bg-green-500 text-black";
    case 'missed': return "bg-red-500/10 text-red-500/30";
    default: return "bg-zinc-900 text-zinc-800";
  }
};

const getStatusIcon = (day, type) => {
  const s = getStatus(day, type);
  switch (s) {
    case 'donated_done': return "bi bi-heart-fill";
    case 'donated_pending': return "bi bi-heart";    
    case 'claimed_done': return "bi bi-star-fill";
    case 'claimed_pending': return "bi bi-star";
    case 'consumed': return "bi bi-check-lg";
    case 'missed': return "bi bi-x-lg";
    default: return "";
  }
};
</script>