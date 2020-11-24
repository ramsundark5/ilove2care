import { DateSelectArg, EventChangeArg, EventInput } from '@fullcalendar/react'
import { action, makeObservable, observable } from 'mobx'

export default class EventStore {
    private eventGuid = 0

    events: EventInput[] = [
        {
            id: this.createEventId(),
            title: 'All-day event',
            start: new Date(),
            allDay: true,
        },
        {
            id: this.createEventId(),
            title: 'Timed event',
            start: new Date(),
            allDay: false,
        },
    ]

    constructor() {
        makeObservable(this, {
            events: observable,
            addEvent: action,
            deleteEvent: action,
            changeEvent: action,
        })
    }

    getEvents(): EventInput[] {
        return this.events
    }

    private createEventId() {
        // eslint-disable-next-line no-plusplus
        return String(this.eventGuid++)
    }

    addEvent(selectInfo: DateSelectArg, title: string | null) {
        this.events.push({
            id: this.createEventId(),
            title: title || 'New Event',
            start: selectInfo.start,
            end: selectInfo.end,
            allDay: selectInfo.allDay,
        })
    }

    deleteEvent(id: string) {
        this.events.splice(
            this.events.findIndex((e) => e.id === id),
            1
        )
    }

    changeEvent(changeInfo: EventChangeArg) {
        const newEvent = changeInfo.event
        const storedEvent = this.events.find((e) => e.id === changeInfo.event.id)
        if (storedEvent) {
            storedEvent.title = newEvent.title
            storedEvent.allDay = newEvent.allDay
            storedEvent.start = newEvent.start || storedEvent.start
            storedEvent.end = newEvent.end || storedEvent.end
        }
    }
}
