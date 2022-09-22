import { createApp } from './app'

const { app, router, pinia } = createApp()

if (window.__INITIAL_DATA__) {
  pinia.state.value = window.__INITIAL_DATA__
}

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  app.mount('#app', true)
})
