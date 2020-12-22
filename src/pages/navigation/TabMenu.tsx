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

import { RouteEnum } from '../../constants/RouteEnum'
import { useStore } from '../../hooks/use-store'
import About from '../about/About'
import AccountPage from '../account/AccountPage'
import ChangePassword from '../account/ChangePassword'
import SaveProfile from '../account/SaveProfile'
import Skills from '../account/Skills'
import AdminPage from '../admin/AdminPage'
import CreditPage from '../credits/CreditPage'
import SaveCredit from '../credits/SaveCredit'
import DashboardPage from '../dashboard/DashboardPage'
import ProjectPage from '../project/ProjectPage'
import SaveProject from '../project/SaveProject'
import SaveTimeEntry from '../timesheet/SaveTimeEntry'
import TimeSheetPage from '../timesheet/TimeSheetPage'
import SaveUserRole from '../users/SaveUserRole'
import UserList from '../users/UserList'

const TabMenu = () => {
    const { adminStore } = useStore()
    const { isAdmin } = adminStore
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route component={About} exact path={RouteEnum.ABOUT_TAB} />
                <Route exact path={RouteEnum.DASHBOARD} render={() => <DashboardPage />} />
                {/* Account page */}
                <Route exact path={RouteEnum.CHANGE_PASSWORD} render={() => <ChangePassword />} />
                <Route exact path={RouteEnum.PROFILE} render={() => <SaveProfile />} />
                <Route exact path={RouteEnum.SKILLS} render={() => <Skills />} />
                <Route exact path={RouteEnum.ACCOUNT} render={() => <AccountPage />} />

                {/* Admin pages */}
                <Route
                    exact
                    path={RouteEnum.ADMIN_USER_SAVE}
                    render={(props) => <SaveUserRole {...props} />}
                />
                <Route exact path={RouteEnum.ADMIN_USERS} render={() => <UserList />} />
                <Route exact path={RouteEnum.ADMIN} render={() => <AdminPage />} />

                {/* Admin project pages */}
                <Route
                    exact
                    path={RouteEnum.PROJECT_SAVE}
                    render={(props) => <SaveProject {...props} />}
                />
                <Route
                    exact
                    path={RouteEnum.PROJECT_ADD}
                    render={(props) => <SaveProject {...props} />}
                />
                <Route exact path={RouteEnum.PROJECT} render={() => <ProjectPage />} />

                {/* Project credit pages */}
                <Route
                    exact
                    path={RouteEnum.CREDIT_SAVE}
                    render={(props) => <SaveCredit {...props} />}
                />
                <Route
                    exact
                    path={RouteEnum.CREDIT_ADD}
                    render={(props) => <SaveCredit {...props} />}
                />
                <Route
                    exact
                    path={RouteEnum.CREDITS}
                    render={(props) => <CreditPage {...props} />}
                />

                {/* Timesheet pages */}
                <Route
                    exact
                    path={RouteEnum.TIMESHEET_SAVE}
                    render={(props) => <SaveTimeEntry {...props} />}
                />
                <Route
                    exact
                    path={RouteEnum.TIMESHEET_ADD}
                    render={(props) => <SaveTimeEntry {...props} />}
                />
                <Route exact path={RouteEnum.TIMESHEET} render={() => <TimeSheetPage />} />

                {/* Default tab */}
                <Redirect exact path={RouteEnum.TABS} to={RouteEnum.DASHBOARD} />
            </IonRouterOutlet>

            <IonTabBar slot='bottom'>
                <IonTabButton href={RouteEnum.DASHBOARD} tab='Home'>
                    <IonIcon icon={calendarOutline} />
                    <IonLabel>Dashboard</IonLabel>
                </IonTabButton>

                {isAdmin && (
                    <IonTabButton href={RouteEnum.ADMIN} tab='Admin'>
                        <IonIcon icon={constructOutline} />
                        <IonLabel>Admin</IonLabel>
                    </IonTabButton>
                )}

                <IonTabButton href={RouteEnum.ACCOUNT} tab='Account'>
                    <IonIcon icon={personOutline} />
                    <IonLabel>Account</IonLabel>
                </IonTabButton>

                <IonTabButton href={RouteEnum.ABOUT_TAB} tab='About'>
                    <IonIcon icon={informationCircleOutline} />
                    <IonLabel>About</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default observer(TabMenu)
