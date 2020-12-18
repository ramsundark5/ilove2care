import React from 'react'
import { RouteComponentProps } from 'react-router'

import { IonButton, IonContent, IonFooter, IonPage } from '@ionic/react'

import ToolBar from '../../components/ToolBar'
import CreditList from './CreditList'
import './Credit.scss'

interface CreditPageProps
    extends RouteComponentProps<{
        id: string
    }> {}

const CreditPage: React.FC<CreditPageProps> = ({ history, match }) => {
    const projectId = match.params.id
    return (
        <IonPage id='credit-page'>
            <ToolBar showBackButton={false} title='Credit' />
            <IonContent>
                <CreditList />
            </IonContent>
            <IonFooter className='ion-margin-bottom ion-no-border'>
                <IonButton
                    className='ion-padding'
                    color='primary'
                    expand='block'
                    routerLink={`/tabs/admin/projects/${projectId}/credits/save`}
                >
                    Add Credit
                </IonButton>
            </IonFooter>
        </IonPage>
    )
}

export default CreditPage
