/* eslint-disable no-param-reassign */
import dayjs from 'dayjs'
import groupBy from 'lodash/groupBy'
import { makeAutoObservable } from 'mobx'

import TimeEntry from './timeentry-item-store'

const initState = {
    defaultTimeEntryList: ['Setup react boilerplate', 'Better Call Soul', ' Choose the right framework'],
}

export default class TimeEntryList {
    list: TimeEntry[] = []

    query = ''

    constructor() {
        makeAutoObservable(this)
        initState.defaultTimeEntryList.forEach(this.initTimeEntry)
    }

    initTimeEntry = (text: string): void => {
        const timeEntry = new TimeEntry()
        timeEntry.title = text
        this.list.push(timeEntry)
    }

    addTimeEntry = (timeEntry: TimeEntry): void => {
        timeEntry.status = 'Pending'
        timeEntry.id = Date.now()
        this.list.push(timeEntry)
    }

    removeTimeEntry = (timeEntry: TimeEntry): void => {
        this.list.splice(
            this.list.findIndex((indexTimeEntry) => indexTimeEntry.id === timeEntry.id),
            1
        )
    }

    get groupByMonth() {
        const groupedTimeEntries: any = {}
        this.list.forEach((timeEntry) => {
            const monthName: string = dayjs(timeEntry.start).format('MMM YYYY')
            const byMonthItem: TimeEntry[] = groupedTimeEntries[monthName] || []
            byMonthItem.push(timeEntry)
            groupedTimeEntries[monthName] = byMonthItem
        })
        return groupedTimeEntries
    }

    setQuery = (query: string): void => {
        this.query = query
    }

    get filteredTimeEntries(): TimeEntry[] {
        return this.list.filter((timeEntry) => timeEntry.title.includes(this.query))
    }
}
