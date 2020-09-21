import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import ResumeStore from '~/store/resume'
import StaticStore from '~/store/static'

let resumeStore: ResumeStore
let fileStore: StaticStore

function initializeStores(store: Store<any>): void {
  resumeStore = getModule(ResumeStore, store)
  fileStore = getModule(StaticStore, store)
}

export { initializeStores, resumeStore, fileStore }