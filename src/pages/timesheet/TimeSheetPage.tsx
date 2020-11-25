import React from 'react'

import { IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react'

import { Agenda } from './Agenda'

const TimeSheet: React.FC = () => (
    <>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot='start'>
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>Timesheet</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <Agenda />
        </IonContent>
    </>
)

export default TimeSheet
