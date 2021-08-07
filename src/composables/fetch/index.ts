import { ref, onMounted, Ref, unref, onUnmounted } from "vue"

export function useFetch(url: RequestInfo, init?: RequestInit) {
  const response = ref<Response>()
  const result = ref<any>()

  const isLoading = ref(false)
  const isSuccess = ref(false)
  const isCancelled = ref(false)
  const status: Ref<number | undefined> = ref(undefined)

  const handle = new AbortController()
  const signal = handle.signal

  const resume = async () => {
    isLoading.value = true

    try {
      const _response = await window.fetch(url, { signal, ...init })
      response.value = _response
      isLoading.value = false
      isSuccess.value = _response.ok
      status.value = _response.status

      const contentType = _response.headers.get("content-type")

      if (contentType?.slice(0, contentType?.indexOf(";")) === "application/json") {
        result.value = await _response.json()
      }

      if (unref(isCancelled)) {
        return
      }
      result.value = await _response.text()
    } catch (e) {
      isLoading.value = false
    }
  }

  const cancel = () => {
    if (unref(isSuccess)) {
      return
    }
    if (handle) {
      handle.abort()
    }
    isCancelled.value = true
  }

  onMounted(resume)
  onUnmounted(cancel)

  return {
    result,
    status,
    isLoading,
    isCancelled,
    isSuccess,
    cancel,
    resume
  }
}
