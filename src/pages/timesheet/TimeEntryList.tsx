import React, { useEffect, useState } from 'react'

import { IonItemDivider, IonItemGroup, IonLabel } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../hooks/use-store'
import log from '../../logger'
import { ITimeEntry } from './models/ITimeEntry'
import { TimeEntryItem } from './TimeEntryItem'

export const TimeEntryList: React.FC = observer(() => {
    const { timesheetStore } = useStore()
    const [didLoad, setDidLoad] = useState<boolean>(false)
    const groupedTimeEntries: Map<string, ITimeEntry> = timesheetStore.groupByMonth

    useEffect(() => {
        if (!didLoad) {
            timesheetStore.loadData().then(() => {
                setDidLoad(true)
                log.info('loaded timesheet data from server')
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [didLoad])

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
        </>
    )
})
