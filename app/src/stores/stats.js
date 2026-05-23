import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { useRequestsStore } from './requests'

export const useStatsStore = defineStore('stats', {
  state: () => ({
    globalDonationsCount: 0,
    loading: false
  }),

  getters: {
    
    totalRequestsCount: () => {
      const requestsStore = useRequestsStore()
      return requestsStore.requests.length
    },
   
    myDonatedMeals: () => {
      const requestsStore = useRequestsStore()
      const authStore = useAuthStore()
      return requestsStore.requests.filter(r => r.donor_id === authStore.user?.id).length
    },
  
    myReceivedMeals: () => {
      const requestsStore = useRequestsStore()
      const authStore = useAuthStore()
      return requestsStore.requests.filter(r => r.receiver_id === authStore.user?.id).length
    },
    
    successRate: () => {
      const requestsStore = useRequestsStore()
      const total = requestsStore.requests.length
      const completed = requestsStore.requests.filter(r => r.status === 'completed').length
      return total > 0 ? (completed / total) * 100 : 0
    },
    
    userLevel: () => {
      const requestsStore = useRequestsStore()
      const authStore = useAuthStore()
      const count = requestsStore.requests.filter(r => r.donor_id === authStore.user?.id).length
      if (count > 10) return 'Hero'
      if (count > 5) return 'Helper'
      return 'Beginner'
    }
  },

  actions: {
    
    async fetchGlobalStats() {
      this.loading = true
     
      this.loading = false
    },
   
    incrementGlobalDonations() {
      this.globalDonationsCount++
    },
    
    resetMyStats() {
      console.log("Stats reset for current session")
    }
  }
})
