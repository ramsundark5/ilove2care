import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import {
    calendarOutline,
    informationCircleOutline,
    personOutline,
    readerOutline,
} from 'ionicons/icons'
import { observer } from 'mobx-react-lite'

import About from '../about/About'
import AccountPage from '../account/AccountPage'
import ChangePassword from '../account/ChangePassword'
import SaveProfile from '../account/SaveProfile'
import Skills from '../account/Skills'
import ProjectPage from '../project/ProjectPage'
import SaveProject from '../project/SaveProject'
import SaveTimeEntry from '../timesheet/SaveTimeEntry'
import TimeSheetPage from '../timesheet/TimeSheetPage'

const HomePage = () => (
    <IonTabs>
        <IonRouterOutlet>
            <Redirect exact path='/tabs' to='/tabs/timesheet' />
            <Route component={About} exact path='/tabs/about' />
            {/*
            Using the render method prop cuts down the number of renders your components will have
            due to route changes. Use the component prop when your component depends on the
            RouterComponentProps passed in automatically.
            */}
            <Route exact path='/tabs/account/changePassword' render={() => <ChangePassword />} />
            <Route exact path='/tabs/account/profile' render={() => <SaveProfile />} />
            <Route exact path='/tabs/account/skills' render={() => <Skills />} />
            <Route exact path='/tabs/account' render={() => <AccountPage />} />

            <Route
                exact
                path='/tabs/project/save/:id'
                render={(props) => <SaveProject {...props} />}
            />
            <Route exact path='/tabs/project/save' render={(props) => <SaveProject {...props} />} />
            <Route exact path='/tabs/project' render={() => <ProjectPage />} />

            <Route
                exact
                path='/tabs/timesheet/save/:id'
                render={(props) => <SaveTimeEntry {...props} />}
            />
            <Route
                exact
                path='/tabs/timesheet/save'
                render={(props) => <SaveTimeEntry {...props} />}
            />
            <Route exact path='/tabs/timesheet' render={() => <TimeSheetPage />} />
        </IonRouterOutlet>

        <IonTabBar slot='bottom'>
            <IonTabButton href='/tabs/timesheet' tab='Home'>
                <IonIcon icon={calendarOutline} />
                <IonLabel>Timesheet</IonLabel>
            </IonTabButton>

            <IonTabButton href='/tabs/project' tab='Project'>
                <IonIcon icon={readerOutline} />
                <IonLabel>Project</IonLabel>
            </IonTabButton>

            <IonTabButton href='/tabs/account' tab='Account'>
                <IonIcon icon={personOutline} />
                <IonLabel>Account</IonLabel>
            </IonTabButton>

            <IonTabButton href='/tabs/about' tab='About'>
                <IonIcon icon={informationCircleOutline} />
                <IonLabel>About</IonLabel>
            </IonTabButton>
        </IonTabBar>
    </IonTabs>
)

export default observer(HomePage)
