<template>
  <div class="min-h-screen bg-zinc-950 text-white p-6 flex flex-col items-center font-inter">
    <header class="w-full max-w-md flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-black italic text-amber-500 tracking-tighter">SCANNER STAFF</h1>
        <p class="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Operator: {{ staffName }}</p>
      </div>
      <button @click="handleLogout" class="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 text-red-500 hover:bg-red-500/10 transition-all">
        <i class="bi bi-box-arrow-right"></i>
      </button>
    </header>

    <div class="w-full max-w-sm aspect-square bg-zinc-900 rounded-[3rem] border-2 border-zinc-800 overflow-hidden relative shadow-2xl">
      <div id="reader"></div>
      
      <div v-if="!isScanning" class="absolute inset-0 bg-zinc-950/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center z-[100]">
        <div :class="lastStatus === 'success' ? 'bg-green-500' : 'bg-red-500'" 
             class="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-2xl animate-bounce">
          <i :class="lastStatus === 'success' ? 'bi bi-check-lg' : 'bi bi-exclamation-triangle'" class="text-4xl text-black"></i>
        </div>
        <p class="font-black text-xl mb-2 uppercase italic text-white">{{ statusTitle }}</p>
        <p class="text-zinc-400 text-sm mb-8">{{ statusSubMessage }}</p>
        <button @click="resetScanner" class="w-full py-4 bg-white text-black font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-amber-500 transition-all shadow-lg active:scale-95">
          Următorul Student
        </button>
      </div>
    </div>

    <div class="mt-8 w-full max-w-sm grid grid-cols-2 gap-4">
      <div class="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl text-center">
        <p class="text-[9px] font-black text-zinc-600 uppercase mb-1">Interval Prânz</p>
        <p class="text-xs font-bold text-amber-500/80">13:00 — 15:00</p>
      </div>
      <div class="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl text-center">
        <p class="text-[9px] font-black text-zinc-600 uppercase mb-1">Interval Cină</p>
        <p class="text-xs font-bold text-amber-500/80">19:00 — 20:00</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { Html5QrcodeScanner } from "html5-qrcode";

const router = useRouter();
const staffName = sessionStorage.getItem('staffName') || 'Angajat';
const isScanning = ref(true);
const lastStatus = ref('success');
const statusTitle = ref("");
const statusSubMessage = ref("");

let scanner = null;

const getMealTypeByTime = () => {
  const hour = new Date().getHours();
  if (hour >= 10 && hour < 15) return 'Prânz';
  if (hour >= 19 && hour < 21) return 'Cină'; 
  return null;
};

const showFeedback = (type, title, message) => {
  lastStatus.value = type;
  statusTitle.value = title;
  statusSubMessage.value = message;
  isScanning.value = false; 
};

const onScanSuccess = async (decodedText) => {
  if (!isScanning.value) return;
  const currentMeal = getMealTypeByTime();

  if (!currentMeal) {
    showFeedback('error', 'Program Închis', 'Nu se servește masa în acest interval.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/meals/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_id: decodedText,
        meal_type: currentMeal
      })
    });

    const data = await response.json();

    if (response.ok) {
      showFeedback('success', 'Acces Confirmat', `Student: ${decodedText} \n Masă: ${currentMeal}`);
    } else {
      showFeedback('error', 'Eroare Scanare', data.error || 'Cod invalid.');
    }
  } catch (err) {
    showFeedback('error', 'Eroare Scanare', 'Cod invalid sau problemă de conexiune.');
    console.error(err);
  }
};

const resetScanner = () => { 
  isScanning.value = true;
};

const handleLogout = () => { 
  if (scanner) scanner.clear();
  sessionStorage.clear(); 
  router.push('/'); 
};

onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    try {
      scanner = new Html5QrcodeScanner("reader", { 
        fps: 20, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      }, false);
      scanner.render(onScanSuccess, (warn) => {});
    } catch (err) {
      console.error("Eroare la pornirea scannerului:", err);
    }
  }, 300);
});

onUnmounted(() => { 
  if (scanner) {
    scanner.clear().catch(error => console.error("Failed to clear scanner", error));
  } 
});
</script>

<style>
#reader {
  width: 100% !important;
  height: 100% !important;
  border: none !important;
  background: #09090b !important;
}
#reader video {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  border-radius: 3rem !important;
}
#reader__dashboard_section_csr button, 
#reader__camera_selection {
  background-color: #f59e0b !important;
  color: black !important;
  border: none !important;
  padding: 8px 15px !important;
  border-radius: 10px !important;
  font-weight: bold !important;
  margin-top: 10px !important;
}
#reader__status_span { display: none !important; }
img[alt="Info icon"], img[alt="Camera icon"] { display: none !important; }
</style>