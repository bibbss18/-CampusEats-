import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('campus_eats_user')) || null,
  }),
  
  actions: {
    setUser(userData) {
      this.user = userData
      localStorage.setItem('campus_eats_user', JSON.stringify(userData))
    },

    async login(username, pin) {
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, pin })
        });

        if (response.ok) {
          const data = await response.json();
          this.setUser(data);
          return { success: true };
        } else {
          const errorData = await response.json();
          return { success: false, error: errorData.error };
        }
      } catch (error) {
        return { success: false, error: "Serverul nu răspunde." };
      }
    },

    async updateProfile(updates) {
      try {
        const response = await fetch(`http://localhost:3000/api/auth/update/${this.user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates)
        });

        if (response.ok) {
          const data = await response.json();
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