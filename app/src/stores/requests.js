import { defineStore } from 'pinia'
import { useUiStore } from './ui'

export const useRequestsStore = defineStore('requests', {
  state: () => ({
    requests: [],
    loading: false
  }),
  actions: {
    async fetchRequests() {
      this.loading = true
      try {
        const response = await fetch('http://localhost:3000/api/donations')
        const data = await response.json()
        this.requests = data || []
      } catch (error) {
        console.error('Eroare la fetch requests:', error)
      }
      this.loading = false
    },

    async cancelRequest(requestId) {
      const uiStore = useUiStore()
      try {
        const response = await fetch(`http://localhost:3000/api/donations/${requestId}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          this.requests = this.requests.filter(r => r.id !== requestId)
          uiStore.addNotification("Cererea a fost anulată cu succes!")
        }
      } catch (error) {
        console.error('Eroare la cancel request:', error)
      }
    }
  }
})