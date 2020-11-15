import React, { useState } from 'react'

import { IonInput } from '@ionic/react'

import { onEnterPress } from '../../hooks/use-enter'
import { useStore } from '../../hooks/use-store'
import TimeEntryItemClass from './timeentry-item-store'

interface Props {
    timeEntry: TimeEntryItemClass
}

export const TimeEntryItem = ({ timeEntry }: Props) => {
    const { timeEntryList } = useStore()
    const [newText, setText] = useState('')
    const [isEditing, setEdit] = useState(false)

    const saveText = () => {
        timeEntry.updateText(newText)
        setEdit(false)
        setText('')
    }

    return (
        <div>
            {isEditing ? (
                <div>
                    <IonInput
                        onIonChange={(e) => setText(e.detail.value ?? '')}
                        onKeyDown={onEnterPress(saveText)}
                        placeholder="Enter your time"
                        type="text"
                    />
                    <button onClick={saveText}>save</button>
                </div>
            ) : (
                <div>
                    <span>{timeEntry.text}</span>
                    <input
                        defaultChecked={timeEntry.isDone}
                        onChange={timeEntry.toggleIsDone}
                        type="checkbox"
                     />
                    <button onClick={() => setEdit(true)}>edit</button>
                    <button onClick={() => timeEntryList.removeTimeEntry(timeEntry)}>X</button>
                </div>
            )}
        </div>
    )
}
