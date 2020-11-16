import firebase from 'firebase/app'
import { action, makeObservable, observable, runInAction } from 'mobx'

export default class AuthStore {
    loggedIn = false

    user = null

    authCheckComplete = false

    initializationError = null

    constructor() {
        makeObservable(this, {
            loggedIn: observable,
            user: observable,
            authCheckComplete: observable,
            initializationError: observable,
            onLogin: action,
            onLogout: action,
            reset: action,
        })

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.onLogin(user)
            } else {
                this.reset()
            }
            runInAction(() => {
                this.authCheckComplete = true
            })
        })
    }

    onLogin = (currentUser: any): void => {
        this.user = currentUser
        this.loggedIn = true
    }

    onLogout = (): void => {
        firebase.auth().signOut()
        this.reset()
    }

    reset = (): void => {
        this.user = null
        this.loggedIn = false
    }
}
