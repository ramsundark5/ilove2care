/* eslint-disable no-param-reassign */
import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

import FirebaseService from '../../services/FirebaseService'
import { ITimeEntry } from './timeentry-item-store'

const TIME_ENTRY_COLLECTION = 'timesheet'
export default class TimeEntryList {
    list: ITimeEntry[] = []

    query = ''

    db: FirebaseService

    constructor() {
        makeAutoObservable(this)
        this.db = new FirebaseService()
    }

    loadData = () => this.db.getAll({ collection: TIME_ENTRY_COLLECTION })

    addTimeEntry = (timeEntry: ITimeEntry): void => {
        const currentUserId = this.db.getCurrentUserId()
        if (!currentUserId) {
            return
        }
        timeEntry.status = 'Pending'
        timeEntry.id = uuidv4()
        timeEntry.userId = currentUserId
        timeEntry.created = new Date()
        timeEntry.updated = new Date()
        this.list.push(timeEntry)
        this.list = this.list.sort((a, b) => a.start.getTime() - b.start.getTime())
        this.db.saveObjectToCollection({
            collection: TIME_ENTRY_COLLECTION,
            objectData: timeEntry,
        })
    }

    updateTimeEntry = (updatedTimeEntry: ITimeEntry, id: string): void => {
        const timeEntryToUpdate = this.list.find((indexTimeEntry) => indexTimeEntry.id === id)
        if (timeEntryToUpdate) {
            timeEntryToUpdate.title = updatedTimeEntry.title
            timeEntryToUpdate.start = updatedTimeEntry.start
            timeEntryToUpdate.end = updatedTimeEntry.end
            timeEntryToUpdate.note = updatedTimeEntry.note || ''

            this.db.saveObjectToCollection({
                collection: TIME_ENTRY_COLLECTION,
                objectData: timeEntryToUpdate,
            })
        }
    }

    removeTimeEntry = (timeEntry: ITimeEntry): void => {
        this.list.splice(
            this.list.findIndex((indexTimeEntry) => indexTimeEntry.id === timeEntry.id),
            1
        )
        this.db.removeObjectFromCollection({
            collection: TIME_ENTRY_COLLECTION,
            objectId: timeEntry.id,
        })
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
