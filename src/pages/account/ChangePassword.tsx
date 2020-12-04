import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

import { yupResolver } from '@hookform/resolvers/yup'
import { IonButton, IonContent, IonPage } from '@ionic/react'
import firebase from 'firebase/app'
import { object, ref, string } from 'yup'

import TextField, { TexFieldProps } from '../../components/TextField'
import ToolBar from '../../components/ToolBar'
import { useToast } from '../../hooks/use-toast'

const ChangePassword: React.FC = () => {
    const Toast = useToast()
    const history = useHistory()

    const validationSchema = object().shape({
        newpassword: string().required('New Password is required').min(8),
        confirmpassword: string()
            .required('Confirm Password is required')
            .oneOf([ref('newpassword')], 'Passwords must match'),
    })
    const { control, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema),
    })

    const formFields: TexFieldProps[] = [
        {
            name: 'newpassword',
            type: 'password',
            label: 'New Password',
        },
        {
            name: 'confirmpassword',
            type: 'password',
            label: 'Confirm Password',
        },
    ]

    const onChangePassword = async (data: any) => {
        const user: any = firebase.auth().currentUser
        const newPassword = data['New Password']
        try {
            await user.updatePassword(newPassword)
            const successToast = Toast.create({
                color: 'success',
                message: 'Password changed successfully',
                duration: 2000,
            })
            successToast.present()
            history.replace('/tabs/profile')
        } catch (err) {
            const errorToast = Toast.create({
                color: 'danger',
                message: `Error updating password ${err.message}`,
                duration: 5000,
            })
            errorToast.present()
        }
    }

    return (
        <IonPage id='change-password'>
            <ToolBar title='Change Password' />
            <IonContent>
                <form onSubmit={handleSubmit(onChangePassword)}>
                    {formFields.map((field) => (
                        <TextField {...field} control={control} errors={errors} key={field.name} />
                    ))}
                    <IonButton className='ion-padding' expand='block' type='submit'>
                        Change Password
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default ChangePassword
