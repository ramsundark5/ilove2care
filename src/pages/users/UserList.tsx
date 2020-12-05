import React from 'react'

import { IonContent, IonLoading, IonPage } from '@ionic/react'

import ToolBar from '../../components/ToolBar'
import { useStore } from '../../hooks/use-store'
import { IUser } from '../account/models/IUser'
import UserItem from './UserItem'

const UserList: React.FC = () => {
    const { userStore } = useStore()
    const users: IUser[] = userStore.userList

    return (
        <IonPage id='view-users'>
            <ToolBar backHref='/tabs/admin' title='Users' />
            <IonContent>
                {users.map((user) => (
                    <UserItem key={user.id} user={user} />
                ))}
            </IonContent>
            <IonLoading isOpen={!userStore.initializedAllUsers} />
        </IonPage>
    )
}

export default UserList
