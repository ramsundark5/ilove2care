import React, { useRef, useState } from 'react'

import {
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
} from '@ionic/react'
import dayjs from 'dayjs'
import { pencilOutline, trashOutline } from 'ionicons/icons'

import { useStore } from '../../hooks/use-store'
import DeleteTimesheetAlert from './DeleteTimesheetAlert'
import { ITimeEntry } from './timeentry-item-store'

interface TimeEntryItemProps {
    timeEntry: ITimeEntry
}

export const TimeEntryItem = ({ timeEntry }: TimeEntryItemProps) => {
    const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null)
    const [showAlert, setShowAlert] = useState(false)
    const { timeEntryList } = useStore()
    const startDate = dayjs(timeEntry.start)
    const endDate = dayjs(timeEntry.end)

    return (
        <IonItemSliding class={`status-${timeEntry.status}`} ref={ionItemSlidingRef}>
            <IonItem>
                <IonLabel>
                    <h3>{timeEntry.title}</h3>
                    <p>
                        {startDate.format('MMM D, YYYY h:mm A')}&mdash;&nbsp;
                        {endDate.format('MMM D, YYYY h:mm A')}
                    </p>
                    <p>{timeEntry.note}</p>
                </IonLabel>
            </IonItem>
            <IonItemOptions side='end'>
                <IonItemOption color='primary' routerLink={`/tabs/timesheet/save/${timeEntry.id}`}>
                    <IonIcon icon={pencilOutline} slot='icon-only' />
                </IonItemOption>
                <IonItemOption color='danger' onClick={() => setShowAlert(true)}>
                    <IonIcon icon={trashOutline} slot='icon-only' />
                </IonItemOption>
            </IonItemOptions>
            <DeleteTimesheetAlert
                cancelAction={() => setShowAlert(false)}
                confirmationAction={() => {
                    setShowAlert(false)
                    timeEntryList.removeTimeEntry(timeEntry)
                }}
                showAlert={showAlert}
            />
        </IonItemSliding>
    )
}
