import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};

window.addEventListener('resize', appHeight);
appHeight();

createApp(App).mount('#app')

