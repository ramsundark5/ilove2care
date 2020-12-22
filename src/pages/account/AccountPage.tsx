import React from 'react'
import { useHistory } from 'react-router'

import { IonButton, IonContent, IonItem, IonList, IonPage } from '@ionic/react'

import ToolBar from '../../components/ToolBar'
import { RouteEnum } from '../../constants/RouteEnum'
import { useStore } from '../../hooks/use-store'

const AccountPage: React.FC = () => {
    const { authStore } = useStore()
    const currentUser: any = authStore.user
    const history = useHistory()
    const logout = () => {
        authStore.onLogout()
        history.replace('/')
    }

    return (
        <IonPage id='account-page'>
            <ToolBar showBackButton={false} title='Account' />
            <IonContent>
                <IonList inset>
                    <IonItem detail routerLink={RouteEnum.PROFILE}>
                        Profile
                    </IonItem>
                    <IonItem detail routerLink={RouteEnum.SKILLS}>
                        Skills
                    </IonItem>
                    {currentUser && currentUser.providerData[0].providerId === 'password' && (
                        <IonItem detail routerLink={RouteEnum.CHANGE_PASSWORD}>
                            Change Password
                        </IonItem>
                    )}
                </IonList>
                <IonButton className='ion-padding' color='primary' expand='block' onClick={logout}>
                    Logout
                </IonButton>
            </IonContent>
        </IonPage>
    )
}

export default AccountPage
