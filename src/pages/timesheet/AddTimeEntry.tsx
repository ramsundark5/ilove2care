import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { IonButton, IonText } from '@ionic/react'
import { object, ref, string } from 'yup'

import DateField from '../../components/DateField'
import TextArea from '../../components/TextArea'
import TextField from '../../components/TextField'
import { useStore } from '../../hooks/use-store'
import { useToast } from '../../hooks/use-toast'

export const AddTimeEntry = () => {
    const Toast = useToast()
    const [newTimeEntry, setTimeEntry] = useState('')
    const { timeEntryList } = useStore()

    const addTimeEntry = (data: any) => {
        timeEntryList.addTimeEntry(newTimeEntry)
        setTimeEntry('')
    }

    const validationSchema = object().shape({
        'New Password': string().required().min(8),
        'Confirm Password': string()
            .required()
            .oneOf([ref('New Password')], 'Passwords must match'),
    })
    const { control, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema),
    })

    return (
        <div className='ion-padding'>
            <IonText color='muted'>
                <h2>Change Password</h2>
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
