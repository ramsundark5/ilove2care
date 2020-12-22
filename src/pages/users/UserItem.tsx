import React from 'react'

import { IonItem, IonLabel } from '@ionic/react'

import { RouteEnum } from '../../constants/RouteEnum'
import { getPath } from '../../helpers/URLHelper'
import { IUser } from '../account/model/IUser'

interface UserItemProps {
    user: IUser
}

const UserItem = ({ user }: UserItemProps) => (
    <IonItem routerLink={getPath(RouteEnum.ADMIN_USER_SAVE, { id: user.id })}>
        <IonLabel>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
        </IonLabel>
    </IonItem>
)

export default UserItem
