import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import ResumeStore from '~/store/resume'

let resumeStore: ResumeStore

function initializeStores(store: Store<any>): void {
  resumeStore = getModule(ResumeStore, store)
}

export { initializeStores, resumeStore }