import React, { useState } from 'react'

import { IonButton, IonInput } from '@ionic/react'

import { onEnterPress } from '../../hooks/use-enter'
import { useStore } from '../../hooks/use-store'

export const AddTimeEntry = () => {
    const [newTimeEntry, setTimeEntry] = useState('')
    const { timeEntryList } = useStore()

    const addTimeEntry = () => {
        timeEntryList.addTimeEntry(newTimeEntry)
        setTimeEntry('')
    }

    return (
        <div>
            <IonInput
                onIonChange={(e) => timeEntryList.setQuery(e.detail.value ?? '')}
                onKeyDown={onEnterPress(addTimeEntry)}
                placeholder='Search'
            />
            <IonInput
                onIonChange={(e) => setTimeEntry(e.detail.value ?? '')}
                onKeyDown={onEnterPress(addTimeEntry)}
                placeholder='Add your time entry'
            />
            <IonButton onClick={addTimeEntry}>Add Time</IonButton>
        </div>
    )
}
