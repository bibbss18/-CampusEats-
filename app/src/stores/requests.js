import { defineStore } from 'pinia'
import { supabase } from "@/lib/supabase"
import { useUiStore } from './ui' 

export const useRequestsStore = defineStore('requests', {
  state: () => ({
    requests: [],
    loading: false
  }),
  actions: {
    
    async fetchRequests() {
      this.loading = true
      const { data } = await supabase.from('donations').select('*')
      this.requests = data || []
      this.loading = false
    },

 
    async cancelRequest(requestId) {
      const uiStore = useUiStore() 
      
      const { error } = await supabase
        .from('donations')
        .delete()
        .eq('id', requestId)

      if (!error) {
        this.requests = this.requests.filter(r => r.id !== requestId)
        uiStore.addNotification("Cererea a fost anulată cu succes!")
      }
    }
  }
})
