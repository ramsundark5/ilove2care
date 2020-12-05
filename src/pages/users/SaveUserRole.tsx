import React from 'react'
import { useForm } from 'react-hook-form'
import { RouteComponentProps } from 'react-router'

import { IonButton, IonChip, IonContent, IonItem, IonLabel, IonPage } from '@ionic/react'

import SelectField, { SelectFieldOptionProps } from '../../components/SelectField'
import ToolBar from '../../components/ToolBar'
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
        label: 'Member',
        value: 'member',
    },
]

const SaveUserRole: React.FC<SaveUserRoleProps> = ({ history, match }) => {
    const { adminStore, userStore } = useStore()
    const userRoleToUpdate = adminStore.userRoleList.find((item) => item.id === match.params.id)
    const userInView = userStore.userList.find((item) => item.id === match.params.id)

    const { control, handleSubmit, errors } = useForm({
        defaultValues: {
            roles: userRoleToUpdate?.roles || [],
        },
    })

    const save = (updatedUserRole: IRole) => {
        try {
            if (userRoleToUpdate) {
                adminStore.saveUserRole(updatedUserRole, userRoleToUpdate?.id)
                history.goBack()
            }
        } catch (err) {
            log.error(err)
        }
    }

    return (
        <IonPage id='save-role'>
            <ToolBar backHref='/tabs/admin/users' title='User' />
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
