import React from 'react'
import { useHistory, useParams } from 'react-router'

import {
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react'

import { useStore } from '../../hooks/use-store'

const Profile: React.FC = () => {
    const { name } = useParams<{ name: string }>()
    const { authStore } = useStore()
    const currentUser: any = authStore.user
    const history = useHistory()
    const logout = () => {
        authStore.onLogout()
        history.replace('/')
    }

    return (
        <IonPage id='profile-page'>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Account</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonHeader collapse='condense'>
                    <IonToolbar>
                        <IonTitle size='large'>{name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList inset>
                    {currentUser && currentUser.providerData[0].providerId === 'password' && (
                        <IonItem detail routerLink='/changePassword'>
                            Change Password
                        </IonItem>
                    )}
                    <IonItem detail routerLink='/support'>
                        Support
                    </IonItem>
                    <IonItem button color='primary' lines='none' onClick={logout}>
                        Logout
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Profile
