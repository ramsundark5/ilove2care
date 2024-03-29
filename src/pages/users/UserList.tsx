import React from 'react'

import { IonContent, IonLabel, IonLoading, IonPage } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import ToolBar from '../../components/ToolBar'
import { RouteEnum } from '../../constants/RouteEnum'
import { useStore } from '../../hooks/use-store'
import { IUser } from '../account/model/IUser'
import UserItem from './UserItem'

const UserList: React.FC = () => {
    const { adminStore, userStore } = useStore()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const adminRoleList = adminStore.userRoleList
    const users: IUser[] = userStore.userList
    return (
        <IonPage id='view-users'>
            <ToolBar backHref={RouteEnum.ADMIN} title='Users' />
            <IonContent>
                {users.map((user) => (
                    <UserItem key={user.id} user={user} />
                ))}
            </IonContent>
            <IonLabel class='ion-hide'>{adminRoleList.length}</IonLabel>
            <IonLoading isOpen={!userStore.initializedAllUsers} />
        </IonPage>
    )
}

export default observer(UserList)
