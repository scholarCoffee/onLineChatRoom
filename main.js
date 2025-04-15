import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import io from './componets/socket/weapp.socket.io.js'


Vue.config.productionTip = false
Vue.prototype.serverUrl = 'http://192.168.1.3:3000' // Set your server URL here
Vue.prototype.socket = io('http://192.168.1.3:8002')

App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif