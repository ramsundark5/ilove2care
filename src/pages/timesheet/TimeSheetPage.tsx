import React from 'react'
import { useHistory } from 'react-router'

import { IonButton, IonContent, IonPage } from '@ionic/react'

import ToolBar from '../../components/ToolBar'
import { TimeEntryList } from './TimeEntryList'
import './Timesheet.scss'

const TimeSheet: React.FC = () => {
    const history = useHistory()
    const onAddTime = () => {
        history.push('/tabs/timesheet/save')
    }

    return (
        <IonPage id='timesheet-page'>
            <ToolBar showBackButton={false} title='TimeSheet' />
            <IonContent>
                <TimeEntryList />
                <IonButton color='primary' expand='block' onClick={() => onAddTime()}>
                    Add Time
                </IonButton>
            </IonContent>
        </IonPage>
    )
}

export default TimeSheet
