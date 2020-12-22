import './global.scss'

import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { IonApp, IonLoading, IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { observer } from 'mobx-react-lite'

import { RouteEnum } from './constants/RouteEnum'
import { useStore } from './hooks/use-store'
import { ToastProvider } from './hooks/use-toast'
import About from './pages/about/About'
import Login from './pages/auth/Login'
import RedirectToLogin from './pages/auth/RedirectToLogin'
import SideMenu from './pages/navigation/SideMenu'
import TabMenu from './pages/navigation/TabMenu'

const PublicRoutes: React.FC = () => (
    <IonReactRouter>
        <IonRouterOutlet id='public'>
            <Route component={Login} exact path={RouteEnum.LOGIN} />
            <Route component={About} exact path={RouteEnum.ABOUT} />
            <Redirect exact from='/' to={RouteEnum.LOGIN} />
        </IonRouterOutlet>
    </IonReactRouter>
)

const PrivateRoutes: React.FC = () => (
    <IonReactRouter>
        <IonSplitPane contentId='private'>
            <SideMenu />
            <IonRouterOutlet id='private'>
                <Route path={RouteEnum.TABS} render={() => <TabMenu />} />
                <Route path={RouteEnum.LOGOUT} render={() => <RedirectToLogin />} />
                <Redirect exact from='/' to={RouteEnum.TABS} />
            </IonRouterOutlet>
        </IonSplitPane>
    </IonReactRouter>
)

const App: React.FC = observer(() => {
    const { authStore } = useStore()
    const { loggedIn, authCheckComplete } = authStore

    return !authCheckComplete ? (
        <IonApp>
            <IonLoading isOpen={!authCheckComplete} message='Starting App...' />
        </IonApp>
    ) : (
        <IonApp>
            <ToastProvider>{!loggedIn ? <PublicRoutes /> : <PrivateRoutes />}</ToastProvider>
        </IonApp>
    )
})

export default App
