import React from 'react'
import ReactDOM from 'react-dom'

import { setupConfig } from '@ionic/react'

import App from './App'
import { StoreProvider } from './hooks/store-provider'
import './services/InitService'
import * as serviceWorker from './serviceWorker'
import RootStore from './stores'
import './firebaseui-styling.global.css'

const rootStore = new RootStore()
rootStore.init()

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
