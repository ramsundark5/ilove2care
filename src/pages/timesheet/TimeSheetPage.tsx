import React from 'react'
import { useParams } from 'react-router'

import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'

// import { AddTimeEntry } from './AddTimeEntry'
// import { TimeEntryList } from './TimeEntryList'

const TimeSheet: React.FC = () => {
    const { name } = useParams<{ name: string }>()
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonHeader collapse='condense'>
                    <IonToolbar>
                        <IonTitle size='large'>{name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className='p-2'>
                    {/*  <AddTimeEntry />
                    <TimeEntryList /> */}
                    <strong>Student clocks timesheet here</strong>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default TimeSheet
