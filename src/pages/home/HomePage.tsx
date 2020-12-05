import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import {
    calendarOutline,
    constructOutline,
    informationCircleOutline,
    personOutline,
} from 'ionicons/icons'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../hooks/use-store'
import About from '../about/About'
import AccountPage from '../account/AccountPage'
import ChangePassword from '../account/ChangePassword'
import SaveProfile from '../account/SaveProfile'
import Skills from '../account/Skills'
import AdminPage from '../admin/AdminPage'
import ProjectPage from '../project/ProjectPage'
import SaveProject from '../project/SaveProject'
import SaveTimeEntry from '../timesheet/SaveTimeEntry'
import TimeSheetPage from '../timesheet/TimeSheetPage'
import SaveUserRole from '../users/SaveUserRole'
import UserList from '../users/UserList'

const HomePage = () => {
    const { adminStore } = useStore()
    const { isAdmin } = adminStore
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route component={About} exact path='/tabs/about' />
                {/* Account page */}
                <Route
                    exact
                    path='/tabs/account/changePassword'
                    render={() => <ChangePassword />}
                />
                <Route exact path='/tabs/account/profile' render={() => <SaveProfile />} />
                <Route exact path='/tabs/account/skills' render={() => <Skills />} />
                <Route exact path='/tabs/account' render={() => <AccountPage />} />

                {/* Admin pages */}
                <Route
                    exact
                    path='/tabs/admin/users/:id'
                    render={(props) => <SaveUserRole {...props} />}
                />
                <Route exact path='/tabs/admin/users' render={() => <UserList />} />
                <Route exact path='/tabs/admin' render={() => <AdminPage />} />

                {/* Admin project pages */}
                <Route
                    exact
                    path='/tabs/admin/project/save/:id'
                    render={(props) => <SaveProject {...props} />}
                />
                <Route
                    exact
                    path='/tabs/admin/project/save'
                    render={(props) => <SaveProject {...props} />}
                />
                <Route exact path='/tabs/admin/project' render={() => <ProjectPage />} />

                {/* Timesheet pages */}
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

                {/* Default tab */}
                <Redirect exact path='/tabs' to='/tabs/timesheet' />
            </IonRouterOutlet>

            <IonTabBar slot='bottom'>
                <IonTabButton href='/tabs/timesheet' tab='Home'>
                    <IonIcon icon={calendarOutline} />
                    <IonLabel>Timesheet</IonLabel>
                </IonTabButton>

                {isAdmin && (
                    <IonTabButton href='/tabs/admin' tab='Admin'>
                        <IonIcon icon={constructOutline} />
                        <IonLabel>Admin</IonLabel>
                    </IonTabButton>
                )}

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
}

export default observer(HomePage)
