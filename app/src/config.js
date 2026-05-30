const isNative = window.location.protocol === 'capacitor:'

export const API_URL = isNative 
  ? 'http://10.10.23.168:3000' 
  : 'http://localhost:3000'

export const WS_URL = isNative
  ? 'ws://10.10.23.168:3000'
  : 'ws://localhost:3000'