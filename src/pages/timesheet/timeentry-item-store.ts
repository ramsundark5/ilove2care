import { makeAutoObservable } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

export interface ITimeEntry {
    id?: string | null
    uuid?: string
    title: string
    projectId?: number | null
    note?: string
    start: Date
    end: Date
    status: string
}

export default class TimeEntry implements ITimeEntry {
    id = null

    uuid = uuidv4()

    title = ''

    projectId = null

    start = new Date()

    end = new Date()

    note = ''

    status = 'Pending'

    constructor() {
        makeAutoObservable(this)
    }
}
