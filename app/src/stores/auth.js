import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Păstrăm numele cheii 'campus_eats_user' ca să nu stricăm ce aveai deja
    user: JSON.parse(localStorage.getItem('campus_eats_user')) || null,
  }),
  
  actions: {
    setUser(userData) {
      this.user = userData
      localStorage.setItem('campus_eats_user', JSON.stringify(userData))
    },

    // LOGIN: Înlocuim Supabase cu apelul către API-ul tău local
    async login(email, password) {
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        if (response.ok) {
          const data = await response.json();
          this.setUser(data); // Salvăm userul (id, email, role)
          return { success: true };
        } else {
          const errorData = await response.json();
          return { success: false, error: errorData.error };
        }
      } catch (error) {
        return { success: false, error: "Serverul nu răspunde." };
      }
    },

    // UPDATE PROFILE: Acum trimitem către ruta PUT din Node.js
    async updateProfile(updates) {
      try {
        const response = await fetch(`http://localhost:3000/api/auth/update/${this.user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates)
        });

        if (response.ok) {
          const data = await response.json();
          // Actualizăm starea locală cu noile date
          this.setUser({ ...this.user, ...updates });
          return { data, error: null };
        } else {
          return { data: null, error: "Eroare la actualizare" };
        }
      } catch (error) {
        return { data: null, error };
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem('campus_eats_user')
      sessionStorage.clear()
    }
  }
})