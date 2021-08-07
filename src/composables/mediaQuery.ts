import { ref, onMounted, onUnmounted } from "vue"

export function useMediaQuery(query: string) {
  let mediaQuery!: MediaQueryList

  if (typeof window !== "undefined") {
    mediaQuery = window.matchMedia(query)
  }

  const matches = ref(mediaQuery ? mediaQuery.matches : false)

  const handler = (event: MediaQueryListEvent) => {
    matches.value = event.matches
  }

  onMounted(() => {
    if (!mediaQuery) {
      mediaQuery = window.matchMedia(query)
    }

    matches.value = mediaQuery.matches
    mediaQuery.addEventListener("change", handler)
  })

  onUnmounted(() => {
    mediaQuery.removeEventListener("change", handler)
  })

  return matches
}
