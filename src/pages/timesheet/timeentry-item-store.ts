import { makeAutoObservable } from 'mobx'

export default class TimeEntryItem {
    id = Date.now()

    title = ''

    projectId = null

    isDone = false

    start = Date.now()

    end = Date.now()

    notes = ''

    status = 'Pending'

    constructor(title: string) {
        makeAutoObservable(this)
        this.title = title
    }

    toggleIsDone = () => {
        this.isDone = !this.isDone
    }

    updateText = (title: string) => {
        this.title = title
    }
}
