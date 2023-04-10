import { LmgUtil } from './utils/imgUtil'
import { createApp } from 'vue'
import App from './App.vue'
console.log('环境变量:', import.meta.env.VITE_username)
console.log('环境变量:', import.meta.env.VITE_age)
LmgUtil.storageLmgList()
createApp(App).mount('#app')
