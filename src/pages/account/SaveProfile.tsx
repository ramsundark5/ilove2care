import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

import { yupResolver } from '@hookform/resolvers/yup'
import { IonButton, IonContent, IonPage } from '@ionic/react'
import { object, string } from 'yup'

import TextField, { TexFieldProps } from '../../components/TextField'
import ToolBar from '../../components/ToolBar'

const SaveProfile: React.FC = () => {
    const validationSchema = object().shape({
        name: string().required('Name is required'),
        email: string().email(),
        phone: string(),
    })
    const { control, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema),
    })

    const formFields: TexFieldProps[] = [
        {
            name: 'name',
            type: 'text',
            label: 'Name',
        },
        {
            name: 'email',
            type: 'email',
            label: 'Email',
        },
        {
            name: 'phone',
            type: 'tel',
            label: 'Phone',
        },
    ]

    const onUpdateProfile = () => {}

    return (
        <IonPage id='save-profile'>
            <ToolBar title='Profile' />
            <IonContent>
                <form onSubmit={handleSubmit(onUpdateProfile)}>
                    {formFields.map((field) => (
                        <TextField {...field} control={control} errors={errors} key={field.name} />
                    ))}
                    <IonButton className='ion-padding' expand='block' type='submit'>
                        Save
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default SaveProfile
