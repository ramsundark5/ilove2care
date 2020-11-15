import { action, computed, observable } from 'mobx'

import TimeEntryItem from './timeentry-item-store'

const initState = {
    defaultTimeEntryList: ['Setup react boilerplate', 'Better Call Soul', ' Choose the right framework'],
}

export default class TimeEntryList {
    @observable.shallow list: TimeEntryItem[] = []

    @observable query = ''

    constructor() {
        initState.defaultTimeEntryList.forEach(this.addTimeEntry)
    }

    @action
    addTimeEntry = (text: string): void => {
        this.list.push(new TimeEntryItem(text))
    }

    @action
    removeTimeEntry = (timeEntry: TimeEntryItem): void => {
        this.list.splice(this.list.indexOf(timeEntry), 1)
    }

    @action
    setQuery = (query: string): void => {
        this.query = query
    }

    @computed
    get finishedTimeEntries(): TimeEntryItem[] {
        return this.list.filter((timeEntry) => timeEntry.isDone)
    }

    @computed
    get openTimeEntries(): TimeEntryItem[] {
        return this.list.filter((timeEntry) => !timeEntry.isDone)
    }

    @computed
    get filteredTimeEntries(): TimeEntryItem[] {
        return this.list.filter((timeEntry) => timeEntry.text.includes(this.query))
    }
}
