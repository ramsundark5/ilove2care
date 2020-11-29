import firebase from 'firebase/app'
import { makeAutoObservable, runInAction } from 'mobx'

export default class AuthStore {
    loggedIn = false

    user = null

    authCheckComplete = false

    initializationError = null

    constructor() {
        makeAutoObservable(this)

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
