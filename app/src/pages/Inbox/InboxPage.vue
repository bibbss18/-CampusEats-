<template>
  <div class="min-h-screen bg-zinc-950 text-white font-inter">
    <Navbar />
    <main class="max-w-4xl mx-auto p-6">
      <header class="mb-10">
        <h1 class="text-3xl font-black italic text-amber-500 uppercase tracking-tighter">Inbox</h1>
        <p class="text-zinc-500 text-xs mt-2 font-mono uppercase tracking-widest italic">Activitate și Mulțumiri</p>
      </header>

      <div class="space-y-4">
        <div v-for="notif in notifications" :key="notif.id" 
             class="bg-zinc-900/50 border border-zinc-800 p-6 rounded-[2rem] flex items-start gap-4 transition-all hover:border-zinc-700">
          <div class="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 text-xl border border-amber-500/20">
            <i class="bi bi-chat-heart-fill"></i>
          </div>
          <div class="flex-1">
            <div class="flex justify-between items-start">
              <h3 class="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Masa de {{ notif.meal_type }}</h3>
              <span class="text-[9px] text-zinc-600 font-mono">{{ formatDate(notif.createdAt) }}</span>
            </div>
            <p class="text-sm mt-1">
              Studentul <span class="font-bold text-amber-500 italic">{{ notif.receiver_nume }}</span> a revendicat masa ta.
            </p>
            <div class="mt-3 p-3 bg-zinc-950 rounded-xl border border-zinc-800/50 italic text-zinc-300 text-xs">
              "{{ notif.thank_you_note || 'Să ai poftă!' }}"
            </div>
          </div>
        </div>
        <div v-if="notifications.length === 0" class="text-center py-20 opacity-20 italic">Nicio notificare...</div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/layout/Navbar.vue';
import { useAuthStore } from "@/stores/auth";
import { apiFetch } from '@/lib/api.js';

const auth = useAuthStore();
const notifications = ref([]);

const fetchNotifications = async () => {
  try {
    const res = await apiFetch(`http://localhost:3000/api/donations?donor_id=${auth.user.id}`);
    if (res.ok) {
      const data = await res.json();
      notifications.value = data
        .filter(d => d.receiver_id !== null)
        .map(d => ({ ...d, receiver_nume: d.receiver_nume || 'Un student' }));
    }
  } catch (err) {
    console.error('Eroare fetch notifications:', err);
  }
};

const formatDate = (dateStr) => new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

onMounted(() => {
  fetchNotifications();
  const ws = new WebSocket('ws://localhost:3000');
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'DONATION_UPDATE') fetchNotifications();
  };
});
</script>