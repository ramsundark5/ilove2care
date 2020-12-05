import React from 'react'

import { IonItem, IonLabel } from '@ionic/react'

import { IUser } from '../account/model/IUser'

interface UserItemProps {
    user: IUser
}

const UserItem = ({ user }: UserItemProps) => (
    <IonItem routerLink={`/tabs/admin/users/${user.id}`}>
        <IonLabel>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
        </IonLabel>
    </IonItem>
)

export default UserItem
