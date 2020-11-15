import firebase from 'firebase/app'
import { action, observable, runInAction } from 'mobx'

export default class AuthStore {
    @observable loggedIn = false

    @observable user = null

    @observable authCheckComplete = false

    @observable initializationError = null

    constructor() {
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

    @action
    onLogin = (currentUser: any): void => {
        this.user = currentUser
        this.loggedIn = true
    }

    @action
    onLogout = (): void => {
        firebase.auth().signOut()
        this.reset()
    }

    @action
    reset = (): void => {
        this.user = null
        this.loggedIn = false
    }
}
