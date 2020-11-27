import React from 'react'

import { IonButton, IonContent, IonPage } from '@ionic/react'

import ToolBar from '../../components/ToolBar'
import { TimeEntryList } from './TimeEntryList'
import './Timesheet.scss'

const TimeSheet: React.FC = () => (
    <IonPage id='timesheet-page'>
        <ToolBar showBackButton={false} title='TimeSheet' />
        <IonContent>
            <TimeEntryList />
            <IonButton
                className='ion-padding'
                color='primary'
                expand='block'
                routerLink='/tabs/timesheet/save'
            >
                Add Time
            </IonButton>
        </IonContent>
    </IonPage>
)

export default TimeSheet
