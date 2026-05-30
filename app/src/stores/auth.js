import { defineStore } from 'pinia'
import { API_URL } from '@/config'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('campus_eats_user')) || null,
    token: localStorage.getItem('campus_eats_token') || null,
    refreshToken: localStorage.getItem('campus_eats_refresh_token') || null,
  }),
  
  actions: {
    setUser(userData) {
      const { token, refreshToken, ...user } = userData;
      this.user = user;
      this.token = token;
      this.refreshToken = refreshToken;
      localStorage.setItem('campus_eats_user', JSON.stringify(user));
      localStorage.setItem('campus_eats_token', token);
      localStorage.setItem('campus_eats_refresh_token', refreshToken);
    },

    async login(username, pin) {
      try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
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

    async refreshAccessToken() {
      try {
        const response = await fetch(`${API_URL}/api/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: this.refreshToken })
        });

        if (response.ok) {
          const data = await response.json();
          this.token = data.token;
          localStorage.setItem('campus_eats_token', data.token);
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.refreshToken = null;
      localStorage.removeItem('campus_eats_user');
      localStorage.removeItem('campus_eats_token');
      localStorage.removeItem('campus_eats_refresh_token');
      sessionStorage.clear();
    }
  }
})