import React from 'react'
import { useHistory, useParams } from 'react-router'

import {
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react'

import ToolBar from '../../components/ToolBar'
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
            <ToolBar showBackButton={false} title='Profile' />

            <IonContent>
                <IonHeader collapse='condense'>
                    <IonToolbar>
                        <IonTitle size='large'>{name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList inset>
                    {currentUser && currentUser.providerData[0].providerId === 'password' && (
                        <IonItem detail routerLink='/tabs/profile/changePassword'>
                            Change Password
                        </IonItem>
                    )}
                    <IonItem detail routerLink='/support'>
                        Support
                    </IonItem>
                </IonList>
                <IonButton className='ion-padding' color='primary' expand='block' onClick={logout}>
                    Logout
                </IonButton>
            </IonContent>
        </IonPage>
    )
}

export default Profile
