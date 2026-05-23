import { defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    selectedDate: new Date(),
    viewMode: 'week' 
  }),

  getters: {
    
    formattedDate: (state) => {
      return state.selectedDate.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long' })
    },
 
    isToday: (state) => {
      return state.selectedDate.toDateString() === new Date().toDateString()
    },
    
    dayIndex: (state) => state.selectedDate.getDate() - 1
  },

  actions: {
    
    setSelectedDate(newDate) {
      this.selectedDate = newDate
    },
    
    goToToday() {
      this.selectedDate = new Date()
    }
  }
})
