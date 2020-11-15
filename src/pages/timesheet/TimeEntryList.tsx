import React from 'react'

import { IonBadge } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../hooks/use-store'
import { TimeEntryItem } from './TimeEntryItem'

export const TimeEntryList: React.FC = observer(() => {
    const { timeEntryList } = useStore()

    return (
        <div>
            <div>
                <IonBadge color="secondary">Open Time Entries</IonBadge>
                {timeEntryList.openTimeEntries.map((timeEntry) => (
                    <TimeEntryItem key={`${timeEntry.id}-${timeEntry.text}`} timeEntry={timeEntry} />
                ))}
            </div>
            <div>
                <IonBadge color="tertiary">Finished Time Entries</IonBadge>
                {timeEntryList.finishedTimeEntries.map((timeEntry) => (
                    <TimeEntryItem key={`${timeEntry.id}-${timeEntry.text}`} timeEntry={timeEntry} />
                ))}
            </div>
            <div>
                <IonBadge color="dark">Search Results</IonBadge>
                {timeEntryList.filteredTimeEntries.map((timeEntry) => (
                    <TimeEntryItem key={`${timeEntry.id}-${timeEntry.text}`} timeEntry={timeEntry} />
                ))}
            </div>
        </div>
    )
})
