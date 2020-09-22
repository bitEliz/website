export interface Loadable {

    isLoading: boolean

    setLoadingState(isLoading: boolean): void

    onLoading(params?: any): Promise<void>
}