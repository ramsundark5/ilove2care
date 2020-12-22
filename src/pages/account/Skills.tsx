import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

import { IonButton, IonContent, IonPage } from '@ionic/react'

import InputTagField from '../../components/InputTagField'
import ToolBar from '../../components/ToolBar'
import { RouteEnum } from '../../constants/RouteEnum'
import { useStore } from '../../hooks/use-store'
import log from '../../logger'
import { IUser } from './model/IUser'

const Skills: React.FC = () => {
    const { userStore } = useStore()
    const existingSkills = userStore.skills
    const history = useHistory()

    const { control, handleSubmit, errors } = useForm({
        defaultValues: {
            skills: existingSkills || [],
        },
    })

    const onUpdateSkills = (updatedData: IUser) => {
        try {
            userStore.saveSkills(updatedData.skills)
            history.goBack()
        } catch (err) {
            log.error(err)
        }
    }

    return (
        <IonPage id='skills-page'>
            <ToolBar backHref={RouteEnum.ACCOUNT} title='Skills' />
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

export default Skills
