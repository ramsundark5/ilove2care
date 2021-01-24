import React from 'react'
import { useForm } from 'react-hook-form'
import { RouteComponentProps } from 'react-router'

import { IonButton, IonChip, IonContent, IonItem, IonLabel, IonPage } from '@ionic/react'

import SelectField, { SelectFieldOptionProps } from '../../components/SelectField'
import ToolBar from '../../components/ToolBar'
import { RouteEnum } from '../../constants/RouteEnum'
import { useStore } from '../../hooks/use-store'
import log from '../../logger'
import { IRole } from '../admin/model/IRole'

interface SaveUserRoleProps
    extends RouteComponentProps<{
        id: string
    }> {}

const roleOptions: SelectFieldOptionProps[] = [
    {
        label: 'Admin',
        value: 'admin',
    },
    {
        label: 'Volunteer',
        value: 'volunteer',
    },
    {
        label: 'Verified Member',
        value: 'verified_member',
    },
]

const SaveUserRole: React.FC<SaveUserRoleProps> = ({ history, match }) => {
    const { adminStore, userStore } = useStore()
    const userIdInView = match.params.id
    const userRoleToUpdate = [...adminStore.userRoleList].find((item) => item.id === userIdInView)
    const userInView = userStore.userList.find((item) => item.id === userIdInView)

    const { control, handleSubmit, errors } = useForm({
        defaultValues: {
            roles: userRoleToUpdate?.roles || [],
        },
    })

    const save = (updatedUserRole: IRole) => {
        try {
            if (userRoleToUpdate && userRoleToUpdate.id) {
                adminStore.update(updatedUserRole, userRoleToUpdate.id)
            } else {
                adminStore.add(updatedUserRole, userIdInView)
            }
            history.goBack()
        } catch (err) {
            log.error(err)
        }
    }

    return (
        <IonPage id='save-role'>
            <ToolBar backHref={RouteEnum.ADMIN_USERS} title='User' />
            {userInView && (
                <IonContent>
                    <IonItem>
                        <IonLabel>
                            <h3>{userInView.name}</h3>
                            <p>{userInView.email}</p>
                            <p>
                                Skills:{' '}
                                {userInView.skills &&
                                    userInView.skills.map &&
                                    userInView.skills.map((skill) => (
                                        <IonChip key={skill}>{skill}</IonChip>
                                    ))}
                            </p>
                        </IonLabel>
                    </IonItem>
                    <form onSubmit={handleSubmit(save)}>
                        <SelectField
                            control={control}
                            errors={errors}
                            key='roles'
                            label='Roles'
                            multiple
                            name='roles'
                            options={roleOptions}
                        />
                        <IonButton className='ion-padding' expand='block' type='submit'>
                            Save
                        </IonButton>
                    </form>
                </IonContent>
            )}
        </IonPage>
    )
}

export default SaveUserRole
