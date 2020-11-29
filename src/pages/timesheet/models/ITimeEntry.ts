export interface ITimeEntry {
    id: string
    userId: string
    title: string
    projectId?: string
    note?: string
    start: Date
    end: Date
    status: string
    created: Date
    updated: Date
}
