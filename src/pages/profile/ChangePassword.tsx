import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

import { yupResolver } from '@hookform/resolvers/yup'
import { IonButton, IonContent, IonPage, IonText } from '@ionic/react'
import firebase from 'firebase/app'
import { object, ref, string } from 'yup'

import TextField, { TexFieldProps } from '../../components/TextField'
import { useToast } from '../../hooks/use-toast'

const ChangePassword: React.FC = () => {
    const Toast = useToast()
    const history = useHistory()

    const validationSchema = object().shape({
        'New Password': string().required().min(8),
        'Confirm Password': string()
            .required()
            .oneOf([ref('New Password')], 'Passwords must match'),
    })
    const { control, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema),
    })

    const formFields: TexFieldProps[] = [
        {
            name: 'New Password',
            type: 'password',
            label: 'New Password',
        },
        {
            name: 'Confirm Password',
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
            <IonContent>
                <div className='ion-padding'>
                    <IonText color='muted'>
                        <h2>Change Password</h2>
                    </IonText>

                    <form onSubmit={handleSubmit(onChangePassword)}>
                        {formFields.map((field) => (
                            // eslint-disable-next-line max-len
                            <TextField {...field} control={control} errors={errors} key={field.name} />
                        ))}

                        <IonButton className='ion-margin-top' expand='block' type='submit'>
                            Change Password
                        </IonButton>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default ChangePassword
