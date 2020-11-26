import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { IonButton, IonText } from '@ionic/react'
import { date, object, string } from 'yup'

import DateField from '../../components/DateField'
import TextArea from '../../components/TextArea'
import TextField from '../../components/TextField'
import { useStore } from '../../hooks/use-store'
import { useToast } from '../../hooks/use-toast'
import TimeEntry from './timeentry-item-store'

export const AddTimeEntry = () => {
    const Toast = useToast()
    const { timeEntryList } = useStore()

    const addTimeEntry = (newTimeEntry: TimeEntry) => {
        timeEntryList.addTimeEntry(newTimeEntry)
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
        <div className='ion-padding'>
            <IonText color='muted'>
                <h2>Add Time Card</h2>
            </IonText>

            <form onSubmit={handleSubmit(addTimeEntry)}>
                <TextField
                    control={control}
                    errors={errors}
                    key='title'
                    label='Title'
                    name='title'
                    type='text'
                />

                <DateField
                    control={control}
                    errors={errors}
                    key='startTime'
                    label='Start Time'
                    name='start'
                />

                <DateField control={control} errors={errors} key='endTime' label='End Time' name='end' />
                <TextArea control={control} errors={errors} key='note' label='Note' name='note' />
                <IonButton className='ion-margin-top' expand='block' type='submit'>
                    Add Time
                </IonButton>
            </form>
        </div>
    )
}
