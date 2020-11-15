import React from 'react'
import { useHistory, useParams } from 'react-router'

import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react'

import { useStore } from '../../hooks/use-store'

const Profile: React.FC = () => {
    const { name } = useParams<{ name: string }>()
    const { authStore } = useStore()
    const history = useHistory()
    const logout = () => {
        authStore.onLogout()
        history.replace('/')
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonHeader collapse='condense'>
                    <IonToolbar>
                        <IonTitle size='large'>{name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className='p-2'>
                    <strong>Profile details go here</strong>
                </div>
                <div>
                    <IonButton onClick={logout}>Logout</IonButton>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Profile
