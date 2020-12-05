import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

import { yupResolver } from '@hookform/resolvers/yup'
import { IonButton, IonContent, IonPage } from '@ionic/react'
import { observer } from 'mobx-react-lite'
import { object, string } from 'yup'

import TextField, { TexFieldProps } from '../../components/TextField'
import ToolBar from '../../components/ToolBar'
import { useStore } from '../../hooks/use-store'
import log from '../../logger'
import { IUser } from './model/IUser'

const SaveProfile: React.FC = () => {
    const { userStore } = useStore()
    const currentUser = userStore.user
    const history = useHistory()
    const validationSchema = object().shape({
        name: string().required('Name is required'),
        email: string().email(),
        phone: string(),
    })
    const { control, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: currentUser?.name,
            description: currentUser?.description,
            email: currentUser?.email,
        },
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

    const onUpdateProfile = (updatedUser: IUser) => {
        try {
            userStore.saveProfile(updatedUser)
            history.goBack()
        } catch (err) {
            log.error(err)
        }
    }

    return (
        <IonPage id='save-profile'>
            <ToolBar backHref='/tabs/account' title='Profile' />
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

export default observer(SaveProfile)
