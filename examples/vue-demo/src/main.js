// This is still JS webpack apparently doesn't like non-JS entry points
import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})
