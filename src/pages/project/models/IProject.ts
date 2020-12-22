export interface IProject {
    id: string
    name: string
    description: string
    start: Date
    end: Date
    status: string
    users: string[]
    admins: string[]
    created: Date
    updated: Date
    updatedBy: string
}
