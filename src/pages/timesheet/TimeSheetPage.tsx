import React from 'react'

import { IonButton, IonContent, IonFooter, IonPage } from '@ionic/react'

import ToolBar from '../../components/ToolBar'
import { RouteEnum } from '../../constants/RouteEnum'
import TimeEntryList from './TimeEntryList'
import './Timesheet.scss'

const TimeSheet: React.FC = () => (
    <IonPage id='timesheet-page'>
        <ToolBar showBackButton={false} title='TimeSheet' />
        <IonContent>
            <TimeEntryList />
        </IonContent>
        <IonFooter className='ion-margin-bottom ion-no-border'>
            <IonButton
                className='ion-padding'
                color='primary'
                expand='block'
                routerLink={RouteEnum.TIMESHEET_ADD}
            >
                Add Time
            </IonButton>
        </IonFooter>
    </IonPage>
)

export default TimeSheet
