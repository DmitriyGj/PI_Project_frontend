export interface AppState {
    initial: boolean,
    status: AppStatus | null
}

export enum AppStatus {
    loading,
    ready,
    error
}