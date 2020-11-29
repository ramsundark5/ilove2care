import { makeAutoObservable } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

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

export default class TimeEntry implements ITimeEntry {
    id: string = uuidv4()

    userId!: string

    title = ''

    projectId: string | undefined

    start!: Date

    end!: Date

    note = ''

    status = 'Pending'

    created = new Date()

    updated = new Date()

    constructor() {
        makeAutoObservable(this)
    }
}
