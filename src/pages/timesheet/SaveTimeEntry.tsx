import React from 'react'
import { useForm } from 'react-hook-form'
import { RouteComponentProps } from 'react-router'

import { yupResolver } from '@hookform/resolvers/yup'
import { IonButton, IonContent, IonPage } from '@ionic/react'
import { date, object, string } from 'yup'

import DateField from '../../components/DateField'
import TextArea from '../../components/TextArea'
import TextField from '../../components/TextField'
import ToolBar from '../../components/ToolBar'
import { useStore } from '../../hooks/use-store'
import log from '../../logger'
import { ITimeEntry } from './store/timeentry-item-store'

interface SaveTimeEntryProps
    extends RouteComponentProps<{
        id: string
    }> {}

const SaveTimeEntry: React.FC<SaveTimeEntryProps> = ({ history, match }) => {
    const { timeEntryList } = useStore()
    const existingTimeEntry = timeEntryList.list.find((item) => item.id === match.params.id)

    const saveTimeEntry = (timeEntry: ITimeEntry) => {
        try {
            if (existingTimeEntry && existingTimeEntry.id) {
                timeEntryList.updateTimeEntry(timeEntry, existingTimeEntry.id)
            } else {
                timeEntryList.addTimeEntry(timeEntry)
            }
            history.goBack()
        } catch (err) {
            log.error(err)
        }
    }

    const validationSchema = object().shape({
        title: string().required(),
        start: date().required(),
        end: date().required(),
        note: string(),
    })
    const { control, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            title: existingTimeEntry?.title,
            start: existingTimeEntry?.start?.toISOString() || null,
            end: existingTimeEntry?.end?.toISOString() || null,
            note: existingTimeEntry?.note,
        },
    })

    return (
        <IonPage id='save-timentry'>
            <ToolBar title='Time Entry' />
            <IonContent>
                <form onSubmit={handleSubmit(saveTimeEntry)}>
                    <TextField
                        control={control}
                        currentValue={existingTimeEntry?.title}
                        errors={errors}
                        key='title'
                        label='Title'
                        name='title'
                        type='text'
                    />

                    <DateField
                        control={control}
                        currentValue={existingTimeEntry?.start}
                        errors={errors}
                        key='startTime'
                        label='Start Time'
                        name='start'
                    />

                    <DateField
                        control={control}
                        currentValue={existingTimeEntry?.end}
                        errors={errors}
                        key='endTime'
                        label='End Time'
                        name='end'
                    />
                    <TextArea
                        control={control}
                        currentValue={existingTimeEntry?.note}
                        errors={errors}
                        key='note'
                        label='Note'
                        name='note'
                    />
                    <IonButton className='ion-padding' expand='block' type='submit'>
                        Save
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default SaveTimeEntry
