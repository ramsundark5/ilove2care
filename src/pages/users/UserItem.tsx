import React from 'react'

import { IonItem, IonLabel, IonText } from '@ionic/react'

import { IUser } from '../account/models/IUser'

interface UserItemProps {
    user: IUser
}

const UserItem = ({ user }: UserItemProps) => (
    <>
        <IonItem>
            <IonLabel>Name: </IonLabel>
            <IonText>{user.name}</IonText>
        </IonItem>
        <IonItem>
            <IonLabel>Email: </IonLabel>
            <IonText>{user.email}</IonText>
        </IonItem>
        <IonItem>
            <IonLabel>Skills: </IonLabel>
            <IonText>{user.skills}</IonText>
        </IonItem>
    </>
)

export default UserItem
