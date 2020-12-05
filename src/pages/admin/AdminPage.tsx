import React from 'react'

import { IonContent, IonItem, IonList, IonPage } from '@ionic/react'

import ToolBar from '../../components/ToolBar'

const AdminPage: React.FC = () => {
    return (
        <IonPage id='admin-page'>
            <ToolBar showBackButton={false} title='Admin' />
            <IonContent>
                <IonList inset>
                    <IonItem detail routerLink='/tabs/admin/project'>
                        Projects
                    </IonItem>
                    <IonItem detail routerLink='/tabs/admin/users'>
                        Users
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default AdminPage
