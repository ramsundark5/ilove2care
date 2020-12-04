import React from 'react'
import { useForm } from 'react-hook-form'

import { IonButton, IonContent, IonPage } from '@ionic/react'

import InputTagField from '../../components/InputTagField'
import ToolBar from '../../components/ToolBar'

const SaveProfile: React.FC = () => {
    const { control, handleSubmit, errors } = useForm()

    const onUpdateSkills = () => {}

    return (
        <IonPage id='skills-page'>
            <ToolBar title='Skills' />
            <IonContent>
                <form onSubmit={handleSubmit(onUpdateSkills)}>
                    <InputTagField
                        control={control}
                        errors={errors}
                        key='skills'
                        label='Skills'
                        name='skills'
                    />
                    <IonButton className='ion-padding' expand='block' type='submit'>
                        Save
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default SaveProfile
