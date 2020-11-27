import React, { useRef } from 'react'

import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from '@ionic/react'
import dayjs from 'dayjs'

import { ITimeEntry } from './timeentry-item-store'

interface TimeEntryItemProps {
    timeEntry: ITimeEntry
}

export const TimeEntryItem = ({ timeEntry }: TimeEntryItemProps) => {
    const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null)
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
                <IonItemOption color='primary' routerLink={`/tabs/timesheet/save/${timeEntry.uuid}`}>
                    Edit
                </IonItemOption>
                <IonItemOption color='danger' onClick={() => console.log('unread clicked')}>
                    Delete
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    )
}
