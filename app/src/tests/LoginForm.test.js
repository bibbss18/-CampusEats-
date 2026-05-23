import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import LoginForm from '@/components/login/LoginForm.vue'

describe('LoginForm', () => {
  it('se randează corect', () => {
    const pinia = createPinia()
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [pinia]
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('are câmpul ID Utilizator', () => {
    const pinia = createPinia()
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [pinia]
      }
    })
    const input = wrapper.find('input[type="text"]')
    expect(input.exists()).toBe(true)
  })

  it('are câmpul PIN', () => {
    const pinia = createPinia()
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [pinia]
      }
    })
    const input = wrapper.find('input[type="password"]')
    expect(input.exists()).toBe(true)
  })

  it('are butonul de autentificare', () => {
    const pinia = createPinia()
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [pinia]
      }
    })
    const button = wrapper.find('button[type="submit"]')
    expect(button.exists()).toBe(true)
    expect(button.text()).toContain('Autentificare')
  })
})