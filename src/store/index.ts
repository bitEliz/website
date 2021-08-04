import { Store } from "vuex"
import { typedStore } from "~/utils/store"

const initializer = (store: Store<any>) => typedStore(store)

export const plugins = [initializer]
export * from "~/utils/store"
