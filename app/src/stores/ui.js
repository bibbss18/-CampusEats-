import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isSidebarOpen: false,
    notifications: [],
    theme: 'dark' 
  }),
  
  getters: {
    
    hasNotifications: (state) => state.notifications.length > 0,
    
    notificationCount: (state) => state.notifications.length,
  },

  actions: {
    
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
   
    addNotification(message) {
      const id = Date.now()
      this.notifications.push({ id, message })
      
      setTimeout(() => {
        this.notifications = this.notifications.filter(n => n.id !== id)
      }, 3000)
    }
  }
})
