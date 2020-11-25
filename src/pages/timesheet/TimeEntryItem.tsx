import React, { useRef } from 'react'

import { AlertButton, IonItem, IonItemSliding, IonLabel } from '@ionic/react'

import { onEnterPress } from '../../hooks/use-enter'
import { useStore } from '../../hooks/use-store'
import TimeEntryItemClass from './timeentry-item-store'

interface Props {
    timeEntry: TimeEntryItemClass
}

export const TimeEntryItem = ({ timeEntry }: Props) => {
    const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null)
    return (
        <IonItemSliding class={`status-${timeEntry.status}`} ref={ionItemSlidingRef}>
            <IonItem>
                <IonLabel>
                    <h3>{timeEntry.title}</h3>
                    <p>8 hours</p>
                </IonLabel>
            </IonItem>
        </IonItemSliding>
    )
}
