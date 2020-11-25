import React from 'react'

import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'

import { TimeEntryList } from './TimeEntryList'
import './Timesheet.scss'

const TimeSheet: React.FC = () => (
    <IonPage id='timesheet-page'>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot='start'>
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>Timesheet</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <TimeEntryList />
        </IonContent>
    </IonPage>
)

export default TimeSheet
