import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'


import LoginPage from '../components/login/LoginPage.vue'
import HomePage from '../pages/Home/HomePage.vue'
import MealRequests from '../pages/Requests/MealRequests.vue'
import InboxPage from '../pages/Inbox/InboxPage.vue'
import MyQR from '../pages/Auth/MyQR.vue'
import WeeklyMenu from '../pages/Menu/WeeklyMenu.vue'
import StaffScanner from '../pages/Staff/StaffScanner.vue'


import StatsPage from '../pages/Stats/StatsPage.vue'
import UserProfile from '../pages/Profile/UserProfile.vue'
import SettingsPage from '../pages/Settings/SettingsPage.vue'
import AboutPage from '../pages/About/AboutPage.vue'


const routes = [
  { path: '/', name: 'login', component: LoginPage },
  { path: '/home', name: 'home', component: HomePage },
  { path: '/meals', name: 'meals', component: MealRequests },
  { path: '/qr', name: 'qr', component: MyQR },
  { path: '/inbox', name: 'inbox', component: InboxPage },
  { path: '/menu', name: 'menu', component: WeeklyMenu },
  { path: '/staff-scanner', name: 'staff-scanner', component: StaffScanner },
  { path: '/stats', name: 'stats', component: StatsPage },
  { path: '/profile', name: 'profile', component: UserProfile },
  { path: '/settings', name: 'settings', component: SettingsPage },
  { path: '/about', name: 'about', component: AboutPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (!auth.user && to.name !== 'login') next({ name: 'login' })
  else next()
})

export default router

