import React from 'react'

import { IonItemDivider, IonItemGroup, IonLabel } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../hooks/use-store'
import TimeEntry from './timeentry-item-store'
import { TimeEntryItem } from './TimeEntryItem'

export const TimeEntryList: React.FC = observer(() => {
    const { timeEntryList } = useStore()
    const groupedTimeEntries: Map<string, TimeEntry> = timeEntryList.groupByMonth

    const renderTimeEntryItem = (timeEntries: TimeEntry[]) => (
        <>
            {timeEntries.map((timeEntry) => (
                <TimeEntryItem key={`${timeEntry.id}-${timeEntry.title}`} timeEntry={timeEntry} />
            ))}
        </>
    )
    return (
        <IonItemGroup>
            {Object.entries(groupedTimeEntries).map(([monthName, timeEntries]) => (
                <>
                    <IonItemDivider>
                        <IonLabel>{monthName}</IonLabel>
                    </IonItemDivider>
                    {renderTimeEntryItem(timeEntries)}
                </>
            ))}
        </IonItemGroup>
    )
})
