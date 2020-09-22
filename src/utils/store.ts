import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import ResumeStore from '~/store/resume-store'
import PureMDFileStore from '~/store/pure-md-file-store'

let resumeStore: ResumeStore
let pureMDFileStore: PureMDFileStore

function initializeStores(store: Store<any>): void {
  resumeStore = getModule(ResumeStore, store)
  pureMDFileStore = getModule(PureMDFileStore, store)
}

export { initializeStores, resumeStore, pureMDFileStore}