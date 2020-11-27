import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import ChangePassword from '../profile/ChangePassword'
import ProfilePage from '../profile/ProfilePage'
import SaveTimeEntry from '../timesheet/SaveTimeEntry'
import TimeSheetPage from '../timesheet/TimeSheetPage'

const HomePage = () => (
    <IonTabs>
        <IonRouterOutlet>
            <Redirect exact path='/tabs' to='/tabs/timesheet' />
            {/*
            Using the render method prop cuts down the number of renders your components will have
            due to route changes. Use the component prop when your component depends on the
            RouterComponentProps passed in automatically.
            */}
            <Route exact path='/tabs/profile/changePassword' render={() => <ChangePassword />} />
            <Route exact path='/tabs/profile' render={() => <ProfilePage />} />
            <Route exact path='/tabs/timesheet/save' render={() => <SaveTimeEntry />} />
            <Route exact path='/tabs/timesheet' render={() => <TimeSheetPage />} />
        </IonRouterOutlet>

        <IonTabBar slot='bottom'>
            <IonTabButton href='/tabs/timesheet' tab='Home'>
                <IonLabel>Timesheet</IonLabel>
            </IonTabButton>

            <IonTabButton href='/tabs/profile' tab='Profile'>
                <IonLabel>Profile</IonLabel>
            </IonTabButton>
        </IonTabBar>
    </IonTabs>
)

export default observer(HomePage)
