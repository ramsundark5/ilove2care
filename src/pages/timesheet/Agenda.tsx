import React from 'react'

// eslint-disable-next-line import-helpers/order-imports
import FullCalendar, {
    DateSelectArg,
    EventChangeArg,
    EventClickArg,
    EventContentArg,
} from '@fullcalendar/react'

import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { IonPage } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../hooks/use-store'

export const Agenda: React.FC = observer(() => {
    const { eventStore } = useStore()

    const handleEventClick = (clickInfo: EventClickArg) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            eventStore.deleteEvent(clickInfo.event.id)
        }
    }

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        const title = prompt('Please enter a new title for your event')
        const calendarApi = selectInfo.view.calendar
        calendarApi.unselect() // clear date selection
        eventStore.addEvent(selectInfo, title)
    }

    const handleEventChange = (changeInfo: EventChangeArg) => {
        eventStore.changeEvent(changeInfo)
    }

    const renderEventContent = (eventContent: EventContentArg) => (
        <>
            <b>{eventContent.timeText}</b>
            <i>{eventContent.event.title}</i>
        </>
    )

    return (
        <IonPage>
            <FullCalendar
                dayMaxEvents
                editable
                eventChange={handleEventChange}
                eventClick={handleEventClick}
                eventContent={renderEventContent}
                events={eventStore.events.slice()}
                /**
                 * slice() is used to achieve MobX observability on eventStore.events
                 * https://mobx.js.org/best/react.html#incorrect-use-an-observable-but-without-accessing-any-of-its-properties
                 */
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'listMonh, listWeek, listDay',
                }}
                initialView='listWeek'
                plugins={[listPlugin, interactionPlugin]}
                select={handleDateSelect}
                selectable
                selectMirror
            />
        </IonPage>
    )
})
