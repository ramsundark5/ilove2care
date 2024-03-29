/* eslint-disable no-alert */
import React from 'react'
import ReactDOM from 'react-dom'

import { isPlatform, setupConfig } from '@ionic/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { codePush, InstallMode } from 'capacitor-codepush'
import LogRocket from 'logrocket'

import App from './App'
import { StoreProvider } from './hooks/store-provider'
import './services/InitService'
import log from './logger'
import * as serviceWorker from './serviceWorker'
import RootStore from './stores'

import './firebaseui-styling.global.css'

// run codepush sync at start
if (isPlatform('android')) {
    codePush
        .sync({
            updateDialog: true,
            installMode: InstallMode.IMMEDIATE,
            deploymentKey: process.env.REACT_APP_ANDROID_DEPLOYMENT_KEY,
        })
        .then((status) => {
            switch (status) {
                case 0:
                    log.info('codepush package upto date')
                    break
                case 5:
                    log.info('checking codepush package update')
                    break
                case 3:
                    log.error('Error downloading codepush package')
                    break
                default:
                    log.info('codepush check complete')
                    break
            }
        })
        .catch((err) => {
            log.error(`error connecting to codepush ${err}`)
        })
}

const rootStore = new RootStore()
rootStore.init()

// initialize logrocket
LogRocket.init(process.env.REACT_APP_LOGROCKET_KEY || '')

setupConfig({
    swipeBackEnabled: false,
})

ReactDOM.render(
    <StoreProvider value={rootStore}>
        <App />
    </StoreProvider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
