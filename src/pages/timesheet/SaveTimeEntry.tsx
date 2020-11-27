import React from 'react'
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { IonButton, IonContent, IonPage } from '@ionic/react'
import { date, object, string } from 'yup'

import DateField from '../../components/DateField'
import TextArea from '../../components/TextArea'
import TextField from '../../components/TextField'
import ToolBar from '../../components/ToolBar'
import { useStore } from '../../hooks/use-store'
import TimeEntry from './timeentry-item-store'

interface SaveTimeEntryProps {
    existingTimeEntry?: TimeEntry
}

const defaultProps: SaveTimeEntryProps = {
    existingTimeEntry: new TimeEntry(),
}

const SaveTimeEntry = ({ existingTimeEntry }: SaveTimeEntryProps) => {
    const { timeEntryList } = useStore()

    const saveTimeEntry = (timeEntry: TimeEntry) => {
        if (timeEntry.uuid) {
            timeEntryList.updateTimeEntry(timeEntry)
        } else {
            timeEntryList.addTimeEntry(timeEntry)
        }
    }

    const validationSchema = object().shape({
        title: string().required(),
        start: date().required(),
        end: date().required(),
        note: string().required(),
    })
    const { control, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema),
    })

    return (
        <IonPage id='save-timentry'>
            <ToolBar title='Time Entry' />
            <IonContent>
                <form onSubmit={handleSubmit(saveTimeEntry)}>
                    <TextField
                        control={control}
                        defaultValue={existingTimeEntry?.title}
                        errors={errors}
                        key='title'
                        label='Title'
                        name='title'
                        type='text'
                    />

                    <DateField
                        control={control}
                        defaultValue={existingTimeEntry?.start}
                        errors={errors}
                        key='startTime'
                        label='Start Time'
                        name='start'
                    />

                    <DateField
                        control={control}
                        defaultValue={existingTimeEntry?.end}
                        errors={errors}
                        key='endTime'
                        label='End Time'
                        name='end'
                    />
                    <TextArea
                        control={control}
                        defaultValue={existingTimeEntry?.note}
                        errors={errors}
                        key='note'
                        label='Note'
                        name='note'
                    />
                    <IonButton className='ion-margin-top' expand='block' type='submit'>
                        Save
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    )
}

SaveTimeEntry.defaultProps = defaultProps

export default SaveTimeEntry
