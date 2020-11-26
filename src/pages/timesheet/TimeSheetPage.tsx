import React, { useState } from 'react'

import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonModal,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react'

import { AddTimeEntry } from './AddTimeEntry'
import { TimeEntryList } from './TimeEntryList'
import './Timesheet.scss'

const TimeSheet: React.FC = () => {
    const onAddTime = () => {}
    const [showModal, setShowModal] = useState(false)

    return (
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

                <IonModal isOpen={showModal}>
                    <AddTimeEntry />
                    <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
                </IonModal>

                <IonButton color='primary' onClick={() => setShowModal(true)}>
                    Add Time
                </IonButton>
            </IonContent>
        </IonPage>
    )
}

export default TimeSheet
