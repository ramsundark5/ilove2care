import React from 'react'

import { IonItem, IonLabel } from '@ionic/react'
import dayjs from 'dayjs'

import { useStore } from '../../hooks/use-store'
import { ITimeEntry } from './models/ITimeEntry'

interface TimeEntryItemProps {
    timeEntry: ITimeEntry
}

export const TimeEntryItem = ({ timeEntry }: TimeEntryItemProps) => {
    const { projectStore } = useStore()
    const startDate = dayjs(timeEntry.start)
    const endDate = dayjs(timeEntry.end)

    const project = timeEntry.projectId
        ? projectStore.findById(timeEntry.projectId)
        : { name: null }
    const projectName = project && project.name ? project.name : null
    return (
        <IonItem
            class={`status-${timeEntry.status}`}
            routerLink={`/tabs/timesheet/save/${timeEntry.id}`}
        >
            <IonLabel>
                <h3>
                    {timeEntry.title} - {projectName}
                </h3>
                <p>
                    {startDate.format('MMM D, YYYY h:mm A')}&mdash;&nbsp;
                    {endDate.format('MMM D, YYYY h:mm A')}
                </p>
                <p>{timeEntry.note}</p>
            </IonLabel>
        </IonItem>
    )
}
