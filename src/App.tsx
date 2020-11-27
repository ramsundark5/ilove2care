import './global.scss'

import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { IonApp, IonLoading, IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { observer } from 'mobx-react-lite'

import { useStore } from './hooks/use-store'
import { ToastProvider } from './hooks/use-toast'
import Login from './pages/auth/Login'
import HomePage from './pages/home/HomePage'
import SideMenu from './pages/home/SideMenu'

const PublicRoutes: React.FC = () => (
    <IonReactRouter>
        <IonRouterOutlet id='public'>
            <Route component={Login} exact path='/login' />
            <Redirect exact from='/' to='/login' />
        </IonRouterOutlet>
    </IonReactRouter>
)

const PrivateRoutes: React.FC = () => (
    <IonReactRouter>
        <IonSplitPane contentId='private'>
            <SideMenu />
            <IonRouterOutlet id='private'>
                <Route path='/tabs' render={() => <HomePage />} />
                <Redirect exact from='/' to='/tabs' />
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
