import { ScrollSpy } from "bootstrap"

export default defineNuxtPlugin(() => {
  return {
    provide: {
      bootstrap: { ScrollSpy }
    }
  }
})
