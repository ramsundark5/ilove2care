import React from 'react'

import { IonItemDivider, IonItemGroup, IonLabel } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../hooks/use-store'
import { ITimeEntry } from './timeentry-item-store'
import { TimeEntryItem } from './TimeEntryItem'

export const TimeEntryList: React.FC = observer(() => {
    const { timeEntryList } = useStore()
    const groupedTimeEntries: Map<string, ITimeEntry> = timeEntryList.groupByMonth

    const renderTimeEntryItem = (timeEntries: ITimeEntry[]) => (
        <>
            {timeEntries.map((timeEntry) => (
                <TimeEntryItem key={timeEntry.uuid} timeEntry={timeEntry} />
            ))}
        </>
    )
    return (
        <>
            {Object.entries(groupedTimeEntries).map(([monthName, timeEntries]) => (
                <IonItemGroup key={monthName}>
                    <IonItemDivider>
                        <IonLabel>{monthName}</IonLabel>
                    </IonItemDivider>
                    {renderTimeEntryItem(timeEntries)}
                </IonItemGroup>
            ))}
        </>
    )
})
