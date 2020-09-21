import { NuxtAxiosInstance } from '@nuxtjs/axios'

let $http: NuxtAxiosInstance

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $http = axiosInstance
}

export { $http }