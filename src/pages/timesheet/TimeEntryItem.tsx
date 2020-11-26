import React, { useRef } from 'react'

import { IonItem, IonItemSliding, IonLabel } from '@ionic/react'
import dayjs from 'dayjs'

import TimeEntry from './timeentry-item-store'

interface Props {
    timeEntry: TimeEntry
}

export const TimeEntryItem = ({ timeEntry }: Props) => {
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
        </IonItemSliding>
    )
}
