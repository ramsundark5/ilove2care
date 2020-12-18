export interface ICredit {
    id: string
    userId: string
    title: string
    projectId: string
    credit?: number
    users: string[]
    note?: string
    start: Date
    end: Date
    created: Date
    updated: Date
    updatedBy: string
}
