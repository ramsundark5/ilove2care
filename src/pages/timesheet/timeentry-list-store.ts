/* eslint-disable no-param-reassign */
import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

import { addObjectToCollection, removeObjectFromCollection } from '../../services/FirebaseService'
import TimeEntry, { ITimeEntry } from './timeentry-item-store'

const initState = {
    defaultTimeEntryList: [
        'Setup react boilerplate',
        'Better Call Soul',
        ' Choose the right framework',
    ],
}

const TIME_ENTRY_COLLECTION = 'timeentry'
export default class TimeEntryList {
    list: ITimeEntry[] = []

    query = ''

    constructor() {
        makeAutoObservable(this)
        initState.defaultTimeEntryList.forEach(this.initTimeEntry)
    }

    initTimeEntry = (text: string): void => {
        const timeEntry: ITimeEntry = new TimeEntry()
        timeEntry.title = text
        this.list.push(timeEntry)
    }

    addTimeEntry = (timeEntry: ITimeEntry): void => {
        timeEntry.status = 'Pending'
        timeEntry.uuid = uuidv4()
        this.list.push(timeEntry)
        this.list = this.list.sort((a, b) => a.start.getTime() - b.start.getTime())
        addObjectToCollection({ collection: TIME_ENTRY_COLLECTION, objectData: timeEntry })
    }

    updateTimeEntry = (updatedTimeEntry: ITimeEntry, uuid: string): void => {
        const timeEntryToUpdate = this.list.find((indexTimeEntry) => indexTimeEntry.uuid === uuid)
        if (timeEntryToUpdate) {
            timeEntryToUpdate.title = updatedTimeEntry.title
            timeEntryToUpdate.start = updatedTimeEntry.start
            timeEntryToUpdate.end = updatedTimeEntry.end
            timeEntryToUpdate.note = updatedTimeEntry.note || ''
        }
    }

    removeTimeEntry = (timeEntry: ITimeEntry): void => {
        this.list.splice(
            this.list.findIndex((indexTimeEntry) => indexTimeEntry.uuid === timeEntry.uuid),
            1
        )
        removeObjectFromCollection({ collection: TIME_ENTRY_COLLECTION, objectId: timeEntry.uuid })
    }

    get groupByMonth() {
        const groupedTimeEntries: any = {}
        this.list.forEach((timeEntry) => {
            const monthName: string = dayjs(timeEntry.start).format('MMM YYYY')
            const byMonthItem: ITimeEntry[] = groupedTimeEntries[monthName] || []
            byMonthItem.push(timeEntry)
            groupedTimeEntries[monthName] = byMonthItem
        })
        return groupedTimeEntries
    }

    setQuery = (query: string): void => {
        this.query = query
    }

    get filteredTimeEntries(): ITimeEntry[] {
        return this.list.filter((timeEntry) => timeEntry.title.includes(this.query))
    }
}
