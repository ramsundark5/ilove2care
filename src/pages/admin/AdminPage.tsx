import React from 'react'

import { IonContent, IonItem, IonList, IonPage } from '@ionic/react'

import ToolBar from '../../components/ToolBar'
import { RouteEnum } from '../../constants/RouteEnum'

const AdminPage: React.FC = () => (
    <IonPage id='admin-page'>
        <ToolBar showBackButton={false} title='Admin' />
        <IonContent>
            <IonList inset>
                <IonItem detail routerLink={RouteEnum.PROJECT}>
                    Projects
                </IonItem>
                <IonItem detail routerLink={RouteEnum.ADMIN_USERS}>
                    Users
                </IonItem>
            </IonList>
        </IonContent>
    </IonPage>
)

export default AdminPage
