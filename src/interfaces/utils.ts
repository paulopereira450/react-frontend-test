export interface PropsComponents {
    classes: { [key: string]: string };
}

export enum Status {
    LOADING = "loading", 
    IDLE = "idle", 
    FAILED = "failed", 
    INVALID_PAGE_INTERVAL = "invalid_page_interval"
}