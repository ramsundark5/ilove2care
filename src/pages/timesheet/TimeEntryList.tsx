import React from 'react'

import { IonItemDivider, IonItemGroup, IonLabel } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../hooks/use-store'
import { TimeEntryItem } from './TimeEntryItem'

export const TimeEntryList: React.FC = observer(() => {
    const { timeEntryList } = useStore()

    return (
        <IonItemGroup>
            <IonItemDivider>
                <IonLabel>A</IonLabel>
            </IonItemDivider>

            {timeEntryList.openTimeEntries.map((timeEntry) => (
                <TimeEntryItem key={`${timeEntry.id}-${timeEntry.title}`} timeEntry={timeEntry} />
            ))}
        </IonItemGroup>
    )
})
