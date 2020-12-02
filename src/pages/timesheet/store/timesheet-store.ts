/* eslint-disable no-param-reassign */
import dayjs from 'dayjs'
import { makeAutoObservable, runInAction } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

import FirebaseService from '../../../services/FirebaseService'
import { ITimeEntry } from '../models/ITimeEntry'
import TimesheetDao from './TimesheetDao'

export default class TimesheetStore {
    list: ITimeEntry[] = []

    query = ''

    timesheetDao: TimesheetDao

    firebaseService: FirebaseService

    constructor() {
        makeAutoObservable(this)
        this.timesheetDao = new TimesheetDao()
        this.firebaseService = new FirebaseService()
    }

    loadData = async () => {
        const results = await this.timesheetDao.getAll()
        runInAction(() => {
            this.list = results
        })
    }

    addTimeEntry = async (timeEntry: ITimeEntry) => {
        const currentUserId = this.firebaseService.getCurrentUserId()
        if (!currentUserId) {
            return
        }
        timeEntry.status = 'Pending'
        timeEntry.id = uuidv4()
        timeEntry.userId = currentUserId
        timeEntry.created = new Date()
        timeEntry.updated = new Date()
        await this.timesheetDao.save(timeEntry)
        this.list.push(timeEntry)
    }

    updateTimeEntry = async (updatedTimeEntry: ITimeEntry, id: string) => {
        const timeEntryToUpdate = this.list.find((indexTimeEntry) => indexTimeEntry.id === id)
        if (timeEntryToUpdate) {
            timeEntryToUpdate.title = updatedTimeEntry.title
            timeEntryToUpdate.start = updatedTimeEntry.start
            timeEntryToUpdate.end = updatedTimeEntry.end
            timeEntryToUpdate.note = updatedTimeEntry.note || ''
            timeEntryToUpdate.projectId = updatedTimeEntry.projectId
            timeEntryToUpdate.updated = new Date()
            await this.timesheetDao.save(timeEntryToUpdate)
        }
    }

    removeTimeEntry = (timeEntry: ITimeEntry): void => {
        this.list.splice(
            this.list.findIndex((indexTimeEntry) => indexTimeEntry.id === timeEntry.id),
            1
        )
        this.timesheetDao.remove(timeEntry.id)
    }

    get groupByMonth() {
        // first sort the list
        const sortedList = [...this.list].sort((a, b) => a.start.getTime() - b.start.getTime())
        const groupedTimeEntries: any = {}
        sortedList.forEach((timeEntry) => {
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
