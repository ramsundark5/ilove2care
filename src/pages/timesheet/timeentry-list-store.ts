import { action, computed, makeObservable, observable } from 'mobx'

import TimeEntryItem from './timeentry-item-store'

const initState = {
    defaultTimeEntryList: ['Setup react boilerplate', 'Better Call Soul', ' Choose the right framework'],
}

export default class TimeEntryList {
    list: TimeEntryItem[] = []

    query = ''

    constructor() {
        makeObservable(this, {
            list: observable.shallow,
            query: observable,
            addTimeEntry: action,
            removeTimeEntry: action,
            setQuery: action,
            finishedTimeEntries: computed,
            openTimeEntries: computed,
            filteredTimeEntries: computed,
        })

        initState.defaultTimeEntryList.forEach(this.addTimeEntry)
    }

    addTimeEntry = (text: string): void => {
        this.list.push(new TimeEntryItem(text))
    }

    removeTimeEntry = (timeEntry: TimeEntryItem): void => {
        this.list.splice(this.list.indexOf(timeEntry), 1)
    }

    setQuery = (query: string): void => {
        this.query = query
    }

    get finishedTimeEntries(): TimeEntryItem[] {
        return this.list.filter((timeEntry) => timeEntry.isDone)
    }

    get openTimeEntries(): TimeEntryItem[] {
        return this.list.filter((timeEntry) => !timeEntry.isDone)
    }

    get filteredTimeEntries(): TimeEntryItem[] {
        return this.list.filter((timeEntry) => timeEntry.title.includes(this.query))
    }
}
