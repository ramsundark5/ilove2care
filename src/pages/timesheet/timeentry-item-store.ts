import { makeAutoObservable } from 'mobx'

export default class TimeEntry {
    id = Date.now()

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
