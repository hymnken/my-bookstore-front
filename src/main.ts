import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { LmgUtil } from './utils/imgUtil'

LmgUtil.storageImgList()

createApp(App).mount('#app')
