import React from 'react'

import { IonItemDivider, IonItemGroup, IonLabel, IonLoading } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../hooks/use-store'
import { ITimeEntry } from './models/ITimeEntry'
import { TimeEntryItem } from './TimeEntryItem'

const TimeEntryList: React.FC = () => {
    const { timesheetStore } = useStore()
    const groupedTimeEntries: Map<string, ITimeEntry> = timesheetStore.groupByMonth

    const renderTimeEntryItem = (timeEntries: ITimeEntry[]) => (
        <>
            {timeEntries.map((timeEntry) => (
                <TimeEntryItem key={timeEntry.id} timeEntry={timeEntry} />
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
            <IonLoading isOpen={!timesheetStore.initialized} />
        </>
    )
}

export default observer(TimeEntryList)
